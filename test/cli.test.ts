import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = join(repoRoot, "dist", "cli.js");

const helpText = [
  "agento 0.1.0",
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

interface RunResult {
  readonly code: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

function runCli(args: readonly string[], cwd: string): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const output = child.stdout;
    const errors = child.stderr;
    if (output === null || errors === null) {
      reject(new Error("CLI stdio pipes were not created"));
      return;
    }
    output.on("data", (chunk: Buffer) => {
      stdout.push(chunk);
    });
    errors.on("data", (chunk: Buffer) => {
      stderr.push(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({
        code,
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8"),
      });
    });
  });
}

async function withWorkspace(check: (cwd: string) => Promise<void>): Promise<void> {
  const cwd = await mkdtemp(join(tmpdir(), "agento b "));
  try {
    await check(cwd);
    assert.equal(existsSync(join(cwd, ".crew")), false);
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
}

function unknown(words: string): string {
  return `error: unknown command: ${words}\nRun agento --help.\n`;
}

describe("agento help, version, and unknown commands", () => {
  test("the test process uses Node.js 26.13 or newer, below 27", () => {
    const match = /^v(\d+)\.(\d+)\.(\d+)/.exec(process.version);
    assert.ok(match);
    const major = Number(match[1]);
    const minor = Number(match[2]);
    assert.equal(major, 26);
    assert.ok(minor >= 13);
  });

  test("package metadata names the private ESM executable", async () => {
    const parsed: unknown = JSON.parse(await readFile(join(repoRoot, "package.json"), "utf8"));
    assert.equal(typeof parsed, "object");
    assert.ok(parsed !== null);
    const pkg = parsed as {
      name: string;
      version: string;
      private: boolean;
      type: string;
      bin: { agento: string };
      engines: { node: string };
      repository: { url: string };
    };
    assert.equal(pkg.name, "agento");
    assert.equal(pkg.version, "0.1.0");
    assert.equal(pkg.private, true);
    assert.equal(pkg.type, "module");
    assert.equal(pkg.bin.agento, "dist/cli.js");
    assert.equal(pkg.engines.node, ">=26.13.0 <27");
    assert.equal(pkg.repository.url, "git+https://github.com/exones/agento.git");

    const source = await readFile(cliPath, "utf8");
    assert.equal(source.startsWith("#!/usr/bin/env node\n"), true);
  });

  test("no arguments and help flags print help and write nothing else", async () => {
    await withWorkspace(async (cwd) => {
      for (const args of [[], ["--help"], ["-h"], ["--version", "--help"], ["--root", cwd]]) {
        const result = await runCli(args, cwd);
        assert.equal(result.code, 0, args.join(" "));
        assert.equal(result.stdout, helpText, args.join(" "));
        assert.equal(result.stderr, "", args.join(" "));
      }
    });
  });

  test("version prints the package version, including when other arguments are present", async () => {
    await withWorkspace(async (cwd) => {
      for (const args of [["--version"], ["-v"], ["init", "--version"], ["--version", "story", "add"]]) {
        const result = await runCli(args, cwd);
        assert.equal(result.code, 0, args.join(" "));
        assert.equal(result.stdout, "agento 0.1.0\n", args.join(" "));
        assert.equal(result.stderr, "", args.join(" "));
      }
    });
  });

  test("unimplemented commands fail with the unknown-command error", async () => {
    const cases: readonly (readonly [readonly string[], string])[] = [
      [["init"], "init"],
      [["new"], "new"],
      [["status"], "status"],
      [["story"], "story"],
      [["story", "add"], "story add"],
      [["task"], "task"],
      [["spike"], "spike"],
      [["nope"], "nope"],
      [["--help", "init"], "init"],
      [["story", "--help"], "story"],
    ];
    await withWorkspace(async (cwd) => {
      for (const [args, words] of cases) {
        const result = await runCli(args, cwd);
        assert.equal(result.code, 1, args.join(" "));
        assert.equal(result.stdout, "", args.join(" "));
        assert.equal(result.stderr, unknown(words), args.join(" "));
      }
    });
  });

  test("option errors stay on stderr and do not create a root", async () => {
    await withWorkspace(async (cwd) => {
      const missing = join(cwd, "missing root");
      const cases: readonly (readonly [readonly string[], string])[] = [
        [["--json"], "error: unknown option: --json\n"],
        [["--version", "--json"], "error: unknown option: --json\n"],
        [["-q"], "error: unknown option: -q\n"],
        [["--help=yes"], "error: invalid option: --help\n"],
        [["--root"], "error: missing required argument: --root\n"],
        [["--root", "a", "--root", "b"], "error: duplicate option: --root\n"],
        [["-h", "--help"], "error: duplicate option: --help\n"],
        [["--root", missing, "init"], unknown("init")],
      ];
      for (const [args, stderr] of cases) {
        const result = await runCli(args, cwd);
        assert.equal(result.code, 1, args.join(" "));
        assert.equal(result.stdout, "", args.join(" "));
        assert.equal(result.stderr, stderr, args.join(" "));
      }
      assert.equal(existsSync(missing), false);
    });
  });

  test("the repository root gains no .crew directory", () => {
    assert.equal(existsSync(join(repoRoot, ".crew")), false);
  });
});
