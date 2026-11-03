# AGENTO-002 current checkpoint

Updated: 2026-11-03. Coordinator-owned resume point for the trusted-publishing plan.

## Task and checkout

Active work: review the planning PR for epic AGENTO-002. No backlog item is assigned. K is Ready and stopped because the user asked for a plan only. W, F, and O are backlog. I is blocked on the npm owner and package name.

Checkout: `C:\worktrees\agento\docs-002-trusted-publish`. Branch: `docs/002-trusted-publish`. Base: `origin/main` `afc05074a27da2cb1a3c225bc9d42d10f184e504`. Resolve this branch's HEAD with Git after the plan commit. Do not edit `C:\code\agento` or `feat/package-bootstrap`.

Controller: bootstrap `agento-coordinate` skill and manual files. No released controller. `AGENTS.md` still names AGENTO-001 as the current implementation epic.

## Completed

- Recorded D19. Automatic public publication is GitHub Actions OIDC from `release.yml`. A bypass-2FA granular token is not a publish credential.
- Wrote the epic, backlog K/W/I/F/O, and this checkpoint. No workflow, package, or privacy change.
- On 2026-11-03, `npm view agento name version description --json` from this worktree returned a different package at version `0.1.2`.
- Observed [PR #2](https://github.com/exones/agento/pull/2) head `848d4d50e918ecd4586bad30a4ff67acd70efea5` with Ubuntu CI failing. That PR stays the seed packaging work.

## In flight

None. The plan commit and PR are recorded in `reports/plan.md` once created. No release dispatch is running.

## Checks and limits

Planning check: relative links in the new epic files resolve on disk. Hosted CI belongs to the plan PR and is not claimed here before it is observed. No publish, tag, or GitHub Release exists. `package.json` remains `private: true`.

## Changed files and evidence

Decision and roadmap pointers, `docs/npm-distribution.md` status pointer, `epics/README.md`, and `epics/agento/002-trusted-publish/`. Evidence: `reports/plan.md`.

## Next concrete action

Finish the plan commit, push this branch, and open the PR against `main`. Link it. After hosted CI is observed, record the result in `reports/plan.md`. Do not dispatch K until the user asks to implement the epic. Do not merge without human approval.

## Blockers and inputs

No user input is required to review the plan. Story I stays blocked until the user names the npm account or organization and the package name. That name is not GitHub `exones` and it is not unscoped `agento`. Stories F and O stay unauthorized. PR #2's Ubuntu failure blocks W only after someone chooses to finish D; it does not block this plan.
