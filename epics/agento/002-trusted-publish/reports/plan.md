# Task plan: AGENTO-002 trusted publishing

Status: partly proven. Date: 2026-11-03.
Backlog item: epic plan, not a backlog implementation item. Checkout/branch/HEAD: `C:\worktrees\agento\docs-002-trusted-publish`, branch `docs/002-trusted-publish`, base `afc05074a27da2cb1a3c225bc9d42d10f184e504`. Plan HEAD and PR are filled after the commit and `gh pr create`.

## Outcome

The user asked to plan automatic public npm publication and not to implement it. Epic AGENTO-002 records D19: GitHub Actions trusted publishing from `release.yml`, with no long-lived bypass-2FA publish token. Backlog items K, W, I, F, and O are written. K is Ready and unassigned. No workflow file was added. `package.json` was not edited. Nothing was published.

The prior planning turn failed before writing files. This checkout was already the separate worktree on `docs/002-trusted-publish` at `main`.

## Evidence

| Check | Exact command or method | Result | Revision/log/CI/PR link |
| --- | --- | --- | --- |
| Branch base | `git rev-parse HEAD` and `git merge-base HEAD origin/main` before edits | Both `afc05074a27da2cb1a3c225bc9d42d10f184e504` | `origin/main` |
| Unscoped name | `npm view agento name version description --json` | Other package, version `0.1.2` | This worktree, 2026-11-03 |
| Packaging PR | `gh pr view 2 --json url,headRefOid,statusCheckRollup` | Open, head `848d4d50e918ecd4586bad30a4ff67acd70efea5`, Ubuntu verify failing | https://github.com/exones/agento/pull/2 |
| Trusted-publisher rules | Fetched npm trusted-publishers, npm trust, scoped-package, and the 2026-07-08 changelog | Contract recorded in `epic.md` | 2026-11-03 |
| Relative links | PowerShell check of relative markdown links under the new epic | Recorded after the files exist | Local |
| Hosted CI | Plan PR checks | Not observed yet | Pending PR |

## Decisions

- OIDC direct `npm publish` is the steady state. Staged publishing is the documented fallback, not the workflow.
- One interactive first publish remains in F while npm requires the package to exist before a trusted publisher. Recheck at execution.
- Node.js stays on the seed pin. npm 12 install defaults are spike K, not a toolchain upgrade.
- This PR may conflict with PR #2 in `docs/decisions.md`, `docs/npm-distribution.md`, and `docs/roadmap.md`. Keep both the packaging notes and the D19 pointer.

## Open points

- Plan PR URL, head SHA, hosted CI, review, and merge are open.
- npm owner and package name block I.
- Publication authorization blocks F and O.
- PR #2 is not part of this delivery.

## Resume

Push the plan branch, open the PR against `main`, and record its URL here. Do not assign K unless the user asks to implement the epic.
