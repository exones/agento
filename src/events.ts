import {
  hasExactKeys,
  isEpicId,
  isItemId,
  isItemState,
  isKind,
  isPresentText,
  isRecord,
  isSafeInteger,
  LIMITS,
  TIMESTAMP,
  type ItemState,
  type Kind,
} from "./text.js";

const EVENT_KEYS = [
  "schemaVersion",
  "revision",
  "at",
  "action",
  "epicId",
  "itemId",
  "kind",
  "from",
  "to",
  "note",
  "nextAction",
  "reason",
  "evidenceNote",
];

export type EventAction = "epic.new" | "story.add" | "story.start" | "story.block" | "story.complete";

export interface LedgerEvent {
  readonly schemaVersion: 1;
  readonly revision: number;
  readonly at: string;
  readonly action: EventAction;
  readonly epicId: string;
  readonly itemId: string | null;
  readonly kind: Kind | null;
  readonly from: ItemState | null;
  readonly to: ItemState | null;
  readonly note: string | null;
  readonly nextAction: string | null;
  readonly reason: string | null;
  readonly evidenceNote: string | null;
}

export interface EventView {
  readonly eventsRevision: number | null;
  readonly eventsLag: boolean;
  readonly warnings: readonly string[];
  /** Status and mutations both exit 3. */
  readonly fatal: string | null;
  /** Mutations exit 3. Status uses warnings and still exits 0. */
  readonly mutationBlock: string | null;
}

const INVALID_EVENTS = "error: events log is invalid; state preserved";
const AHEAD = "error: events are ahead of state; preserved for diagnosis";
const PARTIAL = "error: events log has a partial trailing line; state preserved";
const LAG = "error: events lag state; mutation refused; state preserved";

function isAction(value: unknown): value is EventAction {
  return (
    value === "epic.new" ||
    value === "story.add" ||
    value === "story.start" ||
    value === "story.block" ||
    value === "story.complete"
  );
}

function parseTextOrNull(value: unknown, max: number): string | null | undefined {
  if (value === null) {
    return null;
  }
  if (!isPresentText(value, max)) {
    return undefined;
  }
  return value;
}

function parseItemIdOrNull(value: unknown): string | null | undefined {
  if (value === null) {
    return null;
  }
  if (typeof value !== "string" || !isItemId(value)) {
    return undefined;
  }
  return value;
}

function parseKindOrNull(value: unknown): Kind | null | undefined {
  if (value === null) {
    return null;
  }
  if (typeof value !== "string" || !isKind(value)) {
    return undefined;
  }
  return value;
}

function parseStateOrNull(value: unknown): ItemState | null | undefined {
  if (value === null) {
    return null;
  }
  if (typeof value !== "string" || !isItemState(value)) {
    return undefined;
  }
  return value;
}

function actionFieldsMatch(event: LedgerEvent): boolean {
  if (event.action === "epic.new") {
    return (
      event.itemId === null &&
      event.kind === null &&
      event.from === null &&
      event.to === null &&
      event.note === null &&
      event.nextAction === null &&
      event.reason === null &&
      event.evidenceNote === null
    );
  }
  if (event.itemId === null || event.kind === null || event.nextAction === null) {
    return false;
  }
  if (event.action === "story.add") {
    return event.from === null && event.to === "backlog" && event.reason === null && event.evidenceNote === null;
  }
  if (event.action === "story.start") {
    return (
      (event.from === "backlog" || event.from === "blocked") &&
      event.to === "in-progress" &&
      event.reason === null &&
      event.evidenceNote === null
    );
  }
  if (event.action === "story.block") {
    return event.from === "in-progress" && event.to === "blocked" && event.reason !== null && event.evidenceNote === null;
  }
  return event.from === "in-progress" && event.to === "done" && event.reason === null && event.evidenceNote !== null;
}

function parseEvent(value: unknown): LedgerEvent | undefined {
  if (!isRecord(value) || !hasExactKeys(value, EVENT_KEYS)) {
    return undefined;
  }
  if (value.schemaVersion !== 1 || !isSafeInteger(value.revision) || value.revision < 1) {
    return undefined;
  }
  if (typeof value.at !== "string" || !TIMESTAMP.test(value.at) || !isAction(value.action)) {
    return undefined;
  }
  if (typeof value.epicId !== "string" || !isEpicId(value.epicId)) {
    return undefined;
  }
  const itemId = parseItemIdOrNull(value.itemId);
  const kind = parseKindOrNull(value.kind);
  const from = parseStateOrNull(value.from);
  const to = parseStateOrNull(value.to);
  const note = parseTextOrNull(value.note, LIMITS.note);
  const nextAction = parseTextOrNull(value.nextAction, LIMITS.next);
  const reason = parseTextOrNull(value.reason, LIMITS.reason);
  const evidenceNote = parseTextOrNull(value.evidenceNote, LIMITS.evidence);
  if (
    itemId === undefined ||
    kind === undefined ||
    from === undefined ||
    to === undefined ||
    note === undefined ||
    nextAction === undefined ||
    reason === undefined ||
    evidenceNote === undefined
  ) {
    return undefined;
  }
  const event: LedgerEvent = {
    schemaVersion: 1,
    revision: value.revision,
    at: value.at,
    action: value.action,
    epicId: value.epicId,
    itemId,
    kind,
    from,
    to,
    note,
    nextAction,
    reason,
    evidenceNote,
  };
  return actionFieldsMatch(event) ? event : undefined;
}

export function splitEventLog(content: string): { readonly lines: readonly string[]; readonly partial: boolean } {
  if (content.length === 0) {
    return { lines: [], partial: false };
  }
  const partial = !content.endsWith("\n");
  const complete = partial ? content.slice(0, content.lastIndexOf("\n") + 1) : content;
  if (complete.length === 0) {
    return { lines: [], partial };
  }
  return { lines: complete.slice(0, -1).split("\n"), partial };
}

function fatal(message: string): EventView {
  return { eventsRevision: null, eventsLag: false, warnings: [], fatal: message, mutationBlock: null };
}

export function analyzeEvents(content: string | null, stateRevision: number): EventView {
  if (content === null) {
    const missingPastZero = stateRevision > 0;
    return {
      eventsRevision: missingPastZero ? null : 0,
      eventsLag: missingPastZero,
      warnings: ["warning: events file missing; not repaired"],
      fatal: null,
      mutationBlock: missingPastZero ? LAG : null,
    };
  }

  const split = splitEventLog(content);
  const events: LedgerEvent[] = [];
  for (const line of split.lines) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      return fatal(INVALID_EVENTS);
    }
    const event = parseEvent(parsed);
    if (event === undefined) {
      return fatal(INVALID_EVENTS);
    }
    events.push(event);
  }

  if (events.some((event) => event.revision > stateRevision)) {
    return fatal(AHEAD);
  }
  const contiguous = events.every((event, index) => event.revision === index + 1);
  if (!contiguous) {
    return fatal(INVALID_EVENTS);
  }

  const maxRevision = events.length === 0 ? 0 : events[events.length - 1]!.revision;
  const warnings: string[] = [];
  if (split.partial) {
    warnings.push("warning: events log ends with a partial line; ignored for display");
  }
  if (maxRevision < stateRevision) {
    warnings.push(
      `warning: events lag state (state revision ${stateRevision}, last event revision ${maxRevision}); not repaired`,
    );
  }
  let mutationBlock: string | null = null;
  if (split.partial) {
    mutationBlock = PARTIAL;
  } else if (maxRevision < stateRevision) {
    mutationBlock = LAG;
  }
  return {
    eventsRevision: maxRevision,
    eventsLag: maxRevision < stateRevision,
    warnings,
    fatal: null,
    mutationBlock,
  };
}

export function serializeEvent(event: LedgerEvent): string {
  const line = {
    schemaVersion: event.schemaVersion,
    revision: event.revision,
    at: event.at,
    action: event.action,
    epicId: event.epicId,
    itemId: event.itemId,
    kind: event.kind,
    from: event.from,
    to: event.to,
    note: event.note,
    nextAction: event.nextAction,
    reason: event.reason,
    evidenceNote: event.evidenceNote,
  };
  return `${JSON.stringify(line)}\n`;
}
