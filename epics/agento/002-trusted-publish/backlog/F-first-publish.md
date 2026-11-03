# F: interactive first publish

Kind: task. Epic: [AGENTO-002](../epic.md). Feature: public npm release.
Status: backlog. Owner: the user publishes; a worker may prepare the tarball and record the result. Depends on: I, W, and an assignment that explicitly authorizes publication of a named version.

## Read first

`AGENTS.md`, D19, `docs/npm-distribution.md`, this epic and its checkpoint, the I and W reports, [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/), [npm trust](https://docs.npmjs.com/cli/v11/commands/npm-trust/), and [creating scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/).

## Value or research question

The chosen package exists on the public npm registry, so a trusted publisher can be attached. The worker does not publish it.

## Scope and non-goals

Recheck whether npm can bind a trusted publisher before the package exists. If it can, record that evidence, skip the publish, and hand O the first version `0.1.0`.

If it cannot, prepare a tarball of the authorized version whose package name is the name from I, whose `private` field does not block publish, and whose contents are the verified package. The user runs interactive `npm publish` with account 2FA. A scoped package is published with `--access public`. The git branch stays `private: true` until O.

Do not run `npm publish` or `npm trust` from the worker. Do not create a granular token, and do not ask for one in chat. Do not run `npm stage publish`: for a package that does not exist, staging publishes a public placeholder. Do not publish a dummy package. Do not use a bypass-2FA token.

Default version split while OIDC cannot create the package: the user publishes `0.1.0` here, and O publishes the next version. Publishing `0.1.0` twice is not possible.

## Acceptance criteria

1. Given current npm docs at execution time, when pending publishers or first-version OIDC exist, then the report cites that doc and does not ask the user to publish.
2. Given the package must already exist, when this task finishes, then the user has published the authorized version and the report cites `npm view <name> version` plus the tarball digest. The worker's shell history does not contain a successful `npm publish`.
3. Given the repository after this task, when `package.json` on the branch is read, then `private` is still true.
4. No npm token is present in git, the report, or the chat.

## Implementation or research tasks

- [ ] Recheck the first-publish limitation and record the doc revision or page used.
- [ ] Build the authorized tarball without flipping `private` on the branch.
- [ ] Give the user the exact nonsecret command and stop before the registry write.
- [ ] After the user confirms the publish, record `npm view` and the digest in `reports/F.md`.
- [ ] Stop. O must follow in the same two-day window once the user creates the publisher.

## Ownership and verification

The user owns the registry write and the 2FA prompt. The worker owns the tarball preparation, `checkpoints/F.md`, and `reports/F.md`. Verification of the publish is `npm view` after the user says it finished. Absence of a worker publish is part of the report. Do not mark Done from a local tarball alone.

## Delivery record

Empty until assigned. Not authorized on 2026-11-03.

## Report and resume

Write `checkpoints/F.md` and `reports/F.md`. Stop after this item. Resume O only in the same authorized window.
