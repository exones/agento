import { parseArgs } from "./args.js";
import { helpText } from "./help.js";
import { readPackageVersion } from "./package-version.js";

function writeUnknownCommand(words: readonly string[]): void {
  process.stderr.write(`error: unknown command: ${words.join(" ")}\nRun agento --help.\n`);
}

export function run(argv: readonly string[]): number {
  const parsed = parseArgs(argv);
  if (!parsed.ok) {
    process.stderr.write(`${parsed.message}\n`);
    return 1;
  }

  const args = parsed.args;
  if (args.help) {
    if (args.positionals.length > 0) {
      writeUnknownCommand(args.positionals);
      return 1;
    }
    process.stdout.write(helpText(readPackageVersion()));
    return 0;
  }

  if (args.version) {
    process.stdout.write(`agento ${readPackageVersion()}\n`);
    return 0;
  }

  if (args.positionals.length === 0) {
    process.stdout.write(helpText(readPackageVersion()));
    return 0;
  }

  writeUnknownCommand(args.positionals);
  return 1;
}