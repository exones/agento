import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readPackageVersion(): string {
  const packagePath = fileURLToPath(new URL("../package.json", import.meta.url));
  const parsed: unknown = JSON.parse(readFileSync(packagePath, "utf8"));
  if (!isRecord(parsed) || typeof parsed.version !== "string" || parsed.version.length === 0) {
    throw new Error("package.json version is missing");
  }
  return parsed.version;
}
