import { LedgerFailure } from "./errors.js";
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

export type { ItemState, Kind };

const INVALID_STATE = "error: state file is invalid; preserved for diagnosis";
const STATE_KEYS = ["schemaVersion", "revision", "epics"];
const EPIC_KEYS = ["id", "title", "outcome", "createdAt", "updatedAt", "items"];
const ITEM_KEYS = [
  "id",
  "kind",
  "title",
  "state",
  "note",
  "blockedFrom",
  "blockReason",
  "evidenceNote",
  "acceptance",
  "nextAction",
  "createdAt",
  "updatedAt",
];

export interface WorkItem {
  readonly id: string;
  readonly kind: Kind;
  readonly title: string;
  readonly state: ItemState;
  readonly note: string | null;
  readonly blockedFrom: "in-progress" | null;
  readonly blockReason: string | null;
  readonly evidenceNote: string | null;
  readonly acceptance: "manual" | null;
  readonly nextAction: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Epic {
  readonly id: string;
  readonly title: string;
  readonly outcome: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly items: readonly WorkItem[];
}

export interface LedgerState {
  readonly schemaVersion: 1;
  readonly revision: number;
  readonly epics: readonly Epic[];
}

function invalidState(): never {
  throw new LedgerFailure(3, INVALID_STATE);
}

export function formatSchemaVersion(value: unknown): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "invalid";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "string") {
    if (value.length > 0 && value.length <= 40 && /^[\u0020-\u007E]+$/u.test(value)) {
      return value;
    }
    return "invalid";
  }
  return "invalid";
}

function unsupported(version: string): never {
  throw new LedgerFailure(
    3,
    `error: unsupported schema version ${version}; supported schema 1; state preserved`,
  );
}

function parseTimestamp(value: unknown): string {
  if (typeof value !== "string" || !TIMESTAMP.test(value)) {
    invalidState();
  }
  return value;
}

function parseNullableText(value: unknown, max: number): string | null {
  if (value === null) {
    return null;
  }
  if (!isPresentText(value, max)) {
    invalidState();
  }
  return value;
}

function parseItem(value: unknown, seen: Set<string>): WorkItem {
  if (!isRecord(value) || !hasExactKeys(value, ITEM_KEYS)) {
    invalidState();
  }
  if (typeof value.id !== "string" || !isItemId(value.id)) {
    invalidState();
  }
  if (seen.has(value.id)) {
    invalidState();
  }
  seen.add(value.id);
  if (typeof value.kind !== "string" || !isKind(value.kind)) {
    invalidState();
  }
  if (!isPresentText(value.title, LIMITS.title)) {
    invalidState();
  }
  if (typeof value.state !== "string" || !isItemState(value.state)) {
    invalidState();
  }
  const note = parseNullableText(value.note, LIMITS.note);
  const blockReason = parseNullableText(value.blockReason, LIMITS.reason);
  const evidenceNote = parseNullableText(value.evidenceNote, LIMITS.evidence);
  if (!isPresentText(value.nextAction, LIMITS.next)) {
    invalidState();
  }
  const blockedFrom = value.blockedFrom;
  if (blockedFrom !== null && blockedFrom !== "in-progress") {
    invalidState();
  }
  const acceptance = value.acceptance;
  if (acceptance !== null && acceptance !== "manual") {
    invalidState();
  }
  if (value.state === "blocked") {
    if (blockedFrom !== "in-progress" || blockReason === null || evidenceNote !== null || acceptance !== null) {
      invalidState();
    }
  } else if (value.state === "done") {
    if (blockedFrom !== null || blockReason !== null || evidenceNote === null || acceptance !== "manual") {
      invalidState();
    }
  } else if (blockedFrom !== null || blockReason !== null || evidenceNote !== null || acceptance !== null) {
    invalidState();
  }
  return {
    id: value.id,
    kind: value.kind,
    title: value.title,
    state: value.state,
    note,
    blockedFrom,
    blockReason,
    evidenceNote,
    acceptance,
    nextAction: value.nextAction,
    createdAt: parseTimestamp(value.createdAt),
    updatedAt: parseTimestamp(value.updatedAt),
  };
}

function parseEpic(value: unknown, seenEpics: Set<string>): Epic {
  if (!isRecord(value) || !hasExactKeys(value, EPIC_KEYS)) {
    invalidState();
  }
  if (typeof value.id !== "string" || !isEpicId(value.id)) {
    invalidState();
  }
  if (seenEpics.has(value.id)) {
    invalidState();
  }
  seenEpics.add(value.id);
  if (!isPresentText(value.title, LIMITS.title) || !isPresentText(value.outcome, LIMITS.outcome)) {
    invalidState();
  }
  if (!Array.isArray(value.items)) {
    invalidState();
  }
  const seenItems = new Set<string>();
  const items = value.items.map((item) => parseItem(item, seenItems));
  return {
    id: value.id,
    title: value.title,
    outcome: value.outcome,
    createdAt: parseTimestamp(value.createdAt),
    updatedAt: parseTimestamp(value.updatedAt),
    items,
  };
}

export function parseState(value: unknown): LedgerState {
  if (!isRecord(value) || !Object.prototype.hasOwnProperty.call(value, "schemaVersion")) {
    unsupported("missing");
  }
  if (value.schemaVersion !== 1) {
    unsupported(formatSchemaVersion(value.schemaVersion));
  }
  if (!hasExactKeys(value, STATE_KEYS) || !isSafeInteger(value.revision) || value.revision < 0) {
    invalidState();
  }
  if (!Array.isArray(value.epics)) {
    invalidState();
  }
  const seenEpics = new Set<string>();
  const epics = value.epics.map((epic) => parseEpic(epic, seenEpics));
  return { schemaVersion: 1, revision: value.revision, epics };
}

export function serializeState(state: LedgerState): string {
  const document = {
    schemaVersion: state.schemaVersion,
    revision: state.revision,
    epics: state.epics.map((epic) => ({
      id: epic.id,
      title: epic.title,
      outcome: epic.outcome,
      createdAt: epic.createdAt,
      updatedAt: epic.updatedAt,
      items: epic.items.map((item) => ({
        id: item.id,
        kind: item.kind,
        title: item.title,
        state: item.state,
        note: item.note,
        blockedFrom: item.blockedFrom,
        blockReason: item.blockReason,
        evidenceNote: item.evidenceNote,
        acceptance: item.acceptance,
        nextAction: item.nextAction,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    })),
  };
  return `${JSON.stringify(document, null, 2)}\n`;
}
