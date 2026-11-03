---
name: agento-coordinate
description: Analyze a goal, create or refine Agile epics and backlog items, and coordinate staged agento delivery or resumption from checkpoints. Use for goal-level planning and orchestration in this project; assigned implementation workers follow their backlog item instead.
---

# Agento coordinator

Turn a short goal into an evidence-backed epic and actionable backlog, then coordinate only the delivery the user requested. Support planning-only requests and resumption. Keep the first implementation small and use accepted agento releases to organize later milestones.

## Load the right context

1. Locate the project root from the working directory; read its `AGENTS.md`, `docs/decisions.md`, and `docs/agile-workflow.md`.
2. Read `epics/README.md`. If the goal belongs to an existing epic, read its `epic.md`, `checkpoints/current.md`, relevant backlog items, and dependency reports. Preserve IDs, progress, and user changes.
3. Read `docs/roadmap.md` for release capability boundaries. Do not implement later automation merely because the workflow mentions it.

Paths above are relative to the target project root, not the skill directory. If used in a checkout lacking these files, explain the missing project context rather than inventing it. Focused edits, direct worker assignments, and simple factual questions do not require this coordinator loop.

## Analyze and refine

- Identify the problem, beneficiary, verifiable outcome, exclusions, constraints, unknowns, and existing build/test/CI behavior. Inspect available repository facts before asking the user.
- Match the goal to an existing epic or create `epics/<project>/<NNN>-<slug>/`. For a new epic use [the epic template](assets/epic.md); create only the files needed for its current scope.
- Divide work into small usable stories and necessary enabler/review tasks. Use bounded spikes for uncertainty; optional features group related work. A checklist inside an item is usually enough for its implementation tasks.
- For new backlog items use [the backlog template](assets/backlog-item.md). Record kind, beneficiary/value or spike question, scope, dependencies, ownership, testable acceptance criteria, evidence, and report/checkpoint paths. Prefer concrete Given/When/Then examples when they clarify behavior.
- Order the backlog by value and dependencies, explain resource/file conflicts, and enforce the current WIP limit. Record the Definition of Ready and Definition of Done from the project workflow; add item-specific criteria where needed.
- Ask only when missing information materially changes outcome/scope or blocks execution. Make routine choices, record why, and continue independent work. Do not recreate already documented answers.

## Choose the requested mode

- **Plan/analyze:** produce the analysis, epic/backlog, acceptance criteria, and a concise reviewable proposal. Do not launch implementation.
- **Build/deliver:** do the analysis/refinement first, then advance Ready items within the requested epic and authority. Do not repeatedly request permission for routine steps already authorized by the delivery request.
- **Resume/continue:** reconcile checkpoint, actual files/revisions, outstanding reviews, and in-flight work. Resume the earliest actionable item; do not restart completed work or create a new epic without cause. Honor an existing stopping boundary, such as "A only."

Before dispatch, verify the item's Ready criteria. A general goal does not authorize unrelated scope, a different model/provider, or external publication/deployment. Follow project policy for those actions; prepare a concrete result before seeking any necessary final authorization.

Treat a request to build, fix, or implement as delivery even when phrased "I want...". Keep an explicitly planning-only or exploratory request in analysis/refinement. If the mode is materially unclear, make useful progress on the analysis and clarify before dependent delivery.

## Coordinate delivery

The coordinator owns `epic.md` and `checkpoints/current.md`. Workers own `checkpoints/<ID>.md`, `reports/<ID>.md`, and their assigned implementation scope. Stay in the coordinator role; route product changes through scoped worker assignments.

Provider/model choices come from current project instructions, not this skill's metadata. When cross-provider work is authorized and T3 tools are available, read [delegation mechanics](references/delegation.md). Otherwise prepare one complete manual worker assignment; clearly state why automatic delegation is unavailable. Do not silently substitute another model or provider.

Give a worker its role, exact backlog path, read-first paths, dependency reports, boundaries, acceptance/evidence requirements, and output paths. Do not assume it inherits this chat. Workers stop after their item. Keep one seed implementation worker at a time.

Inspect the actual changes and check relevant evidence before moving In Review to Done. Run independent checks where the item's gate requires them. A worker report is a claim, not automatic acceptance. Preserve blockers and failed gates; return actionable findings as scoped fixes. Request fresh reviews at the declared milestone.

## Close or checkpoint

Update epic/backlog status, decisions, shared checkpoint, and next action at meaningful boundaries. Record revision, controller version if one exists, in-flight commands/logs, completed evidence, blockers, and exact resume point. Plans and runtime state must not become two competing authorities.

At epic completion, reconcile every outcome with evidence, write the final report and retrospective, and identify follow-up backlog items and release blockers. Describe local readiness separately from remote CI and publication. Improve skills/defaults through reviewable changes based on observations; do not silently relax acceptance.

Keep user-facing updates short: outcome, current item, evidence/blocker, next action. The user should be able to start with a goal and later say "continue" without reconstructing a long prompt.
