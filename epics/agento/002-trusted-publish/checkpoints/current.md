# AGENTO-002 current checkpoint

Updated: 2026-11-03. Coordinator-owned resume point.

## Task and checkout

Active work: planning only. No backlog item is in progress. F, S, O, and R are backlog. U is blocked. None of them are Ready.

Checkout: `C:\worktrees\agento\docs-002-trusted-publish`. Branch: `docs/002-trusted-publish`. Base: `origin/main` `afc05074a27da2cb1a3c225bc9d42d10f184e504`. Controller: bootstrap `agento-coordinate` skill and manual files.

Seed D remains on `feat/package-bootstrap` in `C:\code\agento` at commit `10ff911294a72957fe7fc689757bb33d3c72b38d` and must not be edited from here. This branch does not contain that commit. `release.yml` is absent here.

## Completed

- Confirmed this checkout is `docs/002-trusted-publish`, merge-base `afc05074a27da2cb1a3c225bc9d42d10f184e504`, and `release.yml` is absent.
- Confirmed `release.yml` exists on seed D `10ff911294a72957fe7fc689757bb33d3c72b38d` and does not exist on `origin/main`.
- Wrote the AGENTO-002 plan: OIDC publish guard and the npm 12 install-script policy. No product, workflow, or package change.

## In flight

None. [PR #3](https://github.com/exones/agento/pull/3) is open. Plan head `ac4e2cf53208d72d8b50a3149e64d85930fb385f`. Hosted CI is not recorded yet.

## Checks and limits

Local check: relative links in the new epic files and the `epics/README.md` bullet. No `npm approve-scripts` run. No live npm account probe. No publish, dispatch, or `private` change. `package.json` engines remain `>=26.13.0 <27`.

## Changed files

- `epics/README.md`
- `epics/agento/002-trusted-publish/epic.md`
- `epics/agento/002-trusted-publish/backlog/F-publish-facts.md`
- `epics/agento/002-trusted-publish/backlog/S-install-scripts.md`
- `epics/agento/002-trusted-publish/backlog/O-oidc-guard.md`
- `epics/agento/002-trusted-publish/backlog/U-npm-account.md`
- `epics/agento/002-trusted-publish/backlog/R-review.md`
- `epics/agento/002-trusted-publish/checkpoints/current.md`
- `epics/agento/002-trusted-publish/reports/planning.md`

## Next concrete action

User reviews [PR #3](https://github.com/exones/agento/pull/3). Do not start F until the user asks to execute and seed D is merged. Do not merge without human approval.

## Blockers and inputs

None for accepting the plan. U remains blocked on the npm account and a package name other than unscoped `agento`. That does not block plan review.
