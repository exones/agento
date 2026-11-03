# D1 candidate validation

Date: 2026-11-03. Coordinator-owned. Status: bounded fresh planning proof accepted; independent review pending.
Candidate: `da4792a485f45f54b0f0b912d3df62a2a484bdf0`, [PR #4](https://github.com/exones/agento/pull/4).

## Inspection and boundaries

Read the actual worker report/checkpoint and implementation diff. The workflow defines backlog naming centrally; the skill reads it before assigning IDs, and both planning templates link there. Existing IDs, review naming, and the separate epic are preserved. No product/package/script/workflow input changed. Worker local skill/link/formatting results remain distinct from hosted CI, independent review, and behavioral proof. Coordinator `git diff --check` passed on the returned clean candidate.

## Hosted CI

Verified PR #4 still points to exact `da4792a485f45f54b0f0b912d3df62a2a484bdf0`. [PR run 41695094058](https://github.com/exones/agento/actions/runs/41695094058) succeeded on Windows and Ubuntu; push run 41695084289 also passed. GitHub reports no merge conflict. This is hosted verification evidence, not independent review or planning-behavior acceptance. No code/instruction changes since the tested candidate; only coordinator status/evidence edits are pending locally.

## Fresh planning exercise

Requested goal: “Plan a small documentation improvement so a new contributor can find prerequisites, complete a first local run, and troubleshoot common setup failures. Check which existing commands are safe to document. Planning only.”

Run a fresh inherited Sol High session in a tool-created isolated worktree at the candidate. The prompt supplies no expected IDs and no prior findings or proposed solution. It routes through normal project planning instructions, limits writes to `validation/D1-fresh-plan/`, and excludes production epic/backlog reports to avoid seeding the answer from this story. Retain generated artifacts, exact revision, consulted sources/read-write inventory, checks, and preservation evidence. No product execution, implementation, installation, Git writes, external actions, or subagents. These are validation artifacts, not adopted production work.

Result: accepted for D1 criterion 5 within the following limits. The fresh inherited Sol High session used exact `da4792a` in `C:\worktrees\agento\t3-8a92b62a`. The coordinator read the original task through the completed thread and inspected the actual generated epic, three backlog items, command audit, research report, checkpoint, validator, inventory, check results, and preservation snapshots.

It independently produced `A-find-prerequisites.md`, `B-first-local-run.md`, and `C-troubleshoot-setup.md`, with matching epic rows, dependency references, and future `reports/A.md` / `checkpoints/A.md` paths (and B/C equivalents). Planned review names follow the existing convention and do not consume backlog IDs. The prompt did not supply these IDs or filenames. The session discovered/read the coordinator skill and canonical workflow; its read inventory excludes production D1 reports and the separate epic.

All 12 outputs were initially copied with SHA-256 equality to [the validation root](../validation/D1-fresh-plan/epic.md). Staged whitespace checking then rejected mixed CRLF/LF in `evidence/checks.json` and `evidence/preservation-after.json`. Only CRLF-to-LF normalization was applied to those two retained copies; the original worktree artifacts remain intact and the other ten files retain exact bytes. JSON values are unchanged.

| File | Original SHA-256 | Retained LF SHA-256 |
| --- | --- | --- |
| checks.json | `9FF59FEE0430B5ACAB9B99C09BDC3A85341DA0DA19BCC07AEC15FBE4EBEC3A6C` | `2DBEEF193F295B6648EBD607C9971DDDDC94F25804A53F401D35C3E0DCC9B547` |
| preservation-after.json | `68F8ADC2414C1073B952EA8BF7AAB8055F01A9F50003EDF9B7BD0B381A6A496B` | `FA769DF2EEEC68CD811AB14D4A458A9189EF939AB778103668207ED100862EF9` |

[Research](../validation/D1-fresh-plan/reports/research.md), [inventory](../validation/D1-fresh-plan/evidence/inventory.json), and [machine checks](../validation/D1-fresh-plan/evidence/checks.json) preserve the source context. The exercise reports 111 relative links and seven anchors checked. The coordinator independently confirmed source HEAD, zero tracked/index diffs, and index hash `C23ABF7A58C188EDA42AEB589CD9AAAA8CB4A83F9B6F0DFDCD627E2D46593429`, matching the before/after evidence. Source status contains only the assigned new validation directory.

The retained validator/results are historical exercise evidence, not an instruction to rerun preservation checks in the delivery checkout or relabel them as a later revision. A/B/C are unapproved plan artifacts, not additional production stories. The scenario covers three stories; it does not independently demonstrate mixed-kind allocation, later insertions, reordering, beyond-Z behavior, every host/model, or automatic UI selection. Those policy cases receive document review; no product/runtime claim is made.

## Review and next gate

Coordinator checks after retaining proof: 160 local links, including 10 anchors across 16 changed/added files, passed. Whitespace checks passed. Policy/skill/product/package/script/workflow content still matches the tested candidate `da4792a`; this successor records evidence/status only.

Assign `D1-sequential-backlog-ids-review-001` to examine the exact committed candidate plus retained proof, the acceptance criteria, policy/routing/compatibility, and coordinator evidence claims. Keep D1 In Review pending that review, latest-head CI, and human merge. No release or stage 2 start.
