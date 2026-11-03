# R: fresh-context seed review

Status: backlog. Depends on: D candidate and evidence available.
Kind: review task. Epic: AGENTO-001. Feature: F2, installable bootstrap release.
Role: reviewer. Product files read-only; write review report/checkpoint metadata only.

## Read first

`AGENTS.md`, decisions, seed contract, epic/checkpoint, task reports A-D, and the candidate changes. Start with acceptance outcomes; use chat only as optional context.

## Review

- CLI contract and honest distinction between manual completion and verified acceptance.
- State validation, safe paths, serialized updates, replacement behavior, consistency claims, and failure handling.
- Native command errors, Windows/Linux paths, and PowerShell exit propagation.
- Packed installation independent of source files; correct executable/assets and version.
- CI uses the declared gate and does not require privileged private access for PRs.
- Reports distinguish local checks, remote CI, release, and unverified infrastructure.

Run meaningful existing checks in disposable folders if helpful. Do not change product code, gates, infrastructure, or publication state. Avoid style-only findings.

## Output

Write `reports/R.md`: findings ordered by impact, with file/line, concrete failure scenario, expected behavior, and evidence. For each acceptance outcome state proven, unproven, or contradicted. If no findings, say so and identify coverage limits.

Update task R's row and current checkpoint with the next required fix or closure action. Do not fix findings or launch agents. An implementation assignment triages each finding as fixed, refuted with evidence, or explicitly deferred. Review completion alone does not close the seed.
