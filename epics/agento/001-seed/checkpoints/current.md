# agento 001 current checkpoint

Updated: 2026-11-03.
Active item: B, delegation requested after the user's continuation. Spike A remains accepted. Next dependent item: C after B passes review.
Controller: bootstrap `agento-coordinate` skill and files; no released CLI.
Assigned roles: Sol High coordinator; Grok 4.7 Extra High worker through Cursor. In coordinated mode this file belongs to the coordinator; worker uses `checkpoints/<task>.md`.
Checkout: `C:\code\agento`. Git branch: `main`, tracking `origin/main`. HEAD: `dc6e3c47aefa974f48124edeae934e471aa99bbe` (`first commit`). Configured origin: `https://github.com/exones/agento.git`.
Commit/push state: user initialized Git; planning/contract changes are modified/untracked and have not been committed or pushed by this coordinator. Preserve existing changes. A worktree delegate would not receive these uncommitted files; commit the handoff first if worktree isolation is chosen, or keep the single worker in the shared checkout.

## Resume here

Read root `AGENTS.md`, the coordinator skill, `docs/decisions.md`, this epic's `epic.md`, `docs/seed-contract.md`, `reports/A-review.md`, and `backlog/B-foundation.md`. The user resumed delivery and confirmed npm. B is the active assignment; A must not be repeated. On completion inspect B's actual files/report and gate evidence before accepting it or moving to C.

## Done

- Confirmed npm as the registry, superseded the Forgejo design, cancelled spike I, and recorded the exact user-owned publishing prerequisites in `docs/npm-distribution.md`. No input is needed to begin B; report any later blocker promptly.
- Added the user's required three-line coordinator report (`Done / You / Next`) to the skill and validated it. Verified the new Git branch/HEAD/configured remote. User requested this report before deciding the next action; B remains Ready and unassigned.
- Completed the first actual Grok 4.7 Extra High handoff. Accepted A's environment/CLI contract after coordinator corrections: direct state replacement; contiguous event prefix and blocked mutations on lag; explicit post-commit error behavior. Recorded independent evidence in `reports/A-review.md`. B is Ready, not started.
- User requested Agile terminology and a reusable coordinator skill. Moved active work to `epics/agento/001-seed/epic.md` and `backlog/`, preserving IDs. Authored `.agents/skills/agento-coordinate/SKILL.md`, templates, and delegation reference. Added Ready/Done criteria and natural-language planning/delivery/resume entry points. Structural validation and live-host proof are distinguished in the planning report.
- Added the start-A coordinator prompt to `docs/agent-handoff.md`; it explicitly assigns Grok through T3 when the user sends it. Recorded public npm as the proposed distribution route pending visibility/name selection; Forgejo is optional. No worker launched or publication performed.
- Recorded cross-provider instruction loading and explicit Sol/Grok role prompts in `docs/agent-handoff.md`. Shared status has one owner; model options are configured in T3. Verified current capability metadata without launching an agent.
- Project renamed to `agento`; epic moved to `epics/agento/001-seed/` and handoff links updated.
- CLI naming resolved by the user: executable is `agento`, in full. Updated current command examples, implementation backlog items, and naming decision. Planned state directory remains `.crew/`; npm publication identity remains separate.
- Recorded the original intent and the revised release ladder in durable files.
- Recorded TypeScript product, first-class PowerShell automation, GitHub Actions, Tailscale, and self-hosted Forgejo preference.
- Created ordered seed backlog items A/B/C/D/R and optional infrastructure discovery I.
- Recorded stage gates, report requirements, handoff prompts, and infrastructure unknowns.
- Consulted official Tailscale GitHub Action/federation and Forgejo npm registry documentation for the proposed private publishing route. No account/host configuration was inspected.

## In flight

B delegation request: provider `cursor`, model `grok-4.7`, `reasoning_effort: xhigh`, isolation `shared`. Client request ID: `e797f790-cce7-4db3-bce7-2d09a598422c`. Shared checkout retains the uncommitted accepted contract; no concurrent worker or worktree is needed. Worker owns product foundation, verification/CI files, `checkpoints/B.md`, and `reports/B.md`; coordinator retains epic/shared status and registry decisions. Launch result is recorded in the coordinator conversation. No commit, push, PR, merge, release, or publication is assigned to this worker.

## Last verification

Verified actual A outputs and B/C/D alignment; rechecked local tool versions and official Node/PowerShell sources. A disposable overwrite/failure-preservation probe passed on Node v24.19.0 / win32. This is not a Node 26/Linux product test. Live cross-provider delegation and report handoff worked; complete CLI delivery and fresh-session recovery remain unproven.

## Files changed

Root `README.md` and `AGENTS.md`; planning documents under `docs/`; epic index/report format; seed epic, backlog items, checkpoint, retro, and planning report under `epics/`.
Original MVP plan and inspiration remain reference material.

## Blockers and inputs

No user-owned blocker to local B. B must obtain an isolated Node 26.x toolchain (`>=26.13.0 <27`); default Node is 24.19.0. PowerShell 7.6.9 meets the minimum. `gh repo view` verifies `exones/agento` is PUBLIC with ADMIN permission for the current account; actual CI execution is still pending. npm account/scope and trust setup are release prerequisites to surface before publication. Forgejo/tailnet registry setup is cancelled. No system Node upgrade has been performed.

## Next concrete action

Launch the recorded B delegation once, follow T3's completion instructions, and end the turn on an asynchronous wake-up instruction. Do not poll or duplicate the worker. On completion review actual changes and run the relevant independent gate, then update shared status. If user-owned setup blocks progress, state the precise action and impact in the `You` report while continuing independent work.
