# agento 001 current checkpoint

Updated: 2026-11-03. Coordinator-owned resume point.

## Task and checkout

D is technically validated and In Review in [PR #2](https://github.com/exones/agento/pull/2). Review fixes, independent pass 02, product-head Windows/Ubuntu CI/uploads, and bounded skill proof pass. Final evidence-head CI and human merge remain. A/B/C/N are Done. No release, persistent controller promotion, or stage 2 start.

Checkout: `C:\code\agento`, branch `feat/package-bootstrap`, origin `https://github.com/exones/agento.git`. Reviewed/product-verified head: `2cf2bf25957869dc94fec0718a6dbc67e905f8d7`; base main merge `afc05074a27da2cb1a3c225bc9d42d10f184e504`. This evidence-only successor adds reports/checkpoints/validation artifacts without altering runtime, tests, package inputs, verification scripts, or workflows. Resolve latest HEAD with Git/GitHub and preserve user changes/index.

## Completed and evidence

- Original D proof: exact retained private tarball installed outside checkout; SHA-256 `e40abb72422dacfc27a5f2d7a1f46dfda200640bc4f11c2640e936b4f809f3fb`. Original tarball/provenance/npm metadata retained under `artifacts/baselines/10ff9112/`. See `reports/D-review.md`.
- Ubuntu CI on `848d4d5` passed 40 product tests and tarball install, then failed the Windows-wrapper assertion on the valid POSIX bin symlink. Evidence preserved in the D review and parent-scoped review pass 01.
- Fixes: platform-appropriate installed-bin validation; manifest-driven name/version/privacy, pack/install paths, version checks, and provenance. Current package manifest is unchanged, private true. No checks were skipped or failure guarantees relaxed.
- Normal Windows Verify after fixes: typecheck/build, 40 tests, and installed-package proof passed as a dirty pre-commit probe. A temporary scoped public-mode version-change fixture passed the 8 CLI tests and full package proof; manifest restored byte-for-byte. Fixture logs/artifacts are gitignored under `artifacts/fixtures/scoped-identity/` and are not a release identity.
- User requirements D19/D20 are persistent in root guidance, skill/templates, workflow, and report guidance: routine reviews belong to their parent/pass, and completed-item reports/briefings include release-note detail. R output is filed at `reports/reviews/AGENTO-001/01.md` and `checkpoints/reviews/AGENTO-001/01.md`; legacy files/assignment remain pointers/references. No work item was renumbered.

## Review and validation assignments

Review pass 01's R1/R2 findings are resolved by fix `f61772a` and [independent pass 02](../reports/reviews/AGENTO-001/02.md), no actionable findings on exact `2cf2bf2`. Request `7f38eb5c-5da4-4dc2-8820-3f01876a80c8`, Sol High, isolated worktree `C:\worktrees\agento\t3-1178f78c`. Both exact outputs were copied with matching bytes. Scope includes code corrections and the user's workflow/reporting changes. Its Windows probes do not claim hosted Linux execution; the coordinator-observed CI below supplies that separate evidence. No formal GitHub approval is implied.

The bounded fresh short-goal planning exercise completed: request `036b0cba-6228-4ca3-9b53-fc12ec403eba`, inherited Sol High, worktree `C:\worktrees\agento\t3-64fa5948`, exact HEAD `2cf2bf2`. Coordinator inspected all four files, original task, and preservation status, and retained them under `validation/ledger-backup-plan/` as unapproved proof artifacts. `reports/skill-proof.md` records acceptance and limits: discovery/read via AGENTS and durable short-goal planning are demonstrated; invisible UI matching, all hosts/branches, actual backup correctness, or product orchestration are not. No production DOC1 work was adopted.

All implementation/review/validation delegates completed; no local command or delegate is in flight. [Candidate report](../reports/final.md) and [retrospective](../retro.md) reconcile outcomes, changes, fixes, artifacts, limits, and authority. PR #2 stays linked/watched; after the evidence-only push use the existing watch for CI wake-up, without polling or registering another watcher.

## Checks and limits

Skill structure, active links, and formatting pass; recheck this evidence batch before commit. Independent clean package confirmation passed at `2cf2bf2`, candidate true/dirty false, full digest in candidate report, lock timeout 5427 ms. [PR CI run 41674990291](https://github.com/exones/agento/actions/runs/41674990291) succeeds on exact `2cf2bf2`; Windows/Ubuntu verification/uploads pass and both artifacts exist, non-expired. Skill proof and independent recheck are accepted within their recorded limits. The evidence-only successor still requires current-head CI and human merge. No general reproducibility, crash, publication, or controller-promotion claim.

## Changed files

This successor changes only roadmap/status/backlog/epic, candidate/retro/skill/review reports, reviewer checkpoints, and four explicitly unapproved validation-plan files. No source/tests/scripts/README/package/workflow change after reviewed `2cf2bf2`. Preserve reviewer outputs exactly. No redundant product gate is needed solely for report edits; hosted CI runs normally on the new head. One shell-based checkpoint rewrite was policy-blocked; the same owned-file update was completed through an explicit file patch.

## Next concrete action

Validate and commit/push this final evidence-only batch; immediately relink PR #2. On CI wake-up inspect exact latest head/checks and confirm product/test/script/workflow/package content still matches `2cf2bf2`. If green, stop the PR watch and hand back a substantive delivery briefing for the human merge decision. Do not create another evidence commit merely to copy this evidence commit's own CI; GitHub owns current-head checks. Keep D In Review and epic In Progress until human merge is recorded. No further product fix or reviewer round is indicated. No automatic merge/publication. After merge, reconcile status and decide separately how to promote/install an accepted fixed artifact; stage 2 requires its own authorized refined epic/backlog and pinned-controller setup.

## User inputs

No input blocks fixing/reviewing the candidate. Before publication, user chooses npm account/org and an available package name/scope; unscoped `agento` is occupied. Preserve private true and do not dispatch release or request raw secrets without an authorized release task. Local tools: Node v26.13.0/npm11.20.0/pwsh7.6.9.
