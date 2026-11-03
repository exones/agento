# Agile work organization for agento

## Work hierarchy

- **Epic:** a measurable outcome large enough to need several backlog items. `epic.md` records the problem, scope, success measures, dependencies, decisions, and release evidence.
- **Feature:** optional grouping of related capability inside an epic. Use a heading/field, not another tracking system. Skip it for a small epic.
- **Story:** a small usable outcome, with a beneficiary, value, and testable acceptance criteria. Prefer vertical slices that can be reviewed independently.
- **Task:** an implementation or verification step supporting a story/epic. Keep ordinary steps as a checklist in their parent item; separate only when ownership or dependencies warrant it.
- **Spike:** bounded research with a question, effort/time limit, expected evidence, and a decision or follow-up. It must not become open-ended implementation.

The release roadmap groups capability milestones; an epic is not automatically a fixed-duration sprint. Start with a prioritized flow of work and WIP limit one. Use a sprint goal/timebox only when scheduling provides value. Do not invent story points, velocity targets, daily ceremonies, or extra roles merely to use Agile names.

## Files

```text
epics/<project>/<NNN>-<slug>/
  epic.md                  # epic outcome and prioritized backlog index
  backlog/<ID>-<slug>.md   # story, enabler/task, or spike; includes kind/acceptance
  checkpoints/current.md  # coordinator-owned handoff
  checkpoints/<ID>.md     # worker-owned handoff
  reports/<ID>.md         # evidence and proposed status update
  reports/reviews/<parent>/01.md      # exact-revision review pass
  checkpoints/reviews/<parent>/01.md # reviewer-owned resume point
  reports/final.md        # epic outcome and release evidence
  retro.md                # observed lessons and follow-up backlog items
```

Keep existing seed IDs stable. A is a spike, B an enabler task, C/D stories, N a storage naming correction task, and I an optional infrastructure spike. The existing R assignment is a legacy alias for the seed epic's review gate, not a pattern for new backlog IDs. A file under `backlog/` is not necessarily a user story. Tasks within these items are checklists, not separate PR requirements.

## Review gates and indexing

Routine implementation reviews belong to the item being reviewed. Use `<parent>/review-<NN>`: `D/review-01`, then `D/review-02` for a new independent recheck. A milestone review spanning several items belongs to the epic, for example `AGENTO-001/review-01`. Reviewers are roles; their assignment does not create another story/task letter or a separate delivery PR.

Store a pass at `reports/reviews/<parent>/<NN>.md` and its optional resumable reviewer checkpoint at `checkpoints/reviews/<parent>/<NN>.md`. Record parent, pass, reviewer, exact checked SHA, PR/artifact identity, scope/acceptance, findings, checks, and limits. Findings can be referenced as `D/review-01/F1`; keep those labels stable through triage. The parent epic/item links the gate and its result. Preserve prior passes rather than overwriting evidence for another revision.

Record fixes/refutations/deferrals against the parent and exact revision. A new independent review/recheck gets the next pass; a coordinator's evidence update is not automatically another independent review. Reviews remain required for Done; indexing does not change acceptance, model selection, or human merge authority.

Preserve existing IDs and historical evidence. Legacy R maps to `AGENTO-001/review-01`. A running assignment keeps its named output files until it returns; the coordinator then files its report/checkpoint at the parent-scoped paths and leaves legacy pointers. Do not restart a running reviewer just to change naming.

## Analysis and refinement

For a goal, inspect existing epic/backlog/checkpoints before creating new work. Record the problem and beneficiary, outcomes, relevant repository/build facts, constraints, unknowns, and risks. Ask only questions that materially change scope or acceptance; record reasonable defaults and continue independent analysis.

Split into the smallest useful stories and necessary spikes/tasks. Explain dependency order and file/resource ownership. Each item has a kind, outcome, scope/non-goals, acceptance criteria, implementation checklist, dependency/ownership fields, required evidence, and a resume/report path. Stories describe user value; technical enablers can describe developer/operator value without forced user-story prose.

Write `epic.md` and item files before dispatch. Use the coordinator skill's templates for new work; refine existing files instead of duplicating the backlog. A planning-only request ends with a reviewable plan. An execution request can continue within its authorized scope once the next item is ready.

## Definition of Ready

A backlog item is Ready when its outcome and boundaries are clear, dependencies are met, ownership is assigned, required inputs exist, acceptance criteria are testable, and the verification/evidence method is known. A spike is Ready when its question, limit, and required decision are clear. Unrelated external setup does not block local work.

## Definition of Done

For a delivery item: acceptance criteria satisfied, relevant local checks passed, scoped commit/PR exists, required hosted CI passes on its head, review findings are triaged, and human-approved merge is recorded. The report includes exact evidence and limitations; checkpoint/documentation reflect the outcome. Local acceptance alone stays In Review until the delivery gates are met.

For a spike: the question is answered with evidence or a concrete blocker, the next decision/action is recorded, and the research/report passes through PR, applicable CI, review, and approved merge. A useful spike need not produce code or artificial product tests.

Done for a story is distinct from a released epic. Missing remote CI/publication evidence remains visible on the epic's release checklist. Manually recording completion in the seed CLI does not create independent gate proof. Do not weaken acceptance criteria after failure; document and justify any genuine correction.

## Flow and ownership

Backlog -> Ready -> In Progress -> In Review -> Done. Use `blocked` with a specific blocker/owner/next action when progress cannot continue; preserve the prior state for resumption. `cancelled` needs a recorded reason. Use lowercase persisted labels: `backlog`, `ready`, `in-progress`, `in-review`, `done`, `blocked`, `cancelled`.

Sol High is the preferred coordinator; Grok 4.7 Extra High through Cursor is the preferred worker. The coordinator owns epic/backlog status and shared checkpoint. Each worker owns its item checkpoint/report and implementation scope. Keep one seed worker at a time. Subsequent epics can raise WIP only when tool capabilities and boundaries support it.

Every stage ends with an evidence review and short retrospective. Turn observed problems into a small fix, regression check, or backlog item; preserve the user's original outcome. No skill or status label grants permission to publish, merge, deploy, or change private infrastructure.

The canonical [delivery rules](../.agents/skills/agento-coordinate/references/delivery.md) define semantic commits, PR/head/CI/review evidence, the local-only bootstrap transition, and README boundaries. README describes usable project state; all operational progress belongs in epic/checkpoint/report files.
