# Working on agento

## Read and resume

Read `README.md`, `docs/decisions.md`, the assigned epic, `checkpoints/current.md`, and the assigned backlog item before acting. Read the backlog item's dependency reports. Treat current files as the handoff; historical chat and `inspiration/` are supporting context.

Current epic: `epics/agento/001-seed/epic.md`.
Current checkpoint: `epics/agento/001-seed/checkpoints/current.md`.

For a goal-level planning or orchestration request, use `.agents/skills/agento-coordinate/SKILL.md`. It analyzes the request, writes/refines the epic and backlog, and coordinates delivery within the user's requested scope. Read it directly if the host has not discovered it yet. Assigned workers execute their backlog item; they do not enter the coordinator workflow. Routine coding questions do not need the skill.

Use the Agile vocabulary in `docs/agile-workflow.md`: epic, optional feature grouping, story, task, spike, backlog, acceptance criteria, Definition of Ready, and Definition of Done. Keep existing backlog IDs stable. The original MVP and inspiration retain historical terminology.

Do only the assigned role and scope. A coordinator asked to deliver an epic may advance its ready backlog items within that scope; a worker stops after its assigned item and does not launch agents. Seed execution has one implementation worker at a time. A reviewer is assigned separately after the candidate exists. A planning-only request stops after the reviewable plan.

## Providers and roles

These instructions are shared project guidance, regardless of model/provider. Start every assignment by explicitly reading them and its named context files; other Markdown files are not assumed to load automatically. Provider/model/reasoning selection is set in T3, not by this file.

User preference: Sol High for coordination; Grok 4.7 Extra High for implementation. Current verified T3 worker route is Cursor model `grok-4.7` with option `reasoning_effort: xhigh`. The active Codex session reports model `gpt-6.1-sol` and `reasoningEffort: high`. Recheck capabilities before future delegation; do not substitute a different provider/model/settings without authorization.

When a coordinator is assigned, it owns `epic.md` and `checkpoints/current.md`, assigns the selected backlog item, checks evidence, and records the next action. Workers own `checkpoints/<task>.md` and `reports/<task>.md` plus their assigned implementation files. Interpret backlog items' shared-status update instructions as reporting those updates to the coordinator in this mode. Do not have both roles edit the shared checkpoint. Coordinator findings go back to the worker as scoped fixes; the coordinator does not implement product changes in that role.

In standalone mode, the assigned agent maintains the epic and current checkpoint itself as previously described. See `docs/agent-handoff.md` for exact role prompts and provider loading references.

## Decisions and implementation

- Project and CLI name: `agento`. Use `agento` in command examples, the package `bin` entry, and executable checks. See `docs/cli-name.md`. Retain `.crew/` until a storage rename is decided separately. Do not infer an npm scope from the project name.
- Product CLI and core: modern TypeScript on Node.js, strict checking, compiled JavaScript, one npm package initially.
- Automation and operational scripts: PowerShell 7 (`pwsh`), including substantive logic where useful. Do not replace it merely because it is a shell language.
- Source, PRs, build: GitHub and GitHub Actions.
- Private infrastructure connectivity: Tailscale. Public npm is the proposed release route if public distribution is selected; self-hosted Forgejo remains the private-hosting option. Registry/visibility selection does not authorize publishing.
- Adopt the backlog item/checkpoint/report workflow immediately. Add automation incrementally through the roadmap.
- Choose routine implementation details and ordinary dependencies within the assigned scope; record material choices. Escalate scope expansion, paid services, missing credentials, or changes to acceptance standards.
- Use `rg` for file/text discovery. Keep external command invocation explicit; propagate native exit codes in PowerShell. Avoid shell-interpolated command strings when structured argument lists suffice.

## State, gates, and release discipline

Keep machine state authoritative and human status derived or clearly descriptive. Agents do not hand-edit future `.crew/run.json` files. State and event records must have documented revision and failure behavior; do not claim crash guarantees that have not been tested.

The first release records manual progress. A human/agent marking an item complete is not independent gate evidence. Later gate evidence must identify the exact revision checked.

Run the meaningful checks required by the backlog item. Report commands and results honestly, including checks that could not run. Never weaken a gate or delete a failing test simply to pass. Fixes to an incorrect test or gate require a documented reason and preserved acceptance intent.

Develop future versions under a pinned, released controller installed outside the candidate checkout. Record controller version and schema version; do not upgrade active runs silently.

## Shared and external actions

Respect user changes. Inspect git status before editing. Work only in the assigned checkout and branch. Do not create a remote repository, merge, publish a release/package, deploy infrastructure, or change tailnet policy unless the task authorizes that action. Preparing code, workflows, plans, and evidence remains within implementation scope.

Do not put secrets in chat, git, reports, fixtures, or logs. Reference secret names and use the environment's secret mechanism when needed. Do not copy permissions or infrastructure identities from `inspiration/`.

## Checkpoint and finish

At a useful boundary, before switching context, and before ending a task:

1. Update the owned checkpoint (`checkpoints/<task>.md` for a coordinated worker, `checkpoints/current.md` for the coordinator or standalone agent): task, checkout/branch/HEAD when available, completed work, in-flight commands, next concrete action, blockers, checks, and changed files.
2. Coordinator/standalone agent: update the assigned row in `epic.md` with status and evidence/report links. Coordinated workers return proposed status updates in their report.
3. Write `reports/<task>.md` with outcome, checks, evidence, decisions, and open points. Distinguish local proof from remote CI/release proof.
4. End with a concise result and exact next action. If blocked, record what input unblocks it and continue independent in-scope work.

The checkpoint should let a fresh agent resume without the conversation.
