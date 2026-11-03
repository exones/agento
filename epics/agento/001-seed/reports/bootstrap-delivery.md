# Bootstrap delivery: A/B/C/N

Date: 2026-11-03. Status: [PR #1](https://github.com/exones/agento/pull/1) open; no merge or publication authorized.

## Delivery scope and history

Remote `main` is `dc6e3c47aefa974f48124edeae934e471aa99bbe`. The user already committed A/B together as `3283807afee076d2d4cf1ee24c44ba1df20576da` (`Spikes A, B implemented`), before the PR delivery rule was introduced. Preserve that commit unchanged. Group A/B's outstanding delivery with C's manual ledger, N's `.agento/` correction, and the related operating-document cleanup in one bootstrap PR. Splitting the existing bundled history would obscure the actual delivery boundary. Future stories/spikes use scoped PRs by default.

No worker is running. At this handoff the index is empty; all current modified/untracked paths were inspected and belong to bootstrap implementation/evidence or the user's agreed workflow changes. Create owned branch `feat/seed-manual-ledger`, based on the current user commit, without resetting or rewriting local `main`.

Created that branch and committed product changes as `6d901901e5b4eb17d9b8c1feffc0f9569e0e1bbf` (`feat(ledger): add manual tracking with agento storage`). The local gate above tested the exact product/test content in that commit; subsequent changes are operating/evidence documentation. Active documentation links, coordinator skill structure, and `git diff --check` passed before commit. User commit `3283807` remains unchanged in the branch history.

## Checks

- Initial PR head: `a5c08402ff92768f88a5dbc69c2fc5036a5cbe8e`, including documentation commit `docs(workflow): record bootstrap delivery and storage decision`. Branch pushed and PR linked in T3. First observed hosted jobs: Windows and Ubuntu In Progress; no pass claimed.
- Separate fresh reviewer assigned to that exact head, including coordinator-authored documentation. Review is supporting bootstrap delivery, not final R (D does not exist yet).
- C gate independently rerun before N: Node v26.13.0/npm 11.20.0, typecheck/build, 38 tests passed.
- N gate independently rerun after N: `pwsh -NoProfile -File ./scripts/Verify.ps1`, exit 0, same toolchain, 39 tests in 3 suites passed, no skips.
- `git diff --check` passes. Documentation links and coordinator skill validation are checked before commit.
- README progress cleanup changes documentation only after the N gate.
- Fresh candidate review and hosted Windows/Linux CI are pending; local evidence is not a platform approval or merge decision.

## Review corrections

Fresh review completed on initial head `a5c08402ff92768f88a5dbc69c2fc5036a5cbe8e`; two findings and corrections are recorded in [bootstrap-review.md](bootstrap-review.md). Initial Ubuntu CI failed on the Windows-only read-only destination assumption; preserved that failure evidence. The long-reason fix and corrected platform expectation pass a new local typecheck/build/40-test gate. Push corrections and request a bounded independent fix review; hosted CI must check the new head. No merge/publication performed.

## Next

Commit scoped implementation and workflow/evidence changes, push the owned feature branch, open/link the PR, record exact head, and request fresh review. Keep A/B/C/N In Review until applicable hosted CI, review, and human-approved merge. D/R remain backlog. No release, package upload, or stage 2 work is included.
