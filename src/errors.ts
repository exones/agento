export class LedgerFailure extends Error {
  readonly exitCode: 1 | 2 | 3 | 4 | 5;

  constructor(exitCode: 1 | 2 | 3 | 4 | 5, message: string) {
    super(message);
    this.name = "LedgerFailure";
    this.exitCode = exitCode;
  }
}

export function errnoCode(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = error.code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}
