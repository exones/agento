# npm distribution

Status: selected registry, 2026-11-03. This supersedes the Forgejo/Tailscale registry proposal. GitHub hosts source, PRs, and Actions; npm hosts release packages. No publishing has been performed or authorized by selecting this registry.

## Delivery sequence

1. B implements the TypeScript foundation and prepares deterministic Windows/Linux Actions checks. No npm account is needed for local package installation and build verification with public dependencies.
2. C implements the manual epic/story ledger.
3. D builds the exact tarball, installs it outside the source checkout, and verifies its behavior. Prepare npm publication from GitHub Actions after those checks, with a manual/reviewed release trigger.
4. Complete the account/package bootstrap and trusted-publisher setup, then perform an explicitly authorized release. Keep an exact versioned tarball as the bootstrap artifact/fallback.

Keep `private: true` on the provisional local package until release configuration deliberately enables publication. The executable remains `agento` even if the package is scoped as `@<owner>/agento`. Package ownership/name availability must be verified; the local development name is not a registry reservation.

## User involvement before publishing

The coordinator or worker must identify the exact prerequisite when needed and continue independent work:

- npm account/organization owner and the intended package name/scope. Use the existing free/public-package route unless a different access model is chosen; flag any paid requirement before adopting it.
- Account verification, required two-factor setup, and any initial package publication/ownership action that needs the user's session.
- Trust configuration binding the package to the actual GitHub repository and publishing workflow, plus any release-environment approval the user chooses.
- Final authority to publish the verified artifact under the selected identity.

Request credentials through the host's secret mechanism if needed; never ask for raw token values in chat. Prefer trusted publishing where available. Do not silently generate a public release to test configuration.

These prerequisites do not block B or C. Put an actionable blocker in the checkpoint and the coordinator's `You` report when it becomes relevant. Avoid vague "needs credentials" messages: specify the nonsecret setup action and which release step it blocks.

## References

- [Public scoped packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/).
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/): implementation must check current first-publish requirements, supported runners, repository/workflow matching, and available authentication.
- [Private package requirements](https://docs.npmjs.com/about-private-packages/), if public access is later reconsidered.
