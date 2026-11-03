# agento 001 current checkpoint

Updated: 2026-11-03. Coordinator-owned resume point.

## Task and checkout

Active work: deliver bootstrap A/B/C/N through [PR #1](https://github.com/exones/agento/pull/1). Initial fresh review completed; two findings corrected locally and 40 tests pass. Push fixes, request bounded fix review, and watch final CI. All A/B/C/N rows remain In Review. D/R are not started. Controller: bootstrap `agento-coordinate` skill/manual files; no released controller.

Checkout: `C:\code\agento`. Owned branch `feat/seed-manual-ledger`, based on the user's preserved commit `3283807afee076d2d4cf1ee24c44ba1df20576da`. Product commit: `6d901901e5b4eb17d9b8c1feffc0f9569e0e1bbf`. Remote `main`: `dc6e3c47aefa974f48124edeae934e471aa99bbe`. Origin: `https://github.com/exones/agento.git`. Operating/evidence documentation commit follows; resolve current HEAD with Git. Local `main` was not reset or rewritten. Inspect Git status before further mutations.

## Completed

- A/B accepted locally; original reports and coordinator reviews retain their evidence/limits. User bundled them in commit `3283807` before requiring per-item PR delivery.
- C implements schema 1 manual ledger and full-suite discovery; coordinator independently reran typecheck/build/38 tests successfully. See `reports/C.md`.
- N uses `.agento/` consistently in storage, internal names, help/errors, tests, ignore rule, and current docs. Existing `.crew/` data is preserved without alias or migration. Coordinator independently reran typecheck/build/39 tests successfully. See `reports/N.md` and `reports/N-review.md`.
- README progress/backlog/session instructions removed; reusable handoff guide and coordinator skill retain general mechanics. Actual work stays in epic/checkpoints/reports.
- Added N between C and D; original B/C assignments carry supersession notes. No final review R or packed D candidate exists yet.

## In flight

No delegate or command is running. C delegation `caed9d02-7748-44b2-986f-d6fc9e12fa71`, N delegation `93edcb2b-7aab-4d58-ad1e-b45467cbbdc2`, and fresh native reviewer `/root/bootstrap_review` completed. Original review head: `a5c08402ff92768f88a5dbc69c2fc5036a5cbe8e`; the original review does not cover later fixes. Initial Ubuntu CI failure is preserved in `reports/bootstrap-review.md`. Bounded independent fix review will be assigned after pushing the corrections.

## Checks and limits

Latest local product gate after review fixes: `pwsh -NoProfile -File ./scripts/Verify.ps1`, exit 0, Node v26.13.0/npm 11.20.0, 3 suites/40 tests passed, no failures/skips. Initial hosted Ubuntu ran and failed the old read-only-destination expectation; final hosted CI remains pending. No kill/power-loss guarantee, packed-install proof, or publication result is claimed.

## Changed files and evidence

Product changes (`src/`, `test/`, test script/TypeScript config, README/storage contract/ignore) are committed as `6d90190`. Shared operating docs/skill/delivery reference and epic/backlog/checkpoint/reports form the next scoped commit. See `reports/bootstrap-delivery.md` for grouping rationale and `git status` for exact current paths. Preserve the user's original commit and any new index edits.

## Next concrete action

Commit/push the bounded generated-default fix, platform-correct test, and review/PR evidence; immediately relink PR #1. Request a fresh bounded review of those corrections at the exact pushed head and watch final hosted CI without polling. Once fixes are reviewed and CI passes, report the ready PR and retain human merge authority. Do not mark Done or merge without approval. Keep D backlog until naming/delivery reconciliation is complete.

## Blockers and inputs

No user-owned blocker to bootstrap PR delivery. GitHub is public and current account ADMIN. Node v26.13.0/npm 11.20.0 is installed under `.tools/node/node-v26.13.0-win-x64`; PowerShell 7.6.9. npm account/scope/trusted publishing are later release prerequisites; package remains `private: true`. No Forgejo deployment.
