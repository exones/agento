# agento 001 current checkpoint

Updated: 2026-11-03. Coordinator-owned resume point.

## Task and checkout

D is technically validated and In Review in [PR #2](https://github.com/exones/agento/pull/2). Review fixes, independent pass 02, product-head Windows/Ubuntu CI/uploads, and bounded skill proof pass. Evidence head `78a904b7be76256d8fae02fb0677f53333ab1666` passed Windows/Ubuntu CI and was handed back with its watch stopped. The user's subsequent review-naming refinement is the current documentation-only delivery; its new head needs normal hosted CI. Human merge remains. A/B/C/N are Done. No release, persistent controller promotion, or stage 2 start.

Checkout: `C:\code\agento`, branch `feat/package-bootstrap`, origin `https://github.com/exones/agento.git`. Reviewed/product-verified head: `2cf2bf25957869dc94fec0718a6dbc67e905f8d7`; base main merge `afc05074a27da2cb1a3c225bc9d42d10f184e504`. This evidence-only successor adds reports/checkpoints/validation artifacts without altering runtime, tests, package inputs, verification scripts, or workflows. Resolve latest HEAD with Git/GitHub and preserve user changes/index.

## Completed and evidence

- User refinement: future review agents/assignments use the item's filename stem plus `-review-NNN`, e.g. `A-preflight-review-001`. Delegation titles, report headings, and new evidence basenames match; numbering advances per parent including legacy passes. The next epic pass would be `AGENTO-001-review-003`. Root guidance, D19, workflow, skill/templates/delegation reference, handoff, report guidance, and the epic agree. Existing evidence/links/finding labels are unchanged. See [naming update](../reports/review-naming.md). Starting HEAD `78a904b`, clean worktree/index before edits. No agents launched or commands left running.
- Original D proof: exact retained private tarball installed outside checkout; SHA-256 `e40abb72422dacfc27a5f2d7a1f46dfda200640bc4f11c2640e936b4f809f3fb`. Original tarball/provenance/npm metadata retained under `artifacts/baselines/10ff9112/`. See `reports/D-review.md`.
- Ubuntu CI on `848d4d5` passed 40 product tests and tarball install, then failed the Windows-wrapper assertion on the valid POSIX bin symlink. Evidence preserved in the D review and parent-scoped review pass 01.
- Fixes: platform-appropriate installed-bin validation; manifest-driven name/version/privacy, pack/install paths, version checks, and provenance. Current package manifest is unchanged, private true. No checks were skipped or failure guarantees relaxed.
- Normal Windows Verify after fixes: typecheck/build, 40 tests, and installed-package proof passed as a dirty pre-commit probe. A temporary scoped public-mode version-change fixture passed the 8 CLI tests and full package proof; manifest restored byte-for-byte. Fixture logs/artifacts are gitignored under `artifacts/fixtures/scoped-identity/` and are not a release identity.
- User requirements D19/D20 are persistent in root guidance, skill/templates, workflow, and report guidance: routine reviews belong to their parent/pass, and completed-item reports/briefings include release-note detail. R output is filed at `reports/reviews/AGENTO-001/01.md` and `checkpoints/reviews/AGENTO-001/01.md`; legacy files/assignment remain pointers/references. No work item was renumbered.

## Review and validation assignments

Review pass 01's R1/R2 findings are resolved by fix `f61772a` and [independent pass 02](../reports/reviews/AGENTO-001/02.md), no actionable findings on exact `2cf2bf2`. Request `7f38eb5c-5da4-4dc2-8820-3f01876a80c8`, Sol High, isolated worktree `C:\worktrees\agento\t3-1178f78c`. Both exact outputs were copied with matching bytes. Scope includes code corrections and the user's workflow/reporting changes. Its Windows probes do not claim hosted Linux execution; the coordinator-observed CI below supplies that separate evidence. No formal GitHub approval is implied.

The bounded fresh short-goal planning exercise completed: request `036b0cba-6228-4ca3-9b53-fc12ec403eba`, inherited Sol High, worktree `C:\worktrees\agento\t3-64fa5948`, exact HEAD `2cf2bf2`. Coordinator inspected all four files, original task, and preservation status, and retained them under `validation/ledger-backup-plan/` as unapproved proof artifacts. `reports/skill-proof.md` records acceptance and limits: discovery/read via AGENTS and durable short-goal planning are demonstrated; invisible UI matching, all hosts/branches, actual backup correctness, or product orchestration are not. No production DOC1 work was adopted.

All implementation/review/validation delegates completed; no local command or delegate is in flight. [Candidate report](../reports/final.md) and [retrospective](../retro.md) reconcile outcomes, changes, fixes, artifacts, limits, and authority. PR #2 stays linked. Its previous watch stopped after successful `78a904b` CI; after pushing the naming update, resume the host watch for current-head CI without polling.

## Checks and limits

Skill structure, active links, and formatting pass; recheck this evidence batch before commit. Independent clean package confirmation passed at `2cf2bf2`, candidate true/dirty false, full digest in candidate report, lock timeout 5427 ms. [PR CI run 41674990291](https://github.com/exones/agento/actions/runs/41674990291) succeeds on exact `2cf2bf2`; Windows/Ubuntu verification/uploads pass and both artifacts exist, non-expired. Skill proof and independent recheck are accepted within their recorded limits. The evidence-only successor still requires current-head CI and human merge. No general reproducibility, crash, publication, or controller-promotion claim.

## Changed files

Current naming update changes AGENTS, decisions, Agile workflow, handoff, report format, coordinator skill, its three templates/delegation reference, epic, this checkpoint, and `reports/review-naming.md`. Skill structural validation, all 50 local Markdown links across the 13 changed files, and whitespace checks pass. No source/tests/scripts/README/package/workflow change after reviewed `2cf2bf2`. Preserve reviewer outputs exactly. No product tests or fresh reviewer are needed solely for this naming refinement; hosted CI runs normally on the new head.

## Next concrete action

Validate and commit/push the review-naming documentation update; immediately relink PR #2, then watch its new head. On CI wake-up inspect exact latest head/checks and confirm product/test/script/workflow/package content still matches `2cf2bf2`. If green, stop the PR watch and hand back for the human merge decision. Do not create another evidence commit merely to copy this commit's own CI; GitHub owns current-head checks. Keep D In Review and epic In Progress until human merge is recorded. No further product fix or reviewer round is indicated. No automatic merge/publication. After merge, reconcile status and decide separately how to promote/install an accepted fixed artifact; stage 2 requires its own authorized refined epic/backlog and pinned-controller setup.

## User inputs

No input blocks fixing/reviewing the candidate. Before publication, user chooses npm account/org and an available package name/scope; unscoped `agento` is occupied. Preserve private true and do not dispatch release or request raw secrets without an authorized release task. Local tools: Node v26.13.0/npm11.20.0/pwsh7.6.9.
