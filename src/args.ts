export interface ParsedCommand {
  readonly help: boolean;
  readonly version: boolean;
  readonly root: string | undefined;
  readonly positionals: readonly string[];
}

export type ParseResult =
  | { readonly ok: true; readonly args: ParsedCommand }
  | { readonly ok: false; readonly message: string };

type BooleanOption = "--help" | "--version";

function booleanOption(flag: string): BooleanOption | undefined {
  if (flag === "--help" || flag === "-h") {
    return "--help";
  }
  if (flag === "--version" || flag === "-v") {
    return "--version";
  }
  return undefined;
}

export function parseArgs(argv: readonly string[]): ParseResult {
  let help = false;
  let version = false;
  let root: string | undefined;
  let seenHelp = false;
  let seenVersion = false;
  let seenRoot = false;
  const positionals: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === undefined) {
      continue;
    }
    if (token === "-" || !token.startsWith("-")) {
      positionals.push(token);
      continue;
    }

    const equals = token.indexOf("=");
    const flag = equals === -1 ? token : token.slice(0, equals);
    const inline = equals === -1 ? undefined : token.slice(equals + 1);
    const booleanName = booleanOption(flag);

    if (booleanName === "--help") {
      if (inline !== undefined) {
        return { ok: false, message: "error: invalid option: --help" };
      }
      if (seenHelp) {
        return { ok: false, message: "error: duplicate option: --help" };
      }
      seenHelp = true;
      help = true;
      continue;
    }

    if (booleanName === "--version") {
      if (inline !== undefined) {
        return { ok: false, message: "error: invalid option: --version" };
      }
      if (seenVersion) {
        return { ok: false, message: "error: duplicate option: --version" };
      }
      seenVersion = true;
      version = true;
      continue;
    }

    if (flag === "--root") {
      if (seenRoot) {
        return { ok: false, message: "error: duplicate option: --root" };
      }
      let value = inline;
      if (value === undefined) {
        const next = argv[index + 1];
        if (next === undefined) {
          return { ok: false, message: "error: missing required argument: --root" };
        }
        value = next;
        index += 1;
      }
      seenRoot = true;
      root = value;
      continue;
    }

    return { ok: false, message: `error: unknown option: ${flag}` };
  }

  return {
    ok: true,
    args: { help, version, root, positionals },
  };
}
