# K: npm 12 install defaults on the pinned toolchain

Kind: spike. Epic: [AGENTO-002](../epic.md). Feature: public npm release.
Status: ready. Owner: one Grok 4.7 Extra High worker when a coordinator assigns it. Depends on: none.

## Read first

`AGENTS.md`, `docs/decisions.md` D19, `docs/npm-distribution.md`, `docs/roadmap.md`, this epic and `checkpoints/current.md`, and `scripts/Install-NodeToolchain.ps1`.

## Value or research question

Does the pinned Node.js 26 toolchain run npm 12's install-time defaults, and which dependency lifecycle scripts would need an allowlist before that toolchain moves to npm 12?

Limit: one implementation session. The required decision is whether current CI already enforces those defaults and whether any current dependency needs `npm approve-scripts` before a later toolchain change. The [8 July 2026 changelog](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/) says npm 12 defaults `allowScripts`, `--allow-git`, and `--allow-remote` to off.

## Scope and non-goals

Inspect the toolchain this repository already pins. Record `node --version`, `npm --version`, and lifecycle scripts reached by `npm ci` and by installing the packed tarball when that pack script exists on the branch. Write the decision in this epic's report.

Do not upgrade Node.js or npm. Do not add an allowlist unless the pinned npm already refuses a script the repository needs. Do not publish. Do not edit `feat/package-bootstrap` or `C:\code\agento`. If AGENTO-001 D has not merged, inspect `main` and say the packed-install half waits for D. Direct dependencies on this plan's base are dev-only `typescript` and `@types/node`.

## Acceptance criteria

1. Given the installer in `scripts/Install-NodeToolchain.ps1`, when the spike runs, then the report names the exact Node.js and npm versions that the gate uses.
2. Given those versions, when npm is below 12, then the report states that current CI does not apply the npm 12 defaults and names the later prep command `npm approve-scripts` without running a toolchain upgrade.
3. Given npm 12 or newer, when a required script is blocked, then the report lists the script and the smallest allowlist change that preserves the existing verify gate. A passing gate is not created by deleting the script's test.
4. The spike's PR contains the decision and does not contain an npm publish, a token, or `private: false`.

## Implementation or research tasks

- [ ] Install or reuse the pinned toolchain and record both versions.
- [ ] Inventory lifecycle scripts for the production and development installs available on this branch.
- [ ] Write `checkpoints/K.md` and `reports/K.md` with the decision, the command results, and the unchanged toolchain pin.
- [ ] Open one PR. Stop after this item.

## Ownership and verification

Own the K checkpoint, K report, and any small documentation note the decision requires. Do not own `epic.md` or `checkpoints/current.md`; propose those status updates in the report. Meaningful check: the version commands and the script inventory, plus the repository's normal PR CI. A docs-only result still needs that CI. Another reviewer examines the conclusion.

## Delivery record

Branch, PR, commit, head SHA, local commands, hosted CI, review, and merge are recorded by the worker and then confirmed by the coordinator. Empty until assigned.

## Report and resume

Write `checkpoints/K.md` and `reports/K.md`. In coordinated mode the coordinator owns shared status. Stop after this item.
