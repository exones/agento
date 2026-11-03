# I: record the npm owner and package name

Kind: task. Epic: [AGENTO-002](../epic.md). Feature: public npm release.
Status: blocked. Owner: user for the name; one worker after that name exists. Depends on: the user choosing the npm account or organization and the package name.

## Read first

`AGENTS.md`, D06, D19, `docs/npm-distribution.md`, `docs/cli-name.md`, this epic and its checkpoint, and [public scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/).

## Value or research question

The maintainer has one recorded public package name that this repository is allowed to publish later, and the CLI executable remains `agento`.

## Scope and non-goals

Blocked until the user supplies the npm owner and the intended package name. The worker then checks that name with `npm view` and, when it is free, sets `package.json` `name` while leaving `private: true`. The `bin` entry stays `agento`.

Do not infer an npm scope from the GitHub account `exones`. Do not publish. Do not set `private` to false. Do not select a paid private package unless the user has accepted that cost in the assignment. The unscoped name `agento` is not available: on 2026-11-03 `npm view agento` returned version `0.1.2` of a different package. Recheck at execution time anyway.

## Acceptance criteria

1. Given no user-supplied name, when a worker starts, then it stops and reports the missing owner and package name. It does not invent one.
2. Given a supplied name, when `npm view` shows another package, then the report names that collision and does not change `package.json`.
3. Given a free name, when the task finishes, then `package.json` uses that name, `private` is still true, `bin.agento` is unchanged, and no registry write occurred.
4. The report quotes the `npm view` result and the commit that changed the name, when a change was made.

## Implementation or research tasks

- [ ] Wait for the user-supplied owner and package name.
- [ ] Run `npm view` for that exact name and record the response.
- [ ] Update `package.json` `name` only when the name is free. Leave `private: true`.
- [ ] Write `checkpoints/I.md` and `reports/I.md`. Open one PR. Stop.

## Ownership and verification

Own `package.json` only for the `name` field, plus the I checkpoint and report. Meaningful check: `npm view` and the diff showing `private` still true. Hosted CI must pass. Another reviewer examines the name change.

## Delivery record

Empty until assigned. Blocker: npm owner and package name from the user. That choice does not block K.

## Report and resume

Write `checkpoints/I.md` and `reports/I.md`. Stop after this item.
