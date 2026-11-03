# agento

agento is a TypeScript/Node.js CLI for staged, recoverable agent work through T3 Code. PowerShell is the preferred language for build, verification, packaging, and infrastructure automation. GitHub hosts source and Actions; npm is the selected package registry. Tailscale remains available for future private infrastructure, with no Forgejo deployment in scope.

Project and CLI name: **agento**. Use `agento` as the executable, for example `agento --help` and `agento --version`. See the [naming decision](docs/cli-name.md). The local package is unscoped `agento` at candidate `0.1.0` with `private: true`. Package publication identity is still to be selected.

## Start here

Spike A is accepted; see the [contract](docs/seed-contract.md) and [coordinator review](epics/agento/001-seed/reports/A-review.md). The current foundation implements help, version, and unknown-command failure. Ledger commands are not implemented, and this build does not create `.crew/`.

In a Sol High session opened on this project, describe the goal normally, for example: **"Continue the seed epic."** The shared coordinator workflow performs analysis, backlog refinement, and acceptance planning. For explicit skill selection use `$agento-coordinate` in Codex, or select `agento-coordinate` from Cursor's `/` skill picker.

1. Read [AGENTS.md](AGENTS.md).
2. Open the [seed epic](epics/agento/001-seed/epic.md).
3. Read its [current checkpoint](epics/agento/001-seed/checkpoints/current.md).
4. Use the [coordinator skill](.agents/skills/agento-coordinate/SKILL.md) or the short examples in the [handoff guide](docs/agent-handoff.md).

## Build and verify

The seed requires Node.js `>=26.13.0 <27` and PowerShell 7.6 or newer (`pwsh`). The local pin is the official Node.js `26.13.0` Windows archive. The installer places it in `.tools/node` and does not replace the system Node.js. `.tools/`, `node_modules/`, and `dist/` are gitignored. `.agents/` skills and `epics/` evidence stay tracked.

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
3. `npm run test` (`node --test` on `test/cli.test.ts`)

It stops on the first native command with a nonzero exit code and returns that code. It does not call `npm run verify`. The same script is the GitHub Actions gate. Dependencies must already be installed with `npm ci`.

This also runs the gate directly:

```powershell
pwsh -NoProfile -File .\scripts\Verify.ps1
```

## CLI

Verification compiles the executable to `dist/cli.js`. `package.json` maps the `agento` bin to that file. This checkout does not install the bin onto `PATH`; run the compiled entry:

```powershell
node .\dist\cli.js --help
node .\dist\cli.js --version
node .\dist\cli.js init
```

`--help` and `-h` print help to stdout and exit 0. With no arguments, behavior matches `--help`. When help is absent, `--version` and `-v` print one stdout line, `agento 0.1.0`, and exit 0, including when other arguments are present. The version text is the `version` field of the `package.json` shipped beside the compiled entry.

A command this build does not implement, including `init`, `new`, `status`, and `story`, exits 1. stderr is:

```text
error: unknown command: init
Run agento --help.
```

`--help` with an unknown command word uses that same error. These commands do not create `.crew/`.

## Continuous integration

`.github/workflows/ci.yml` runs `npm ci` and `npm run verify` on `windows-latest` and `ubuntu-latest` with `shell: pwsh` and Node.js `26`. The job fails if `pwsh` is older than 7.6.0.

Checked on 2026-11-03, the hosted images already meet that PowerShell baseline, so the workflow does not install another copy:

- Windows Server 2025 readme (image `20261021.299.1`) lists PowerShell 7.6.7. The 2026-10-30 image update lists 7.6.9.
- Ubuntu 24.04 and Ubuntu 26.04 readmes list PowerShell 7.6.9. `ubuntu-latest` is moving to Ubuntu 26.04 through 2026-11-19.

Action pins are `actions/checkout` `v7.0.1` (`3d3c42e5aac5ba805825da76410c181273ba90b1`) and `actions/setup-node` `v7.1.0` (`949feb2413d6458794dcd2491c4babbbce0c15c1`). The workflow does not use T3, Tailscale, npm publishing credentials, or Forgejo. Preparing the workflow is not a remote CI result; no Actions run is recorded yet.

## Durable context

- [Decisions](docs/decisions.md): current requirements and their rationale.
- [Roadmap](docs/roadmap.md): capability stages and bootstrap promotion gates.
- [Agile workflow](docs/agile-workflow.md): epics, stories, tasks, spikes, and readiness/completion criteria.
- [Seed contract](docs/seed-contract.md): schema 1 command and storage behavior. B implements only the help/version portion.
- [Coordinator skill](.agents/skills/agento-coordinate/SKILL.md): reusable goal-to-analysis-to-plan-to-delivery workflow, available before the ledger exists.
- [Agent handoff](docs/agent-handoff.md): task assignment, resumption, and reporting.
- [npm distribution](docs/npm-distribution.md): selected release path and account/setup steps needed before publication.
- [Epics](epics/README.md): work organization and report conventions.
- [Original MVP plan](t3_multi-agent_mvp_86005e32.plan.md): longer-term design input. Its PowerShell-only implementation and original milestone order have been superseded by the decisions and roadmap above.
- [Inspiration](inspiration/README.md): reference material; its historical permissions, hosts, credentials, and deployment instructions do not authorize actions for this project.

The next implementation agent should preserve these files and continue from the current checkpoint. A chat transcript must not be required to continue.
