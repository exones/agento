# Epic AGENTO-001: a usable seed

Created: 2026-11-03. Owner: user. Status: in-progress; A/B/C/N In Review for bootstrap PR delivery. D/R remain backlog.
Target: first 0.1 candidate. Controller: bootstrap `agento-coordinate` skill and manual files; no released CLI. Preferred roles: Sol High coordinator and one Grok 4.7 Extra High worker when assigned.
Repository: `https://github.com/exones/agento.git`, public, current account ADMIN. Initial remote `main` is `dc6e3c4`. Preserve the user's bundled A/B commit `3283807`; deliver it with the ledger/storage correction in one bootstrap PR, as explained in [delivery evidence](reports/bootstrap-delivery.md). Hosted CI remains unverified until its run is observed.

## Why

Build agento incrementally and use its current release to organize the next release. Begin with durable files and a manual CLI ledger, then introduce execution and coordination. TypeScript/Node.js, PowerShell automation, GitHub Actions, and npm distribution are the selected implementation/release path.

## Outcomes

1. A fresh agent can locate the next assignment and resume from files.
2. One installable Node.js package exposes a TypeScript-built `agento` executable.
3. The CLI creates an epic ledger, tracks stories, preserves state/events across processes, and renders readable status. An epic describes the outcome; a future execution run describes an attempt to deliver it.
4. A PowerShell verification entry point runs meaningful product checks locally and in Windows/Linux GitHub Actions.
5. The actual packed artifact works outside the source checkout and can track the next development stage.
6. A report distinguishes local readiness, remote CI evidence, release blockers, and proposed next-stage work.
7. A reusable coordinator skill turns a short goal into analysis, an epic/backlog, and acceptance planning; delivery/resume requests follow that plan without requiring the user to repeat a long prompt.

## Scope boundary

Include help/version, idempotent initialization, epic/story ledger creation, manual story tracking, state validation and serialization, events, status, tests, build/verification scripts, Actions, packaging proof, and operating instructions. The bootstrap coordinator skill is already authored before product implementation; its live usage will refine it.

Exclude product T3 dispatch, messaging, automated gates/merge decisions, scheduling, watchdogs, provider failover, automatic exports, dashboards, registry deployment, and parallel implementation workers. A separate manually assigned coordinator may supervise the single worker. Seed completion is an explicit manual record, not independently verified acceptance.

## Features and prioritized backlog

Feature F1: a verified CLI for manual epic/story tracking. Feature F2: an installable bootstrap release. Coordinator workflow bootstrapping supports both. The former self-hosted registry spike is cancelled after selecting npm.

| ID | Kind | Feature | Backlog item | Depends on | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| A | spike | F1 | [Preflight and contract](backlog/A-preflight.md) | None | in-review | [Local acceptance](reports/A-review.md); [PR #1 delivery evidence](reports/bootstrap-delivery.md), product CI/review passed; latest-head CI and human merge pending |
| B | enabler task | F1 | [Foundation and CI](backlog/B-foundation.md) | A contract accepted locally | in-review | [Local acceptance](reports/B-review.md); [PR #1 delivery evidence](reports/bootstrap-delivery.md), product CI/review passed; latest-head CI and human merge pending |
| C | story | F1 | [Manual ledger](backlog/C-ledger.md) | B local gate accepted | in-review | [Worker evidence](reports/C.md); [review findings and fixes](reports/bootstrap-review.md), 40 local tests and product CI/review passed; latest-head CI and human merge pending |
| N | task | F1 | [Use agento for storage naming](backlog/N-storage-name.md) | C returned; local ledger gate passed | in-review | [Worker evidence](reports/N.md), [local review](reports/N-review.md); [PR #1 delivery evidence](reports/bootstrap-delivery.md), product CI/review passed; latest-head CI and human merge pending |
| D | story | F2 | [Package and bootstrap proof](backlog/D-package.md) | C and N local gates | backlog | No execution report yet |
| R | review task | F2 | [Fresh-context review](backlog/R-review.md) | D candidate | backlog | No execution report yet |
| I | spike | superseded infrastructure | [Registry discovery](backlog/I-registry-discovery.md) | None | cancelled | User selected npm; no Forgejo deployment |

A -> B -> C -> N -> D -> R is sequential. N applies the user's storage naming correction at C's safe handoff boundary. R's findings go to an implementation fix assignment before closure. I is documentation/discovery only, outside seed acceptance. No agent launches another from these backlog items.

In coordinated mode Sol owns this backlog table and `checkpoints/current.md`; Grok owns its item checkpoint and report. The coordinator skill assembles assignments from these files. Without a separate coordinator, the standalone agent maintains shared status.

Local readiness can advance while GitHub target information is missing. The milestone must not claim remote CI passed or a release exists without evidence.

## Seed CLI contract to settle in A

Keep the surface small: `--help`, `--version`, `init`, `new`, `status`, and `story add/start/block/complete`. `new` creates the manual epic ledger; it does not start agents. Specify exact arguments, epic selection, story states, exits, and evidence notes in `docs/seed-contract.md` during A. Unsupported commands fail clearly. Avoid a generic mutable state setter. The coordinator's backlog may also contain tasks/spikes; A should specify how the seed's minimal ledger represents them without introducing extra command families.

## Definition of Ready and Definition of Done

Use [the project workflow](../../../docs/agile-workflow.md). Ready requires clear outcome/scope, satisfied dependencies, explicit ownership, and testable acceptance/evidence. A worker submits evidence for review; the coordinator confirms Done. A completed spike records its decision, not necessarily code. Item-level Done and epic release readiness are separate.

Updated delivery rule: each story/spike goes through scoped Conventional Commits, a PR, applicable hosted CI, review, and human-approved merge before Done. Earlier A/B local acceptance is retained, with outstanding PR/CI gates visible above. A/B were bundled in a user commit before this rule; preserve that history and group their delivery with C/N in the bootstrap PR. Supporting reviews/tasks attach to that PR. README contains capabilities/setup/usage, while this epic and checkpoints own progress.

Local state lives under `.agento/` and is excluded from Git. Task N supersedes the pre-release `.crew/` implementation. The CLI owns state; work-item notes/checkpoints stay human readable. Document schema version, write serialization, interrupted-write handling, and state/event consistency. Test the guarantees actually implemented; defer automatic crash recovery to its roadmap stage.

## Stage gates

- [ ] Bootstrap skill: structural validation passes and short-goal planning/resume is exercised in a fresh supported host. Do not claim live discovery or delegation proof from schema validation alone.
- [x] A: environment facts and exact seed contract recorded; unknown T3 behavior deferred explicitly. Coordinator corrections accepted in `reports/A-review.md`.
- [x] B: typecheck/build/tests run through PowerShell; basic CLI works; Actions workflow prepared. Local acceptance in `reports/B-review.md`.
- [x] C local/product gate: epic/story ledger creation, transitions, validation, non-overwrite behavior, persistence, and serialized updates proven by 40 tests and Windows/Ubuntu CI on `af0b69f`; delivery still awaits human-approved merge.
- [x] N local gate: `.agento/` is consistent across runtime, help/errors, tests, ignore rules, and current documentation; coordinator reran 39 tests. Delivery Done remains pending PR/CI/review/approved merge.
- [ ] D: tarball installs in a clean directory and performs the ledger exercise through the installed executable.
- [ ] Windows and Linux GitHub Actions pass on the final candidate revision, or remain explicitly blocked pending repository setup.
- [ ] A/B bootstrap and subsequent delivery items have honest PR/CI/review/merge evidence; reconcile existing user commits without rewriting history. Local checkboxes above do not close these delivery gates.
- [ ] R: findings triaged with evidence; fixes checked; no unresolved high-impact correctness/packaging issue.
- [ ] Final report and retro written; next-stage controller installation instructions recorded.
- [ ] If a release is authorized, exact version/artifact/digest and publication location recorded. Otherwise identify the candidate as locally ready, not released.

## Decisions

- 2026-11-03: bounded fix review reports no findings on `af0b69fa4c6ea8d2216d133c6d46a99981a1cbd9`; Windows/Ubuntu PR-triggered CI run 41663657936 passes on that head. Commit the evidence-only update, require latest-head CI, then hand back for the human merge decision without another product change or redundant review cycle. D/R remain backlog.
- 2026-11-03: fresh bootstrap review found a long-reason generated-default bug (P1) and an incorrect POSIX rename expectation (P2). Corrected the bounded generated default while preserving the full 2000-character reason and explicit 500-character next action. Preserved pre-commit failure coverage; the corrected read-only-destination test asserts each platform's actual semantics. Initial Ubuntu CI confirmed the original test failure. Forty local tests now pass; final hosted CI and fix review remain required.
- 2026-11-03: N returned and its local gate passed independently (39 tests). README now contains supported capabilities/usage and stable contributor links, with live progress removed. Reconcile A/B/C/N through one bootstrap PR because A/B already share the user's `3283807` commit; preserve it without rewriting history. Fresh review and hosted CI must examine the actual candidate head.
- 2026-11-03, user: storage must also use the selected tool name. `.agento/` supersedes `.crew/`; added bounded task N after C and before D to avoid concurrent worker edits. Historical reports/original reference material retain the names actually observed.
- 2026-11-03: user requires commit/PR/CI/review delivery (including spikes), Conventional Commits, and no work-progress dashboard in README. A/B are locally accepted but In Review pending delivery gates. Preserve user's existing `3283807` bootstrap commit; reconcile real PR coverage after C returns. Keep C running unchanged and defer README/index/branch changes until then.
- 2026-11-03: accepted B after independent verification and an installer preservation fix. Remote CI remains unrun. Proceeding to C within resumed delivery scope, with one Grok worker and no additional human approval gate.
- 2026-11-03: user confirmed npm and requested continuation. Cancelled spike I and marked the Forgejo design superseded; npm account/scope/trust setup will be surfaced when release work needs the user. B starts with one Grok worker in the shared checkout so it can read uncommitted handoff files. No publishing or remote write is included in the worker assignment.
- 2026-11-03: accepted A after correcting state replacement and incomplete-event handling. Node 26.x (`>=26.13.0 <27`) and pwsh 7.6+ are the seed baseline; local Node is still 24.19.0. B is ready and unassigned. Scope for this initial handoff stops after A's review.
- 2026-11-03: user asked to start. Coordinator verified A's readiness and is assigning only spike A to Grok 4.7 Extra High through Cursor in the existing checkout. Review A's evidence before starting B; this assignment does not authorize product implementation or publication.
- 2026-11-03, user: use Agile epic/story/task/spike organization. Renamed active files to `epics/.../epic.md` and `backlog/`; preserved IDs and historical reference material. Authored coordinator skill in stage 0 so analysis/refinement precedes implementation.
- 2026-11-03: public npm is proposed for simpler distribution if public visibility is selected; Forgejo is optional. No registry is required to start A or build the seed tarball.
- 2026-11-03, user preference: Sol High coordinates and Grok 4.7 Extra High implements; retain one implementation worker at a time. Added role-specific status ownership to avoid shared-file races.
- 2026-11-03, user: CLI executable is `agento`, in full. Current implementation backlog items and examples follow this name.
- 2026-11-03: follow `docs/decisions.md`; the original full MVP is a reference, not the seed implementation checklist.
- 2026-11-03: work files now, product implementation only through assigned backlog items. Next is A.
- 2026-11-03: self-hosted Forgejo is the intended registry; private connectivity follows `docs/forgejo-tailscale.md`; deployment awaits host discovery.

## Open setup items

See `docs/decisions.md` and `docs/npm-distribution.md` for npm identity, publishing setup, and any GitHub access prerequisites. No Forgejo host or tailnet publishing setup is needed. Do not copy identities or authorizations from inspiration examples.

## Closure

Use [report format](../../report-format.md). Write `reports/final.md` against outcomes 1-7 and complete `retro.md`. The accepted 0.1 artifact becomes stage 2's pinned controller; starting stage 2 requires its own refined epic/backlog.
