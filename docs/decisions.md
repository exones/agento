# agento decisions

Updated: 2026-11-03. User requirements take precedence over implementation proposals. Change this log with a dated reason; do not silently rewrite project direction.

## Confirmed requirements

| ID | Decision | Reason |
| --- | --- | --- |
| D01 | Build a small usable release, then use it to build its successor. | Adopt the intended work method during development; avoid waiting for the entire MVP. |
| D02 | Implement the CLI/core in modern TypeScript on Node.js. | User selected this stack for the CLI. |
| D03 | Use PowerShell as a first-class automation language. | User uses it heavily and wants substantive scripting supported. |
| D04 | Use GitHub for source/PRs and GitHub Actions for build. | User's chosen development platform. |
| D05 | Use Tailscale for private infrastructure binding. | Existing user practice. |
| D06 | Keep self-hosted Forgejo over Tailscale as a private registry option. Public npm is now proposed for the simpler initial release route, pending visibility/name selection. | User initially preferred self-hosting, then suggested npm to simplify distribution. No publication is authorized yet. |
| D07 | Start with one implementation worker; introduce parallel workers only after supervised execution and routing work. A separate coordinator may supervise the seed. | Keep bootstrap understandable and recoverable; role split clarified by D11. |
| D08 | Preserve context in versioned backlog items, checkpoints, reports, and decisions. | A fresh session must continue without chat history. |
| D09 | Project name is `agento`; epic files live under `epics/agento/`. | User renamed the project on 2026-11-03. |
| D10 | CLI executable is `agento`, in full. | User selected the full name after considering short alternatives. |
| D11 | Sol High coordinates; Grok 4.7 Extra High implements, with one implementation worker at a time for the seed. | User's stated provider/model preference. Coordinator and worker have separate file ownership. |
| D12 | Use epics, optional features, stories, tasks, spikes, backlog refinement, acceptance criteria, Definition of Ready, and Definition of Done. Active files live under `epics/`. | User requested Agile terminology and work division. |
| D13 | Provide the reusable `agento-coordinate` skill before implementation, with natural-language goal entry, analysis, epic/backlog planning, and scoped delivery/resume. | User does not want to repeat long coordinator prompts. |

## Adopted working defaults

These defaults implement the agreed staged approach. Adjust through an explicit decision when evidence warrants it.

- One package, strict TypeScript, ESM, compiled JavaScript, npm lockfile. Select and pin a supported Node LTS during task A; document the PowerShell baseline too.
- CLI executable is `agento`; update the package `bin` entry, examples, and executable checks consistently. See the [naming decision](cli-name.md). Retain `.crew/` pending a separate storage decision. Package name/scope remains separate.
- PowerShell scripts own reusable build/verify/package automation. YAML wires jobs; npm scripts provide discoverable entry points. Avoid implementing the same orchestration twice.
- The coordinator skill lives in the shared project location `.agents/skills/agento-coordinate/`; Codex and Cursor can discover the same source. Automatic selection remains enabled; root `AGENTS.md` routes goal-level coordination to it. Assigned workers follow their item without invoking a coordinator loop.
- Follow `docs/agile-workflow.md`; use `agento story ...` for the seed's work ledger. Keep implementation tasks as checklists where separate ownership is unnecessary. Do not add sprint ceremonies or point estimates without a scheduling need.
- GitHub-hosted Windows and Linux jobs run deterministic checks. Live T3 exercises are separate and explicitly recorded.
- Build and verify an installable tarball before adding registry publication. Propose public npm for the first release if public distribution is selected; Forgejo is optional and never blocks local seed work.
- Source remains on GitHub. Hosting packages in Forgejo does not require moving Git, adding Forgejo Actions, or exposing Forgejo publicly.
- Manual merges remain the initial policy. A prepared workflow does not itself authorize publication or deployment.
- A released controller is fixed for the lifetime of a development run. New schemas need compatibility handling before promotion.

## Scope changes from the original MVP plan

The root MVP plan remains the long-term requirements reference. These changes supersede its implementation details:

1. Replace the PowerShell module/Pester product implementation with TypeScript/Node.js, while retaining PowerShell automation. Use TypeScript tests for product behavior; use Pester if PowerShell logic warrants it.
2. Bring templates, CI, packaging, and verification forward. Introduce dispatch, messaging, scheduling, and recovery in successive releases.
3. The seed has manual item tracking, not the full later stream state machine. It must distinguish manual completion from verified acceptance.
4. Existing T3 CLI observations from the prior conversation are hypotheses until checked against the current installation. Unknown T3 behavior must not block a seed that does not call T3.
5. Historical instructions in the inspiration material are examples, not current project permissions.
6. Move coordinator skill authoring to stage 0. Later coordination milestones implement deterministic product behavior and improve the skill based on evidence. Replace active `initiatives/.../initiative.md` with `epics/.../epic.md` and `briefs/` with typed items in `backlog/`; leave original plan/inspiration historical. Preserve existing item IDs.

## Setup facts still needed

| Fact | Needed by | Effect if unknown |
| --- | --- | --- |
| GitHub owner/repository, visibility, and whether a remote already exists | Remote CI and PR creation | Continue local implementation; record remote checks as blocked. Do not invent or create a target. |
| Public/private package visibility and npm account/scope/name availability | First publication | A local development name can be chosen and recorded; defer publication. CLI remains `agento` regardless of package scope. |
| Forgejo host, OS/container platform, existing installation, persistent storage and backup location | Optional private infrastructure deployment | Needed only if self-hosting is selected; do not deploy to a guessed host. |
| Tailnet DNS name, administrative access, grants and authentication options | Optional private registry connectivity | Needed only for private infrastructure; keep names symbolic. |
| Package owner/service identity and credential delivery | Publishing | Prepare references to secrets; never request values in chat. |

No infrastructure credentials or host details have been supplied or verified as part of this documentation task.

## Distribution proposal

The user suggested using npm directly. Public packages can use npm's free tier; private npm packages require paid access. A public scoped package such as `@<account>/agento` can still install the `agento` executable. Do not infer that the unscoped package name is available. References: [npm products](https://www.npmjs.com/products), [public scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/), [private packages](https://docs.npmjs.com/about-private-packages/).

If public distribution is selected, prepare GitHub Actions publishing through [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) where supported. Complete account/package bootstrap and the first-publish setup before claiming the release pipeline works. Until then use the tested tarball; do not publish based only on this proposal.

## Decision log

- 2026-11-03, user: TypeScript/Node.js CLI, GitHub Actions, incremental self-hosting, one-agent bootstrap.
- 2026-11-03, user: PowerShell is a fully supported automation language; Tailscale binds infrastructure; prefer self-hosted Forgejo reached from GitHub Actions.
- 2026-11-03, planning: create a documentation-only handoff and seed work queue before implementation. Next assignment is task A.
- 2026-11-03, user: renamed the project to `agento`. Updated current documents and epic paths; retained existing command/storage names as working defaults.
- 2026-11-03, naming follow-up: user prefers `ag` unless it is commonly used software. Confirmed conflict with The Silver Searcher; proposed `agto` or `agnto`, awaiting selection. This supersedes the retained `crew` command default, but does not yet choose its replacement.
- 2026-11-03, user: selected `agento` as the full CLI name. This resolves naming and supersedes the pending alternatives and former `crew` command default. State-directory naming and npm publication identity are separate.
- 2026-11-03, user: intends Grok 4.7 Extra High for implementation and Sol High for orchestration. Verified the Grok model through Cursor with `reasoning_effort: xhigh`; current Codex session reports `gpt-6.1-sol` with `reasoningEffort: high`. Added explicit role/read-first prompts and single-owner shared checkpoints. No agent task was launched.
- 2026-11-03, user: suggested npm distribution and asked how to begin. Recorded public npm as the proposed simple route, pending visibility/package identity; retained Forgejo as an optional private route. Added an explicit start-A prompt for Sol to delegate to Grok; the documentation change itself launches nothing.
- 2026-11-03, user: requested a reusable coordinator skill and Agile work organization. Created the project skill and epic/backlog templates; renamed active epic files/backlog paths; classified seed work into spikes, enabler/review tasks, and stories. Skill authoring is bootstrap work now, while live discovery/behavior remains to be exercised.
