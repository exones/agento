# Epic AGENTO-002: automatic public npm publication

Owner: user. Coordinator: planned in this Cursor session after the prior planning turn failed. Preferred later coordination remains Sol High; implementation remains one Grok 4.7 Extra High worker. Status: analysis. No backlog item is dispatched.
Release target: first authorized public npm release, after AGENTO-001 packaging is on `main`. Controller/schema: bootstrap files; no released controller. This plan does not publish.

## Problem and beneficiary

Maintainers need `npm publish` from GitHub Actions to keep working after the cutoff in the [8 July 2026 npm changelog](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/). Around January 2027, a granular access token with bypass 2FA can no longer publish directly. Its remaining publish path is to stage a version that a person approves with 2FA. Trusted publishing (OIDC) still publishes automatically. The beneficiary is the maintainer of public `exones/agento` who wants that automatic path and no long-lived publish token.

## Outcomes and success measures

1. The release decision is D19: GitHub-hosted Actions, workflow filename `release.yml`, OIDC, direct `npm publish`, no `NPM_TOKEN` and no bypass-2FA publish token.
2. The workflow that can publish is reviewed on `main`, still refuses to publish while `package.json` is `private: true` or repository variable `AGENTO_RELEASE` is not exactly `enabled`, and keeps pull-request CI free of `id-token: write`.
3. The pinned Node.js toolchain's npm major, and any dependency lifecycle scripts, are recorded before anyone moves CI onto npm 12.
4. The npm owner and package name are chosen by the user. The unscoped name `agento` is not used for this repository.
5. Only after a later explicit authorization: the package exists, one trusted publisher is bound to `exones/agento` and `release.yml` with direct `npm publish` allowed, and one GitHub-hosted run publishes a verified tarball without a stored npm token. The registry URL, Actions run, and provenance result are recorded.

Merging this plan does not satisfy outcomes 2–5.

## Scope and non-goals

Included: this plan, the later workflow reconciliation, the npm 12 install-script spike, the identity check, and the authorized bootstrap/OIDC release stories.

Excluded from this planning change: editing `package.json`, adding or changing a workflow, setting `private` to false, creating `AGENTO_RELEASE`, dispatching a release, publishing, tagging, or creating a GitHub Release. Forgejo Actions and Forgejo's package registry are out of scope (D06). A paid private npm package is out of scope unless the user accepts that cost. Self-hosted runners are out of scope because [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) currently supports GitHub-hosted runners. Downgrading the seed runtime from Node.js 26 to the documentation example Node.js 24 is out of scope. `npm dist-tag` automation is out of scope for the first release.

This epic does not edit the seed checkout `C:\code\agento` or branch `feat/package-bootstrap`. [PR #2](https://github.com/exones/agento/pull/2) remains AGENTO-001 story D.

## Analysis

Checked 2026-11-03 from `main` at `afc05074a27da2cb1a3c225bc9d42d10f184e504`.

Repository facts:

- `package.json` name is unscoped `agento`, version `0.1.0`, `private: true`. `repository.url` is `git+https://github.com/exones/agento.git`. `engines.node` is `>=26.13.0 <27`. Direct dependencies are dev-only: `typescript` and `@types/node`.
- `main` has `.github/workflows/ci.yml` only. It runs `npm ci` and `npm run verify` on `windows-latest` and `ubuntu-latest` with Node.js 26. It does not publish.
- `npm view agento --json`, run from this worktree on 2026-11-03, returned name `agento`, version `0.1.2`, description "A sophisticated agentic framework for building AI agents with state machines and intent-based routing". That is a different package. This repository has not reserved a name.
- [PR #2](https://github.com/exones/agento/pull/2) (`feat/package-bootstrap`, head `848d4d50e918ecd4586bad30a4ff67acd70efea5` when checked) prepares a dormant `release.yml` and expands `docs/npm-distribution.md`. Its Ubuntu CI was failing at that check. This plan does not build on that unmerged tree. Story W reads whatever has reached `main`.

Trusted publishing, from the npm docs fetched the same day:

- Requires npm CLI 11.5.1 or later and Node.js 22.14.0 or later. The seed pin already satisfies the Node.js floor. Story W fails the job if npm is older than 11.5.1. It does not switch the project to Node.js 24.
- GitHub Actions setup is `permissions: id-token: write`, a GitHub-hosted runner, and `npm publish` with no token. npm uses the OIDC token when it is present. Provenance is generated for a public package from a public repository. This repository is public. Do not set `provenance` to false and do not pass `--provenance`.
- The publisher fields are the GitHub owner `exones`, repository `agento`, and workflow filename `release.yml` only. An optional environment name must match a GitHub environment on the job. This plan leaves the environment blank so the dispatch is the release trigger. `repository.url` must match the GitHub repository; keep the current value until a publish error or a current doc shows that it must change.
- Configurations created after 2026-09-03 allow `npm stage publish` by default. Direct `npm publish` has to be selected separately. This workflow uses direct publish. The website guide also says each package can have up to 10 publishers, while the `npm trust` command page says the registry supports one configuration per package. Recheck that contradiction before creating a second publisher. This epic needs one.
- A new publisher expires if it does not complete a successful publish within 2 days. npm does not check the saved fields until publish time.
- `npm trust` requires npm 11.15.0 or later, an existing package, account 2FA, and an authentication method other than a bypass-2FA granular token. [npm/cli#8544](https://github.com/npm/cli/issues/8544) still described no OIDC path for the first version; the docs still say the package must exist. Recheck at story F. If pending publishers exist by then, skip the interactive bootstrap and let story O publish the first version.
- The release example sets `package-manager-cache: false`. Story W uses that for the release job. Pull-request CI can keep its npm cache.
- OIDC does not install private dependencies. This package has none. Do not add a read token for publish.

Chosen release shape:

- Trigger: `workflow_dispatch` whose `confirm` input is `publish`, plus `private` not true, plus `AGENTO_RELEASE=enabled`. That is the reviewed trigger. It is not an npm 2FA prompt.
- Steady state: `npm publish --ignore-scripts` of the verified tarball. A scoped name adds `--access public`.
- Fallback, not the default: `npm stage publish` plus a human `npm stage approve` with 2FA, if a later decision gives up fully automatic publish.
- First package: the user interactively publishes the authorized tarball with 2FA. `npm stage publish` of a package that does not exist publishes a public placeholder; do not use it to reserve the name. Do not publish a dummy package.
- Interactive publish of `0.1.0` means the OIDC proof cannot reuse `0.1.0`. Story O publishes the next authorized version in the same two-day window, immediately after the publisher is created. If pending publishers make the interactive step unnecessary, story O publishes `0.1.0`.
- After that OIDC publish succeeds, the user sets the package's publishing access to require 2FA and disallow tokens.
- npm 12, generally available per the same changelog, turns dependency lifecycle scripts, git dependencies, and remote URL dependencies off unless allowed. That is story K. It is independent of the publish credential. The planning turn did not upgrade the toolchain.

File conflict: PR #2 also edits `docs/decisions.md`, `docs/npm-distribution.md`, `docs/roadmap.md`, and `README.md`. This plan touches the first three only to point at D19 and this epic. Resolve both sides at merge. Do not overwrite PR #2's packaging instructions.

## Features and prioritized backlog

Feature: public npm release. WIP limit is one implementation worker once the user asks to start. Nothing below is in progress.

| ID | Kind | Outcome | Depends on | Owner | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| K | spike | [npm 12 install defaults](backlog/K-install-scripts.md) | None | Grok 4.7 Extra High, when assigned | ready | Not started. Planning stop. |
| W | task | [Release workflow contract](backlog/W-release-workflow.md) | AGENTO-001 D on `main`, or an explicit decision that D will not land | Grok 4.7 Extra High, when assigned | backlog | Not started |
| I | task | [Package identity](backlog/I-package-identity.md) | User supplies npm owner and package name | User, then one worker | blocked | Unscoped `agento` observed taken |
| F | task | [Interactive first publish](backlog/F-first-publish.md) | I, W, and explicit publish authorization | User performs the publish | backlog | Not authorized |
| O | story | [OIDC publish proof](backlog/O-oidc-publish.md) | F in the same two-day window, unless pending publishers remove F | User authorizes; one worker prepares the change | backlog | Not authorized |

Order: K can start when implementation is requested and does not edit the seed packaging branch. W waits until `main` either contains D's release workflow or D is closed without it. I waits on the user. F and O wait on authorization and run as one sitting because a new trusted publisher expires in two days. F and O are the only items that put a version on the public registry. K and W must not.

`AGENTS.md` keeps AGENTO-001 as the current implementation epic. This epic becomes current only when a coordinator assigns K or a later item.

## Definition of Ready and Definition of Done

Use [the project workflow](../../../docs/agile-workflow.md). Item-specific gates are in the backlog files.

Ready for K is met. It stays unassigned until the user asks to implement this epic. W is not Ready while PR #2 is the unmerged owner of `release.yml`. I is not Ready until the user names the npm owner and package. F and O are not Ready until the user explicitly authorizes publication of a named version.

Done for K and W is a merged PR whose hosted CI passed and whose review was done by someone other than the author. Local notes are not Done. Done for F and O additionally records the registry version that was published. No item is Done because this plan merged.

## Decisions and open questions

- 2026-11-03, D19: OIDC from `release.yml` is the automatic publish path. Bypass-2FA tokens are not.
- 2026-11-03: unscoped `agento@0.1.2` belongs to another project. The replacement name is an open user decision and blocks I.
- 2026-11-03: the GitHub owner in the trusted publisher is `exones`. That string is not an npm username.
- Open, recheck at F: whether npm can attach a trusted publisher before the package exists. Current docs and `npm trust` say no.
- Open, recheck at O: publisher limit of 10 on the guide versus one on the `npm trust` page. This epic creates one publisher.
- Open, recheck at W or O: whether `git+https://github.com/exones/agento.git` satisfies the `repository.url` match. Do not change it in anticipation.

## Delivery evidence and release checklist

- [ ] Plan PR reviewed and merged. This file is the plan. Local link check is in [the planning report](reports/plan.md). Hosted CI is recorded there when observed.
- [ ] K answers the npm 12 question on the pinned toolchain.
- [ ] W lands the dormant release workflow on `main` under the contract above.
- [ ] I records the user-selected owner and package name. `private` remains true.
- [ ] F records an interactive first publish, or records that pending publishers made it unnecessary.
- [ ] O records one OIDC `npm publish` from `release.yml`, then token publishing is disallowed by the user.
- [ ] Final report and retro written after O, or earlier if the epic is stopped.

Publication proof is absent. `private: true` remains the repository state.
