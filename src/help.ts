export function helpText(version: string): string {
  return [
    `agento ${version}`,
    "",
    "Usage:",
    "  agento [--root <dir>] [--help|-h] [--version|-v]",
    "",
    "Options:",
    "  --root <dir>     Project root. Defaults to the working directory.",
    "  -h, --help       Show help.",
    "  -v, --version    Print the version from this package.",
    "",
    "This build implements help and version only.",
    "",
  ].join("\n");
}
