# Task planning: trusted npm publishing

Status: partly proven. Date: 2026-11-03.
Backlog item: epic plan, not an implementation item. Checkout/branch/HEAD: `C:\worktrees\agento\docs-002-trusted-publish`, branch `docs/002-trusted-publish`, plan head `ac4e2cf53208d72d8b50a3149e64d85930fb385f`, base `afc05074a27da2cb1a3c225bc9d42d10f184e504`. PR: https://github.com/exones/agento/pull/3.

## Outcome

Reviewable plan for AGENTO-002. Automatic public publish is GitHub-hosted OIDC from `release.yml`. npm 12 install-script policy is spike F and story S. No product code, workflow, CI policy, or `package.json` change is in this delivery. Implementation is not authorized. Status is analysis only: the plan exists, and F, S, O, and R were not executed. U stays blocked.

An earlier commit on this branch had edited `docs/decisions.md`, `docs/roadmap.md`, and `docs/npm-distribution.md`. Those three files are restored to `origin/main` so the planning diff does not keep those edits. Story O adds the decision-log line and the roadmap sentence after seed D merges.

## Evidence

| Check | Exact command or method | Result | Revision/log/CI/PR link |
| --- | --- | --- | --- |
| Changelog | Fetched on 2026-11-03; not refetched for this rewrite | npm 12 is GA. `allowScripts` defaults off. `--allow-git` and `--allow-remote` default to `none`. npm 11.16+ warns. Bypass-2FA management loss was expected in early August 2026. Direct `npm publish` loss was expected around January 2027. Wording is "we expect". | https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/ |
| Trusted publishers | Fetched on 2026-11-03; not refetched for this rewrite | GitHub-hosted Actions, GitLab.com shared runners, CircleCI cloud. Self-hosted runners unsupported. npm CLI >= 11.5.1, Node >= 22.14.0. Post-2026-09-03 configs default to `npm stage publish`. Unused config expires in two days. Provenance is automatic. | https://docs.npmjs.com/trusted-publishers/ |
| Forgejo OIDC | Recorded issue, not a new probe | Forgejo is not an npm OIDC provider. `ACTIONS_ID_TOKEN_REQUEST_URL` makes npm assume GitHub Actions and skip token fallback. D06 already excludes Forgejo registry deployment. | https://codeberg.org/forgejo/forgejo/issues/12311 |
| `origin/main` | `git rev-parse origin/main` and `git merge-base HEAD origin/main` | Both `afc05074a27da2cb1a3c225bc9d42d10f184e504` | This worktree, 2026-11-03 |
| Seed D | `git rev-parse 10ff911294a72957fe7fc689757bb33d3c72b38d`; `git merge-base --is-ancestor` against HEAD | Commit exists. Ancestor check exit 1. Not in this branch. | `10ff911294a72957fe7fc689757bb33d3c72b38d` on `feat/package-bootstrap` |
| `release.yml` | `Test-Path` here; `git cat-file -e` on main and on `10ff911` | Absent on this branch and on main (cat-file exit 128). Present on `10ff911` (cat-file exit 0). | D workflow shape recorded in the epic |
| Engines | `package.json` `engines.node` on this branch | `>=26.13.0 <27`. `private` is true. Not modified. | This worktree |
| Install scripts | No `npm approve-scripts` run | Lockfile text search on the D branch found no `hasInstallScript`, `postinstall`, or `preinstall`. That is not the inventory. | Deferred to F |
| npm account | No live account probe | Unscoped `agento` was a different package at 0.1.2 on 2026-11-03. No token requested. | Blocks U only |

## Decisions

- OIDC is the automatic path. Staged publish plus human 2FA is the documented fallback.
- Keep Node.js 26. Forgejo stays out.
- F chooses strict allow-scripts on npm 11.20 or one npm 12 check. The planning PR does not choose for F.
- Decision-log and roadmap edits wait for O, after D is on `main`.

## Open points

- User review of https://github.com/exones/agento/pull/3 at `ac4e2cf53208d72d8b50a3149e64d85930fb385f`. Hosted CI, review, and merge are open. `gh pr create` reported that this branch already had that PR, so the title and body were updated on it.
- Package identity blocks U and does not block plan review.
- F's enforcement choice is open until F runs.

## Resume

Stop. Implementation is not authorized. Do not start F until the user asks to execute and seed D is merged. The planning PR is https://github.com/exones/agento/pull/3.
