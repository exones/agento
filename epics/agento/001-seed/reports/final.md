# AGENTO-001 draft final report

Status: draft. Date: 2026-11-03. This is not an epic closure. R has not reviewed the candidate, hosted CI for the package commit was not observed, and no package has been published.

Backlog item: `epics/agento/001-seed/backlog/D-package.md` for the package evidence. Epic outcomes below use the merged bootstrap PR #1 plus the local D proof.

## Outcomes

1. A fresh agent can resume from the epic, checkpoints, and reports. D's worker checkpoint is `checkpoints/D.md`. The coordinator still owns `checkpoints/current.md`.
2. One npm package builds an `agento` executable. Version `0.1.0` stays `private: true`. Local Windows installation from the packed tarball works outside the checkout. The package is not on the registry.
3. The schema 1 ledger commands are in the merged CLI and were exercised again through the installed executable on Windows. Completion remains a manual record.
4. `scripts/Verify.ps1` is the local and Actions gate. On this Windows machine it passed typecheck, build, 40 tests, and the packed-install proof. The workflow runs on `windows-latest` and `ubuntu-latest` and now uploads the tarball. That upload has not been observed for this commit.
5. The packed artifact can be installed outside the source checkout. The dirty-probe SHA-256 was `e40abb72422dacfc27a5f2d7a1f46dfda200640bc4f11c2640e936b4f809f3fb` at parent revision `149545c681021794721fc1ac2cf3950d88a73f88`. The clean candidate is a later pack of this commit, recorded outside this file so the revision does not move. See `reports/D.md`.
6. This draft separates local Windows proof, unobserved hosted CI, and the unpublished release. `docs/npm-distribution.md` lists the user actions.
7. The coordinator skill remains the stage 0 controller. This draft does not add a new live delegation result.

## Unmet gates

- Hosted Windows and Linux CI on the D commit.
- Review R, and any fix that review requires.
- Human merge of the D pull request.
- npm account, package name, trusted publisher, and an authorized publish. Unscoped `agento` was already version `0.1.2` of a different public package on 2026-11-03.
- A GitHub Release or remote tag, if one is later authorized. The release workflow does not create either.
- `retro.md` stays unstarted until review and fix triage.
- Stage 2 is not started. The README install example uses disposable `DEMO-002` data and is not a stage 2 ledger.

## Release identity

| Field | Value |
| --- | --- |
| Package | `agento` `0.1.0`, `private: true` |
| Local tarball | `artifacts/package/agento-0.1.0.tgz` (gitignored) |
| Dirty-probe SHA-256 | `e40abb72422dacfc27a5f2d7a1f46dfda200640bc4f11c2640e936b4f809f3fb` |
| Dirty-probe source revision | `149545c681021794721fc1ac2cf3950d88a73f88` |
| Registry | not published |
| Fallback | keep the tarball and `agento-0.1.0.provenance.json` together |

Cross-OS byte equality is not claimed. Node `v26.13.0`, npm `11.20.0`, and PowerShell `7.6.9` were the Windows measurement tools.
