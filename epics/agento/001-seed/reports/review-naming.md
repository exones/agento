# Review agent naming update

Status: locally checked documentation update. Date: 2026-11-03.
Requested by: user. Checkout: `C:\code\agento`, branch `feat/package-bootstrap`.
Starting HEAD: `78a904b7be76256d8fae02fb0677f53333ab1666`. Delivery: existing [PR #2](https://github.com/exones/agento/pull/2).

## Changes introduced

Review agents and assignments now use the reviewed item's backlog filename stem followed by `-review-NNN`. For `backlog/A-preflight.md`, the first two reviews are `A-preflight-review-001` and `A-preflight-review-002`. Epic-wide reviews use the epic ID; the seed's next independent pass would be `AGENTO-001-review-003`, counting its two existing passes.

The delegation title, report heading, and new evidence basenames use the same name. New reports live at `reports/reviews/<parent>/<review-name>.md`, with optional checkpoints in the matching checkpoint directory. Numbering advances per parent across revisions/scopes. Reviews remain attached to their parent and do not create lettered backlog items.

Root guidance, D19, the Agile workflow, coordinator skill/templates/delegation reference, handoff guide, report guidance, and the epic's future-review instruction agree on this rule. Existing review records, paths, findings, and aliases remain unchanged. No reviewer was launched or renamed.

## Validation and limits

Skill structural validation passed (`Skill is valid!`), all 50 local Markdown links across the 13 changed files resolved, and `git diff --check` passed. Product tests are not rerun solely for naming instructions; normal hosted CI applies after push. No runtime/package/workflow changes, new product capability, independent review, merge, publication, or stage 2 start is claimed.

## Next action

Deliver with the existing PR and use the new names for the next requested review. Human merge authority and the seed's In Review status are unchanged.
