export type Kind = "story" | "task" | "spike";
export type ItemState = "backlog" | "in-progress" | "blocked" | "done";

export const LIMITS = {
  title: 200,
  outcome: 2000,
  reason: 2000,
  evidence: 2000,
  note: 2000,
  next: 500,
} as const;

export const TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const EPIC_ID = /^[A-Z][A-Z0-9]{0,20}-[0-9]{3}$/;
const ITEM_ID = /^[A-Z][A-Z0-9]{0,15}$/;
const CONTROL = /[\u0000-\u001F\u007F]/u;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function hasExactKeys(value: object, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  if (actual.length !== keys.length) {
    return false;
  }
  const present = new Set(actual);
  return keys.every((key) => present.has(key));
}

export function isEpicId(value: string): boolean {
  return EPIC_ID.test(value);
}

export function isItemId(value: string): boolean {
  return ITEM_ID.test(value);
}

export function isKind(value: string): value is Kind {
  return value === "story" || value === "task" || value === "spike";
}

export function isItemState(value: string): value is ItemState {
  return value === "backlog" || value === "in-progress" || value === "blocked" || value === "done";
}

export function isSafeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}

/** Reject control characters before trim so a newline or tab cannot disappear into a stored value. */
export function normalizeText(raw: string, max: number): string | undefined {
  if (CONTROL.test(raw)) {
    return undefined;
  }
  const trimmed = raw.trim();
  if (trimmed.length < 1 || trimmed.length > max) {
    return undefined;
  }
  return trimmed;
}

export function isPresentText(value: unknown, max: number): value is string {
  return typeof value === "string" && normalizeText(value, max) === value;
}
