# agento

agento is a TypeScript/Node.js CLI for tracking epics and work items in a local manual ledger. PowerShell provides build and verification automation. GitHub hosts source and Actions; npm is the selected package registry. T3 dispatch and automated coordination are planned capabilities.

Project and CLI name: **agento**. Use `agento` as the executable, for example `agento --help` and `agento --version`. See the [naming decision](docs/cli-name.md). The local package is unscoped `agento` at candidate `0.1.0` with `private: true`. Package publication identity is still to be selected.

## Start here

This build implements the schema 1 manual ledger: `init`, `new`, `status`, and `story add/start/block/complete`. See the [contract](docs/seed-contract.md). Completing an item records a manual note; independent verification remains a separate step.

For contribution and agent assignment instructions, see the [handoff guide](docs/agent-handoff.md).

## Build and verify

The seed requires Node.js `>=26.13.0 <27` and PowerShell 7.6 or newer (`pwsh`). The local pin is the official Node.js `26.13.0` Windows archive. The installer places it in `.tools/node` and does not replace the system Node.js. `.tools/`, `node_modules/`, `dist/`, and `.agento/` are gitignored. `.agents/` skills and `epics/` evidence stay tracked.

From the repository root:

```powershell
$nodeDir = pwsh -NoProfile -File .\scripts\Install-NodeToolchain.ps1
$env:Path = "$nodeDir;$env:Path"
node --version
npm ci
npm run verify
```

`node --version` should print `v26.13.0`. The installer writes progress to stderr and writes only the toolchain directory to stdout. It downloads `https://nodejs.org/dist/v26.13.0/`, checks the archive SHA-256 against that directory's `SHASUMS256.txt`, and also requires the checksum pinned in `scripts/Install-NodeToolchain.ps1`. A later run reuses the extracted toolchain.

`.npmrc` sets `engine-strict=true`. `npm ci` refuses a Node.js older than 26.13.0, including this machine's default 24.x install. `npm run verify` can be launched by that older npm; `scripts/Verify.ps1` still selects the pinned toolchain, or a Node.js 26 already on `PATH`, and runs the npm that shipped with it.

`npm run verify` runs `scripts/Verify.ps1`. That script selects the project toolchain when it is installed, otherwise a Node.js already on `PATH` that satisfies `>=26.13.0 <27`, and then runs, in order:

1. `npm run typecheck` (`tsc -p tsconfig.json --noEmit`)
2. `npm run build` (`tsc -p tsconfig.build.json`)
3. `npm run test` (`node --test --test-reporter spec test`, every suite under `test/`)

It stops on the first native command with a nonzero exit code and returns that code. It does not call `npm run verify`. The same script is the GitHub Actions gate. Dependencies must already be installed with `npm ci`.

This also runs the gate directly:

```powershell
pwsh -NoProfile -File .\scripts\Verify.ps1
```

## CLI

Verification compiles the executable to `dist/cli.js`. `package.json` maps the `agento` bin to that file. This checkout does not put `agento` on `PATH` and does not install a global copy. The package stays `private: true`. To run from source, use the compiled entry:

```powershell
node .\dist\cli.js --help
node .\dist\cli.js --version
node .\dist\cli.js --root "C:\work\demo project" init
```

In the examples below, `agento` means that compiled entry. Ledger commands do not call T3, Git, or the network.

`--help` and `-h` print help to stdout and exit 0. With no arguments, behavior matches `--help`. Help lists the ledger commands and includes `Completion is a manual record, not gate acceptance.` Help for a known command describes that command. `--help` with an unknown command word exits 1. When help is absent, `--version` and `-v` print one stdout line, `agento 0.1.0`, and exit 0, including when other arguments are present. The version text is the `version` field of the `package.json` shipped beside the compiled entry.

### Manual ledger

Schema 1 stores one manual epic ledger under `<root>/.agento/`. A directory named `.crew/` is not the ledger. This unreleased correction does not migrate, alias, or delete that directory or its contents. The root defaults to the working directory. The epic id is always an explicit argument. Stories, tasks, and spikes share the `story` commands. `--kind` selects the record and defaults to `story`.

```powershell
node .\dist\cli.js init
node .\dist\cli.js new DEMO-001 --title "Demo ledger" --outcome "Track one story by hand"
node .\dist\cli.js story add DEMO-001 S --title "Ship the ledger" --kind story --note "operator note"
node .\dist\cli.js story start DEMO-001 S --next "Write the ledger."
node .\dist\cli.js story block DEMO-001 S --reason "Waiting on review notes"
node .\dist\cli.js story start DEMO-001 S
node .\dist\cli.js story complete DEMO-001 S --evidence "Reviewed the manual record"
node .\dist\cli.js status DEMO-001
```

`story start` from `backlog` prints `started ... in-progress`. `story start` from `blocked` prints `resumed ... in-progress`. `story complete` prints `completed ... manual`. Status shows a done item with `evidence: manual record; not gate acceptance`. That line is the manual record. The CLI does not check the evidence text against a commit, a test run, or a review.

`init` is idempotent for valid schema 1. A second `init` exits 0, prints `already initialized schema 1`, and does not rewrite state or events, even when the event log is unhealthy. `init` does not repair that log. `new` and `story` are not idempotent. Repeating them for an existing id exits 2 and leaves both ledger files unchanged. An invalid transition also exits 2 and leaves the files unchanged.

`task`, `spike`, `story resume`, `story cancel`, and `story set` are unknown commands. There is no command that sets an arbitrary state. `agento task` exits 1 with:

```text
error: unknown command: task
Run agento --help.
```

### State, events, and recovery

`.agento/state.json` is authoritative. `.agento/events.jsonl` is an append-only log of accepted mutations. It is not a replay source. Schema 1 has no repair, replay, or crash-recovery command, and it creates no backup file. The ledger does not edit files under `epics/`.

A mutation writes the next document to `.agento/state.json.tmp`, syncs and closes that handle, then renames the temp file directly over `.agento/state.json` in the same directory. The live state file is not deleted or renamed away first. The event line is appended and synced after that rename. `init`, `new`, `status`, and `story` acquire `.agento/lock` by creating that directory. The first try is immediate. Retries are every 100 ms until 5000 ms after the first try. The CLI does not steal a stale lock. If a process stops while holding the lock, the directory stays. Remove `.agento/lock` only after confirming that no `agento` process is using that root.

These boundaries are what the tests cover:

- A failed replacement before the rename commits leaves the previous state and events in place. `.agento/state.json.tmp` can remain for diagnosis. The CLI does not promote a temp file or an operator backup.
- If the rename commits and the event append then fails, the command exits 5 and prints `error: state updated to revision <n> but the event append failed; not rolled back`. Run `status` before deciding whether to retry. The new state may already be committed. The CLI will not roll it back.
- Status can display committed state when the event file is missing, ends in a partial line, or its complete lines are a contiguous prefix behind the state revision. It warns and does not repair the log. A later mutation refuses those layouts, so a new event cannot hide a gap. Duplicate, skipped, or ahead revisions fail and are left untouched.
- Unknown schema versions, invalid JSON, and invalid state are left byte-for-byte unchanged.
- A symbolic link or Windows junction used as `.agento`, and a non-regular `state.json`, `events.jsonl`, or `state.json.tmp`, is rejected and not opened.

A kill or power loss during the rename or sync is not tested. Same-directory replacement is not a claim of filesystem crash durability. Reconciling a gap, a partial line, or a committed state with a missing event is a manual operator action after copying the diagnostic files aside.

## Continuous integration

`.github/workflows/ci.yml` runs `npm ci` and `npm run verify` on `windows-latest` and `ubuntu-latest` with `shell: pwsh` and Node.js `26`. The job fails if `pwsh` is older than 7.6.0.

The workflow uses pinned checkout/setup-node actions and the runner's PowerShell installation. It needs no T3 access, private infrastructure, or npm publishing credentials.

## Durable context

- [Decisions](docs/decisions.md): current requirements and their rationale.
- [Roadmap](docs/roadmap.md): capability stages and bootstrap promotion gates.
- [Agile workflow](docs/agile-workflow.md): epics, stories, tasks, spikes, and readiness/completion criteria.
- [Seed contract](docs/seed-contract.md): schema 1 command and storage behavior.
- [Coordinator skill](.agents/skills/agento-coordinate/SKILL.md): reusable goal-to-analysis-to-plan-to-delivery workflow.
- [Agent handoff](docs/agent-handoff.md): task assignment, resumption, and reporting.
- [npm distribution](docs/npm-distribution.md): selected release path and account/setup steps needed before publication.
- [Epics](epics/README.md): work organization and report conventions.
- [Original MVP plan](t3_multi-agent_mvp_86005e32.plan.md): longer-term design input. Its PowerShell-only implementation and original milestone order have been superseded by the decisions and roadmap above.
- [Inspiration](inspiration/README.md): reference material; its historical permissions, hosts, credentials, and deployment instructions do not authorize actions for this project.

The next implementation agent should preserve these files and continue from the current checkpoint. A chat transcript must not be required to continue.
