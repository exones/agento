# Assigning work to agents

## Start with a goal, not a long prompt

The reusable [agento-coordinate skill](../.agents/skills/agento-coordinate/SKILL.md) now owns the coordinator workflow. In a fresh Sol High session opened on this project, say one of:

```text
Plan the agento seed epic.
Build the agento seed epic.
Continue the seed epic.
```

Planning performs analysis and backlog refinement, then leaves a reviewable epic with acceptance criteria. Delivery requests perform that preparation and continue with ready work within scope. The coordinator assembles worker assignments from the files; you do not need to repeat provider settings or long path lists. A request to start only A still stops after A.

For explicit selection in Codex: `$agento-coordinate Plan the seed epic`. In Cursor, select `agento-coordinate` from the `/` skill picker. Automatic selection is enabled, but host discovery/matching must still be exercised in a fresh session. Root `AGENTS.md` also points to the file as a fallback. This session's skill catalog may not refresh dynamically.

The project uses a single skill at `.agents/skills/agento-coordinate/`, a directory supported by both [Codex](https://learn.chatgpt.com/docs/build-skills) and [Cursor](https://cursor.com/docs/skills). These are host discovery capabilities; the skill does not change model selection itself. No global installation or duplicated provider-specific skill is required for this project. Commit the skill and epic documents before isolated child checkouts so they are available there.

Agile hierarchy and gates: [agile-workflow.md](agile-workflow.md). Existing backlog files are under `epics/agento/001-seed/backlog/`. The longer prompts below remain manual/debugging alternatives.

## Start task A through the coordinator

Historical first-assignment example: A is now accepted. For current work say "Continue the seed epic"; the epic/checkpoint, not this example, determines the next Ready item (currently B). Do not rerun A from this template.

In a Sol High session opened on this project, paste the following when ready to start actual work. Pasting it explicitly authorizes one Grok task; merely reading this document does not.

```text
Act as agento's coordinator. Read AGENTS.md, docs/decisions.md,
docs/agent-handoff.md, epics/agento/001-seed/epic.md,
and epics/agento/001-seed/checkpoints/current.md.

Start task A now using T3 delegate_task: provider cursor, model grok-4.7,
target.options {reasoning_effort: "xhigh"}, isolation shared.
Give the worker the full task-A prompt from this handoff guide, with the
explicit read-first paths and separate checkpoint/report ownership.
Use one worker; if the requested model/settings are unavailable, report it.
Follow T3's returned completion instructions. When A finishes, inspect
its files/report, check its acceptance criteria, and update shared status.
Stop after A and report whether B is ready. Do not merge, publish, deploy,
create a remote repository, or start B.
```

Task A uses the existing checkout for environment inspection and contract documents; it does not require Git/worktree setup. Product implementation starts in B. Public npm is a distribution proposal, not a prerequisite for A and not permission to publish.

## Provider loading and the user's role choices

`AGENTS.md` contains project guidance shared across providers. Automatic loading is a feature of the agent host, not of the underlying language model. Codex discovers it at session startup ([OpenAI documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md)); Cursor CLI also applies the root file as rules ([Cursor documentation](https://cursor.com/docs/cli/using)). Other context files are explicitly named in the task; do not assume Markdown links recursively load their contents.

Always include the read-first paths in the assignment. This also covers another provider whose host does not discover `AGENTS.md`. If files change during a long session, explicitly reread them at the next assignment/resume boundary.

User preference and local T3 capability observation, 2026-11-03:

- Coordinator: Sol High. This active session reports provider `codex`, model `gpt-6.1-sol`, option `reasoningEffort: high`.
- Worker: Grok 4.7 Extra High, currently available through provider `cursor`, model `grok-4.7`, option `reasoning_effort: xhigh`. The separately named direct `grok` provider is disabled. Do not confuse model choice with provider route.

These are T3 settings, not settings activated by reading a Markdown file. Keep unrelated options at their existing defaults unless the user asks otherwise. Recheck availability before an actual delegated task. Do not launch a worker merely because this guide specifies its settings.

## Coordinated seed mode

One Sol coordinator and one Grok implementation worker can use the existing seed sequence without parallel implementation. The coordinator owns `epic.md` and `checkpoints/current.md`. The worker owns `checkpoints/<task>.md` and `reports/<task>.md`. When a backlog item requests shared status/checkpoint changes, the worker proposes them in its report; the coordinator applies them. This avoids two agents overwriting the same handoff file.

Give Sol High this role prompt:

```text
Act as agento's coordinator. Read AGENTS.md, docs/decisions.md,
docs/agent-handoff.md, epics/agento/001-seed/epic.md,
and epics/agento/001-seed/checkpoints/current.md.
Prepare the next ready task for Grok 4.7 Extra High through Cursor.
Keep one implementation worker at a time. Own epic.md and the
current checkpoint; do not implement product code. Verify the worker's
report against files and gate evidence before advancing status.
For now give me the exact worker assignment; do not launch it.
```

Give Grok this worker prompt for task A:

```text
Act as the implementation worker under a separate coordinator.
Read AGENTS.md, docs/decisions.md, docs/agent-handoff.md,
epics/agento/001-seed/epic.md,
epics/agento/001-seed/checkpoints/current.md, and
epics/agento/001-seed/backlog/A-preflight.md.
Before edits, briefly identify the assigned deliverable, gate, and exclusions.
Execute A only; do not spawn agents or start successor tasks.
Own epics/agento/001-seed/checkpoints/A.md and reports/A.md.
Leave epic.md and checkpoints/current.md to the coordinator.
Record exact checks, missing inputs, and proposed status changes in reports/A.md.
```

For B/C/D replace A's backlog item, task checkpoint, and report with the selected task's paths. Model/reasoning settings are selected in T3 separately. Task A is preflight/contract work; product implementation starts with B.

Bring the worker's report path back to Sol, asking it to inspect the actual changes, run any necessary independent check, and update the shared status. Each model can resume from these files without the other model's chat history. Reports remain evidence claims until checked.

Initially use manual role sessions with sequential edits in the current checkout. No implementation worker is launched by this documentation change. When delegated execution is explicitly authorized, use T3 cross-provider delegation with the selected settings and an explicit task/role prompt. Such children get the supplied task, not an automatic copy of this conversation. Before isolated worktree delegation, establish Git and commit the handoff documents: uncommitted files are not included in a child checkout based on a commit.

The standalone prompts below still apply when no separate coordinator is assigned.

## Start now

Open this project in an agent session and paste:

```text
Work in this repository. Read AGENTS.md, docs/decisions.md,
epics/agento/001-seed/epic.md, and
epics/agento/001-seed/checkpoints/current.md.

Execute only epics/agento/001-seed/backlog/A-preflight.md.
Do the work yourself; do not spawn agents or start new T3 threads.
Update the checkpoint and epic row and write reports/A.md.
Record anything unverified. Do not implement the product, create a remote,
publish, merge, deploy infrastructure, or change the tailnet.
End with the result and the exact next assignment.
```

Task A prepares the implementation contract. The actual implementation starts with B, then C, then D. Assign R to a fresh reviewer after D. Give each session only its selected backlog item.

## Assign an implementation backlog item

Replace BACKLOG-ITEM and ITEM-REPORT with the paths below:

```text
Read AGENTS.md, docs/decisions.md, the seed epic, its current
checkpoint, BACKLOG-ITEM, and the dependency reports named there.
Execute only BACKLOG-ITEM. Do the work yourself; do not spawn agents.
Keep changes scoped and run its required checks. Continue independently
where a missing external input does not block the local work.
Update the checkpoint and epic row and write ITEM-REPORT with
proof, decisions, and open points. Report unavailable remote proof honestly.
Do not merge, publish, deploy, or start successor backlog items.
```

| Order | BACKLOG-ITEM | ITEM-REPORT | Ready when |
| --- | --- | --- | --- |
| A | `epics/agento/001-seed/backlog/A-preflight.md` | `epics/agento/001-seed/reports/A.md` | Complete; do not rerun |
| B | `epics/agento/001-seed/backlog/B-foundation.md` | `epics/agento/001-seed/reports/B.md` | Ready; A accepted, include A-review |
| C | `epics/agento/001-seed/backlog/C-ledger.md` | `epics/agento/001-seed/reports/C.md` | B local gate passes |
| D | `epics/agento/001-seed/backlog/D-package.md` | `epics/agento/001-seed/reports/D.md` | C ledger gate passes |
| R | `epics/agento/001-seed/backlog/R-review.md` | `epics/agento/001-seed/reports/R.md` | D candidate exists |
| I | `epics/agento/001-seed/backlog/I-registry-discovery.md` | `epics/agento/001-seed/reports/I.md` | Cancelled: npm selected; do not assign |

For the first stage use the same implementation agent or fresh sequential sessions. Do not start B/C/D simultaneously: they share package, state, and CI interfaces. A blocked remote setup does not prevent completing local proofs.

## Resume after context loss

```text
Read AGENTS.md, the seed epic, and its current checkpoint.
Resume only the task identified as active there, using its backlog item and reports.
Inspect files and git status before acting; reconcile unfinished commands
and partial changes. Do not redo completed work or start another task.
If no task is active, report the next ready backlog item without starting it.
Update the durable checkpoint before ending.
```

The agent must record checkout/branch/HEAD when Git exists, files changed, command/log locations, last passing check, blockers, and one next action. Never put a credential in the handoff.

## Review and closure

Assign R as a read-only product review; its backlog item permits writing review documents only. An implementation agent handles findings in a separate scoped fix assignment. Do not treat the reviewer's final chat message as the only copy of the findings.

After findings are triaged, reconcile the seed checklist, write `reports/final.md` and `retro.md`, and identify release blockers. Local readiness and completed remote release are separate claims. Obtain the missing target/authority before remote creation, merge, publication, or deployment.

The first accepted 0.1 package then becomes the controller for tracking stage 2. Automated dispatch is not present in 0.1; the operator still assigns sessions using this guide.
