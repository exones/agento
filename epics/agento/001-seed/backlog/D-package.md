# D: packed artifact and first bootstrap proof

Status: in-review. Depends on: C and N delivered in merged PR #1. Owner: one Grok 4.7 Extra High implementation worker through Cursor. Candidate PR #2, implementation head `10ff911294a72957fe7fc689757bb33d3c72b38d`; see `reports/D-review.md`. Local packed proof passed independently; hosted CI, R, and human merge remain delivery gates.
Kind: story. Epic: AGENTO-001. Feature: F2, installable bootstrap release.

As an operator, I want to install a fixed agento package outside its source checkout so it can track the next epic while its successor is being edited.

## Read first

`AGENTS.md`, decisions, seed contract, roadmap bootstrap rules, epic/checkpoint, `reports/B.md`, `reports/C.md`, `reports/N.md`, `reports/N-review.md`, `reports/bootstrap-delivery.md`, `reports/bootstrap-review.md`, and `reports/D-assignment.md`. Earlier worker reports record local-only historical proof; bootstrap delivery/review records subsequent corrections, final CI, and merge.

## Outcome

Prove the actual installable package can organize stage 2 from outside the source checkout. Prepare reproducible artifacts without publishing them in this assignment.

## Work

1. Set the candidate 0.1 version and package contents. Include compiled code and required runtime templates/assets; exclude run state, credentials, scratch files, and development-only material.
2. Add `scripts/Test-Package.ps1` or an equivalently named PowerShell script: run `npm pack`, install that exact tarball in a clean temporary consumer directory, and exercise the installed `agento` executable. Do not use source imports, a checkout-local build command, or `npm link` as installation proof.
3. Run the full ledger scenario, including a path with spaces and a new CLI process. Keep the installed controller separate from candidate build output.
4. Integrate the smoke check into verification and Windows/Linux CI without recursion. Upload the tarball, digest, and useful test evidence as artifacts; record revision and tool versions. Do not promise byte-for-byte reproducibility unless measured.
5. Prepare npm release workflow/instructions using `docs/npm-distribution.md`, with an explicit release trigger and the verified tarball. Surface the exact account/scope and trust-setup actions the user must perform. Keep versioned tarball assets as the bootstrap fallback. Do not publish, tag remotely, or create a release now. Forgejo is superseded and out of scope.
6. Document installing a pinned controller outside the checkout and using it to create a stage 2 ledger. Use disposable demonstration data; do not mark stage 2 as started or approved.
7. Reconcile the seed checklist and prepare `reports/final.md` with unmet gates visible. Leave the review gate pending R.

## Acceptance

- Installation from the exact packed file works without source-tree access for product behavior.
- Given the packed candidate and a clean consumer directory, when installed and invoked as `agento`, then it creates an epic ledger and tracks a story without importing files from the development checkout.
- Smoke check passes locally and is wired on Windows/Linux; cite remote results only if observed.
- Artifact includes version, source revision, and digest. Local candidate vs remotely released package is unambiguous.
- The next agent can install the candidate controller and track new work; no private service is required for this proof.

## Output and stop

Write `checkpoints/D.md`, `reports/D.md`, and draft `reports/final.md`; propose shared-status/checklist updates to the coordinator instead of editing `epic.md` or `checkpoints/current.md`. Work on assigned branch `feat/package-bootstrap` in the shared checkout. After meaningful local checks pass, create scoped Conventional Commits, push that branch, open a PR against `main`, and immediately link it through the host tool. Include the coordinator's committed handoff in the same D PR. Preserve user changes/index and propagate native failures. Do not rewrite existing commits or force-push.

Handoff to a separately assigned R reviewer. Do not start the reviewer or other agents; do not watch PR checks as a delegated child. Record actual current checks without polling and return the candidate PR/head to the coordinator, which owns CI watches/review. Do not publish, tag remotely, create a release, merge, deploy, or start stage 2. Keep the package private and surface the exact nonsecret npm owner/name/trust prerequisites without blocking independent local packaging proof.
