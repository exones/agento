# N: use agento for local storage naming

Kind: task. Epic: AGENTO-001. Feature: F1.
Status: in-review. Owner: one Grok 4.7 Extra High implementation worker. Depends on: C returns with a locally verifiable ledger candidate (satisfied; coordinator reran 38 tests successfully).

## Read first

`AGENTS.md`, `docs/decisions.md` (D18), `docs/cli-name.md`, `docs/seed-contract.md`, this epic and current checkpoint, `reports/C.md`, and `reports/N-planning.md`.

## Value

Operators should see the selected tool name consistently in commands and local storage. Remove the pre-release storage name before packaged installation becomes the bootstrap controller.

## Scope and non-goals

Rename active storage paths from `.crew/` to `.agento/` in runtime, help/errors, tests, Git ignores, README, seed contract, and current implementation instructions. Rename internal storage identifiers that still use the old tool name. Preserve historical reports/checkpoints and original MVP/inspiration material as evidence; do not rewrite recorded observations. This is a naming correction, with no state-schema, transition, locking, or durability changes. No publishing, merge, or automatic migration feature is included.

## Acceptance criteria

1. Given a fresh temporary root, the full seed ledger scenario persists state, events, temp files, and lock only under `.agento/`; no `.crew/` directory is created.
2. Help, errors, current storage contract, examples, and ignore rules agree on `.agento/`. Historical uses are clearly historical or describe this correction.
3. Existing failure, concurrency, path/link safety, and manual-evidence checks still pass with the renamed paths; do not weaken their expectations.
4. A pre-existing `.crew/` directory and its contents are left untouched. No alias, deletion, or silent migration is introduced. Document that this unreleased correction does not migrate old disposable ledgers.
5. `pwsh -NoProfile -File ./scripts/Verify.ps1` passes. Report local evidence separately from hosted CI/review/merge.

## Implementation tasks

- [x] After C returns, inspect its final diff and report; apply the bounded rename consistently.
- [x] Update active contract/docs and Git ignore rule; preserve user data and historical evidence.
- [x] Run the existing verification gate and check fresh-root storage and old-directory preservation in disposable roots.

## Ownership and verification

Worker owns affected product/test/docs files, `checkpoints/N.md`, and `reports/N.md`. Coordinator owns shared epic/current checkpoint. Preserve the existing index and user commits. Inspect remaining old-name references with `rg`; classify historical evidence explicitly. No concurrent implementation worker.

## Delivery record

[Bootstrap PR #1](https://github.com/exones/agento/pull/1), branch `feat/seed-manual-ledger`. Product/fix revision `af0b69fa4c6ea8d2216d133c6d46a99981a1cbd9` passes local typecheck/build/40 tests, independent review, and Windows/Ubuntu hosted CI ([run](https://github.com/exones/agento/actions/runs/41663657936)). See [delivery evidence](../reports/bootstrap-delivery.md) and [review triage](../reports/bootstrap-review.md). Subsequent evidence-only documentation changes require current-head CI. Human-approved merge remains pending; N stays In Review.

## Report and resume

Write `checkpoints/N.md` and `reports/N.md` with outcome, commands/results, revision, changed files, limitations, and proposed shared-status updates. Stop after N; do not start D.
