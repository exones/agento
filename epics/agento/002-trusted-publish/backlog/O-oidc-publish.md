# O: one automatic publish from GitHub Actions

Kind: story. Epic: [AGENTO-002](../epic.md). Feature: public npm release.
Status: backlog. Owner: the user authorizes the release and creates the trusted publisher; one worker prepares the reviewed change. Depends on: F, unless F recorded that a trusted publisher can be created before the package exists.

## Read first

`AGENTS.md`, D19, `docs/npm-distribution.md`, this epic and its checkpoint, the W, I, and F reports, and the current [trusted publishers](https://docs.npmjs.com/trusted-publishers/) page.

## Value or research question

A maintainer can publish the next authorized public version from GitHub-hosted Actions with OIDC and without a stored npm token.

## Scope and non-goals

This story is the publication authorization. It starts only when the assignment names the version and tells the worker to publish that version.

The user adds one trusted publisher: GitHub owner `exones`, repository `agento`, workflow filename `release.yml`, environment blank, direct `npm publish` allowed. Configurations created after 2026-09-03 do not grant direct publish unless it is selected. Create that publisher only when the reviewed commit is ready to dispatch, because an unused publisher expires after two days.

The worker's reviewed change sets the package name from I, sets `private` to false, and bumps to the version F did not already publish (`0.1.0` when F was skipped, otherwise the next patch). The user sets repository variable `AGENTO_RELEASE` to `enabled`. Dispatch `release.yml` on that commit with `confirm` equal to `publish`.

After the run publishes, the user sets publishing access to require 2FA and disallow tokens. Remove nothing from the OIDC publisher when doing that; the disallow-tokens setting does not apply to OIDC.

Do not add a token. Do not use a self-hosted runner. Do not set a GitHub environment on only one of the publisher and the job. Do not call `npm stage publish`. Do not manage dist-tags in this story.

## Acceptance criteria

1. Given the dispatch of the reviewed head, when the publish step runs, then the log shows `npm publish` of one tarball, no `NPM_TOKEN` or `NODE_AUTH_TOKEN`, and a successful registry response for the authorized version.
2. Given that version, when `npm view <name>@<version>` is run afterward, then the version is public and the report links the Actions run and the npm page.
3. Given a public repository and public package, when the published version is inspected, then registry provenance is present, or the report quotes the npm reason it is absent. The local pack provenance JSON is not treated as that attestation.
4. Given the two-day limit, when the first OIDC publish does not succeed in time, then the report says the publisher expired. The retry creates a new publisher. The workflow is not weakened to a token to beat the clock.
5. The user-visible publishing-access change to disallow tokens is recorded, or the report leaves it as an open user action with the exact screen path.

## Implementation or research tasks

- [ ] Confirm F's version and the publisher fields against the current docs.
- [ ] Open the PR that sets the name, `private: false`, and the version. Wait for review and required CI before dispatch.
- [ ] Ask the user to create the publisher and `AGENTO_RELEASE=enabled` immediately before dispatch.
- [ ] Dispatch once on the reviewed head. Record the run, `npm view`, and provenance.
- [ ] Ask the user to disallow token publishing. Write `reports/O.md` and `reports/final.md`. Stop.

## Ownership and verification

The user owns the npm session, the publisher click or `npm trust` 2FA prompt, the repository variable, and the final token-disallow setting. The worker owns the release commit, the dispatch of the already authorized workflow, and the O report. Evidence is the Actions URL and the registry response for that exact version. A skipped publish while `private` was true is not acceptance for this story. Another reviewer examines the commit that turns publication on before the dispatch.

## Delivery record

Empty until assigned. Not authorized on 2026-11-03.

## Report and resume

Write `checkpoints/O.md`, `reports/O.md`, and `reports/final.md`. Propose epic closure in the report. Stop after this item.
