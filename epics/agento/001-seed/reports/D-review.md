# D: coordinator candidate inspection and independent local proof

Date: 2026-11-03. Result: local package proof accepted for review; D remains In Review.

PR: [#2](https://github.com/exones/agento/pull/2), branch `feat/package-bootstrap`, implementation head `10ff911294a72957fe7fc689757bb33d3c72b38d`. Coordinator owns subsequent status/evidence metadata; product/package changes require meaningful revalidation if made.

## Evidence inspected

Read worker `reports/D.md` and `checkpoints/D.md`, package/provenance, packing and verification scripts, package manifest, CI/release workflows, updated install/distribution instructions, and draft final report. Inspected archive listing: compiled `dist`, package manifest, and README; no development state, source tree, credentials, or runtime dependency on checkout paths was found in that inspection. Source maps/declarations are currently included under `dist`; that is not a source-import dependency.

Initial local checkout and index were clean at `10ff9112`. Independently ran `$env:AGENTO_REQUIRE_CLEAN = '1'; pwsh -NoProfile -File ./scripts/Test-Package.ps1`: exit 0, Node v26.13.0/npm 11.20.0/PowerShell 7.6.9. Rebuilt, packed, installed the exact tarball in a temporary consumer outside the source checkout, and exercised the installed executable through the script's lifecycle/failure/preservation/concurrency checks. Lock timeout was 5403 ms. Provenance records `sourceRevision` `10ff911294a72957fe7fc689757bb33d3c72b38d`, `worktreeDirty: false`, and `candidate: true`.

Artifact: `C:\code\agento\artifacts\package\agento-0.1.0.tgz`; SHA-256 `e40abb72422dacfc27a5f2d7a1f46dfda200640bc4f11c2640e936b4f809f3fb`, independently matched both before and after the run. Sidecar: `agento-0.1.0.provenance.json`. Both are gitignored. This supports the clean Windows candidate; no cross-OS byte-equality claim is made.

Worker's full Verify run already passed typecheck/build/40 tests plus package proof. The coordinator reran the new package gate, not the unchanged full product suite redundantly. Hosted Windows/Ubuntu PR #2 checks were In Progress when first queried; no hosted pass or artifact upload is claimed yet. The release workflow was not dispatched; no registry upload, tag, GitHub Release, merge, or stage 2 start occurred.

## Fresh review and open points

Assign R independently on this concrete candidate, including full seed outcomes and the new package/CI/release preparation. R must judge correctness, acceptance evidence, shell/native failure handling, source independence, artifact identity, current release-setup instructions, and limits. It is not a formal GitHub platform approval. Do not present this coordinator inspection as final acceptance.

The npm owner and available package name remain user decisions before publication. Worker lookup reports unscoped `agento` is another public package. Continue CI/review independently and retain `private: true`; never infer an npm scope from GitHub. Release setup changes, if later authorized, must preserve runnable verification for the selected publication identity.

R delegation request: client ID `4a749143-ddd0-4ea3-acab-cc90e7428378`, Sol High through Codex in the shared checkout, product read-only and only `reports/R.md` / `checkpoints/R.md` writable. No other implementation worker is active. Parent preserves product and Git state while review runs. Return findings before any final report/retro closure.
