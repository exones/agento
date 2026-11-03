# W: dormant release workflow matches trusted publishing

Kind: task. Epic: [AGENTO-002](../epic.md). Feature: public npm release.
Status: backlog. Owner: one Grok 4.7 Extra High worker when assigned. Depends on: AGENTO-001 D merged to `main`, or a recorded decision that D will not provide `release.yml`.

## Read first

`AGENTS.md`, D19, `docs/npm-distribution.md`, `docs/roadmap.md`, this epic and its checkpoint, [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/), and the merged `.github/workflows/ci.yml`. If `release.yml` is already on `main`, read that file and the merged packaging report before editing it.

## Value or research question

Maintainers can review a release workflow that is capable of OIDC `npm publish` and that still does not publish from the current private package.

## Scope and non-goals

Create or reconcile `.github/workflows/release.yml` so the contract in the epic holds. Keep `package.json` `private: true`. Do not create `AGENTO_RELEASE`, dispatch the workflow, publish, tag, or add a GitHub Release. Do not give `ci.yml` `id-token: write`. Do not add `NPM_TOKEN`, `NODE_AUTH_TOKEN`, or `registry-url` fed by a secret. Do not call `npm stage publish`. Do not downgrade Node.js 26 to 24. Do not change `repository.url` unless a current npm error or doc quote in the report shows the existing `git+https://github.com/exones/agento.git` value is rejected.

If `main` has no release workflow because D did not merge, add the workflow and the operator notes in `docs/npm-distribution.md`. If D already added them, edit only the gaps.

## Acceptance criteria

1. Given `main` after this change, when a reader opens `.github/workflows/release.yml`, then the filename is exactly `release.yml`, `npm publish` is in that file, and the job is not reached through `workflow_call`.
2. Given a `workflow_dispatch` whose `confirm` input is not `publish`, when the workflow is evaluated, then the publish job does not run.
3. Given `private: true` or `AGENTO_RELEASE` other than `enabled`, when the job runs, then `npm publish` is not executed. This planning branch does not need a live dispatch to prove the skip: the condition must be visible in the workflow and covered by the report. Do not dispatch the workflow as a test.
4. Given the publish step, when it is read, then it publishes one verified tarball with `npm publish --ignore-scripts`, adds `--access public` only for a scoped name, requires npm 11.5.1 or newer, and uses GitHub-hosted `ubuntu-latest` with Node.js 26.
5. Given the release job, when permissions and setup are read, then `id-token: write` is set, no npm token is read, and the setup-node package-manager cache is off.
6. Given pull-request CI, when `ci.yml` is read, then it still has no `id-token: write` and still does not publish.
7. Hosted CI on the PR head passes. The report separates that CI from a publish.

## Implementation or research tasks

- [ ] Re-read the trusted-publisher page and the workflow actually on `main`.
- [ ] Apply only the missing contract items, including `package-manager-cache: false` on the release job.
- [ ] Keep the local pack provenance file, when D added one, distinct from npm's registry provenance. Do not disable registry provenance.
- [ ] Update `docs/npm-distribution.md` so the operator steps match the merged workflow: blank GitHub environment, direct `npm publish` allowed on the publisher, two-day expiry, and no bypass-2FA token.
- [ ] Write `checkpoints/W.md` and `reports/W.md`. Open one PR. Stop.

## Ownership and verification

Own `release.yml`, the distribution notes required to match it, and the W checkpoint and report. Propose epic status in the report. Local gate is the repository verify script when the workflow change can affect it, plus a read-through of the skip conditions. Hosted Windows and Ubuntu CI must pass on the PR head. Another reviewer examines the diff.

## Delivery record

Empty until assigned.

## Report and resume

Write `checkpoints/W.md` and `reports/W.md`. Stop after this item. The next item is I only when the user has supplied the npm owner and package name; otherwise stop at the checkpoint.
