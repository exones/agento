# Report and checkpoint format

## Task report

Write `reports/<task>.md` using this structure:

```markdown
# Task <key>: <title>
Status: done | partly proven | blocked. Date: <date>.
Backlog item: <path>. Checkout/branch/HEAD: <actual values or not available>.

## Outcome
What changed, why, and which acceptance criteria are met.

## Evidence
| Check | Exact command or method | Result | Revision/log/CI/PR link |
| --- | --- | --- | --- |

## Decisions
Material choices, reasons, and any changes to the contract.

## Open points
Missing inputs, unverified claims, findings, follow-ups, and who can unblock them.

## Resume
One concrete next action and the intended next backlog item.
```

Reference actual evidence; do not invent links, commits, build results, or publication states. Keep secrets out. If there is no Git remote, say so.

## Current checkpoint

Keep one current handoff per epic. In coordinated mode the coordinator owns `checkpoints/current.md`; workers own `checkpoints/<task>.md` and send proposed shared-status updates in their report. In standalone mode the assigned agent owns the shared handoff. Record date, active task, checkout/branch/HEAD, controller version, completed work, in-flight commands/logs, last check, changed files, blockers, and next action. Before replacing a long-running session, optionally save a dated checkpoint snapshot too.

Prefer concrete actions such as "run the installed-package smoke check from D" over "continue implementation". State whether changes are committed/pushed; never infer that from a report.
