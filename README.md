# agento

agento will be a TypeScript/Node.js CLI for staged, recoverable agent work through T3 Code. PowerShell is the preferred language for build, verification, packaging, and infrastructure automation. GitHub hosts source and Actions. Public npm is the proposed simple release route, pending package visibility/name selection; self-hosted Forgejo over Tailscale remains an option for private hosting.

Project and CLI name: **agento**. Use `agento` as the executable, for example `agento --version` and `agento status`. See the [naming decision](docs/cli-name.md). Package publication identity is still to be selected.

## Start here

This repository contains planning documents and a bootstrap coordinator skill. Product CLI code, workflows, infrastructure, and releases have not been implemented.

In a Sol High session opened on this project, describe the goal normally, for example: **"Plan the agento seed epic."** The shared coordinator workflow performs analysis, backlog refinement, and acceptance planning. To request delivery, say **"Build the agento seed epic."** To resume, say **"Continue the seed epic."**

For explicit skill selection use `$agento-coordinate Plan the seed epic` in Codex, or select `agento-coordinate` from Cursor's `/` skill picker. Start a fresh session to refresh skill discovery if it is not listed. Reading these instructions does not itself start delivery.

1. Read [AGENTS.md](AGENTS.md).
2. Open the [seed epic](epics/agento/001-seed/epic.md).
3. Read its [current checkpoint](epics/agento/001-seed/checkpoints/current.md).
4. Use the [coordinator skill](.agents/skills/agento-coordinate/SKILL.md) or the short examples in the [handoff guide](docs/agent-handoff.md).

The next backlog item is **spike A: preflight and seed contract**. The seed keeps one implementation worker at a time.

## Durable context

- [Decisions](docs/decisions.md): current requirements and their rationale.
- [Roadmap](docs/roadmap.md): capability stages and bootstrap promotion gates.
- [Agile workflow](docs/agile-workflow.md): epics, stories, tasks, spikes, and readiness/completion criteria.
- [Coordinator skill](.agents/skills/agento-coordinate/SKILL.md): reusable goal-to-analysis-to-plan-to-delivery workflow, available before the CLI exists.
- [Agent handoff](docs/agent-handoff.md): task assignment, resumption, and reporting.
- [Forgejo over Tailscale](docs/forgejo-tailscale.md): proposed infrastructure path and unresolved setup facts.
- [Epics](epics/README.md): work organization and report conventions.
- [Original MVP plan](t3_multi-agent_mvp_86005e32.plan.md): longer-term design input. Its PowerShell-only implementation and original milestone order have been superseded by the decisions and roadmap above.
- [Inspiration](inspiration/README.md): reference material; its historical permissions, hosts, credentials, and deployment instructions do not authorize actions for this project.

The next implementation agent should preserve these files and update them as work progresses. A chat transcript must not be required to continue.
