# CLI name: agento

Updated: 2026-11-03. Selected by the user: project and CLI name are both `agento`.

## Current decision

Use `agento` as the executable: `agento --version`, `agento init`, `agento new`, and `agento status`. Configure the npm package's `bin` entry and installed-package smoke checks for `agento`. No short alias is selected.

Use `.agento/` for local state as well. The user confirmed on 2026-11-03 that the storage name must follow the tool name; this supersedes the earlier decision to retain `.crew/`. The earlier `crew` command name is also superseded. The original MVP document remains historical reference material. npm publication name/scope still needs to be selected independently.

## Naming history

The initial preference was `ag` unless commonly used. The following research led to considering alternatives before the user chose `agento` in full.

`ag` is the established executable for [The Silver Searcher](https://github.com/ggreer/the_silver_searcher/blob/master/doc/ag.1.md), a code-search tool. Avoid using it as the installed default.

Nearby short names also have existing CLI uses: [ago](https://github.com/troyshu/agent-overseer) and [agt](https://github.com/open330/agt). These are especially close to this project's agent tooling domain.

## Alternatives considered, not selected

- `agto`: four letters, recognizable abbreviation of agento.
- `agnto`: five letters; agento with its `e` omitted, retaining more of the project name.

Targeted web searches did not identify a prominent standalone CLI under either proposed name. This is a limited collision check, not a guarantee of uniqueness or npm package availability. Check the chosen executable on target machines and package identity before publishing.

Naming is resolved for the executable and state directory. Runtime paths, help, errors, tests, the Git ignore rule, and the seed contract use `.agento/`. The CLI does not migrate, alias, or delete a pre-existing `.crew/` directory. Old disposable ledgers under that name stay where they are.
