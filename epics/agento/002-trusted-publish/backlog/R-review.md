# R: review the install policy and OIDC guard

Kind: review task. Epic: [AGENTO-002](../epic.md). Feature: public npm release. This R is AGENTO-002/R. AGENTO-001 has a separate review item, AGENTO-001/R.
Status: backlog. Owner: a reviewer other than the S and O author. Depends on: S and O.

## Read first

`AGENTS.md`, `docs/decisions.md`, this epic, `checkpoints/current.md`, `reports/F.md`, `reports/S.md`, `reports/O.md`, and the S and O diffs.

## Value or research question

Someone who did not author S or O checks that the install policy and the OIDC regression check match this epic, and that neither story publishes.

## Scope and non-goals

Examine the diff and the evidence after both candidates exist. Return findings as scoped fixes to the implementation worker. Do not publish, dispatch, or change `private`. Do not treat a local review note as a GitHub platform approval. Do not start a new feature.

## Acceptance criteria

1. Given the S and O candidates, when the reviewer finishes, then the report lists each finding or states that there are none, with the reviewed head SHA.
2. Given a finding, when it is returned, then it names the file and the expected correction. The reviewer does not implement the product change in the review role.
3. The review does not claim a GitHub approval and does not claim a package was published.

## Implementation or research tasks

- [ ] Read the S and O diffs and their reports.
- [ ] Write findings or an explicit none in `reports/R.md`.
- [ ] Hand scoped fixes back. Stop after this item.

## Ownership and verification

Own `checkpoints/R.md` and `reports/R.md`. The coordinator assigns fixes as a separate implementation pass. Meaningful check: the report identifies the reviewed SHAs and separates local review from hosted CI and from merge. Human merge remains the user's decision.

## Delivery record

Empty until assigned.

## Report and resume

Write `epics/agento/002-trusted-publish/checkpoints/R.md` and `epics/agento/002-trusted-publish/reports/R.md`. Stop after this item.
