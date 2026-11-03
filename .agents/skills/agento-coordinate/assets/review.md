# <item-stem-or-epic-ID>-review-<NNN>: <review scope>

Parent: <existing item or epic ID>. Pass: <NNN>. Reviewer: <role/session>.
Agent/assignment name: <same review name as heading; e.g. A-preflight-review-001>.
Report: reports/reviews/<parent>/<review-name>.md.
Checkpoint: checkpoints/reviews/<parent>/<review-name>.md (if needed).
Candidate: <exact commit>. PR/artifact: <URL and identity when applicable>.
Status: requested | in-progress | findings | no-findings. Date: <date>.
Legacy alias: <only if needed to preserve an existing reference>.

## Scope and evidence
<Acceptance criteria/outcomes examined, sources read, checks actually run, and coverage limits.>

## Findings
<Stable finding labels such as F1. For each: severity, file/line, concrete failure scenario, expected behavior, and evidence. If none, say no actionable findings.>

## Acceptance assessment
<For each relevant criterion/outcome: proven, unproven, or contradicted, with evidence.>

## Triage and gate
<Coordinator records fixed/refuted/deferred findings with exact fix/check revisions; do not present a review as a GitHub approval or an automatic merge decision. A new independent recheck gets the next parent-scoped pass.>

## Resume
<Next concrete action, remaining limits, report/checkpoint paths, and shared-status proposal.>
