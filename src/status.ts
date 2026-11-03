import type { EventView } from "./events.js";
import type { Epic, LedgerState, WorkItem } from "./state.js";

interface Counts {
  readonly backlog: number;
  readonly "in-progress": number;
  readonly blocked: number;
  readonly done: number;
}

function counts(epic: Epic): Counts {
  const result = { backlog: 0, "in-progress": 0, blocked: 0, done: 0 };
  for (const item of epic.items) {
    result[item.state] += 1;
  }
  return result;
}

function itemLines(item: WorkItem): string[] {
  const lines = [`${item.id} ${item.kind} ${item.state} ${item.title}`, `  next: ${item.nextAction}`];
  if (item.note !== null) {
    lines.push(`  note: ${item.note}`);
  }
  if (item.blockedFrom !== null) {
    lines.push(`  blocked-from: ${item.blockedFrom}`);
  }
  if (item.blockReason !== null) {
    lines.push(`  reason: ${item.blockReason}`);
  }
  if (item.state === "done") {
    lines.push("  evidence: manual record; not gate acceptance");
    if (item.evidenceNote !== null) {
      lines.push(`  evidence-note: ${item.evidenceNote}`);
    }
  }
  return lines;
}

export function formatStatusText(state: LedgerState, epic: Epic | null): string {
  if (epic === null) {
    const lines = ["schema 1", `revision ${state.revision}`, `epics ${state.epics.length}`];
    if (state.epics.length === 0) {
      return `${lines.join("\n")}\n`;
    }
    lines.push("");
    for (const entry of state.epics) {
      const tally = counts(entry);
      lines.push(
        `${entry.id} backlog=${tally.backlog} in-progress=${tally["in-progress"]} blocked=${tally.blocked} done=${tally.done} ${entry.title}`,
      );
    }
    return `${lines.join("\n")}\n`;
  }

  const lines = [
    "schema 1",
    `revision ${state.revision}`,
    `epic ${epic.id}`,
    `title ${epic.title}`,
    `outcome ${epic.outcome}`,
  ];
  if (epic.items.length === 0) {
    lines.push("", "no items");
    return `${lines.join("\n")}\n`;
  }
  for (const item of epic.items) {
    lines.push("", ...itemLines(item));
  }
  return `${lines.join("\n")}\n`;
}

function storedItem(item: WorkItem): WorkItem {
  return {
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
  };
}

export function formatStatusJson(state: LedgerState, epic: Epic | null, events: EventView): string {
  const header = {
    schemaVersion: 1 as const,
    revision: state.revision,
    eventsRevision: events.eventsRevision,
    eventsLag: events.eventsLag,
  };
  if (epic === null) {
    return `${JSON.stringify(
      {
        ...header,
        epics: state.epics.map((entry) => ({
          id: entry.id,
          title: entry.title,
          counts: counts(entry),
        })),
      },
      null,
      2,
    )}\n`;
  }
  return `${JSON.stringify(
    {
      ...header,
      epic: {
        id: epic.id,
        title: epic.title,
        outcome: epic.outcome,
        createdAt: epic.createdAt,
        updatedAt: epic.updatedAt,
        items: epic.items.map((item) => storedItem(item)),
      },
    },
    null,
    2,
  )}\n`;
}

export function formatWarnings(events: EventView): string {
  if (events.warnings.length === 0) {
    return "";
  }
  return `${events.warnings.join("\n")}\n`;
}
