# Validation: Pilot installers

## 2026-11-06: Named manifests and Mainnet fallback

- `nix develop -c npm test`: all nine test groups passed. Added coverage for
  network, HTTP, JSON and unusable-manifest failures triggering Mainnet's
  fallback; successful primary manifests skipping it; Pilot ignoring fallback
  configuration; both Mainnet sources failing without affecting Pilot; and the
  built EN/JA pages including a fallback attribute only for Mainnet.
- `nix develop -c npm run build`: passed, 12 localized pages generated.
- `nix build .#default .#preview --no-link --print-out-paths`: both passed.
  Outputs: `/nix/store/h8ij9a52wigpdy17zh4fa49cy8yi2skf-daedaluswallet-io-1.0.0`
  and `/nix/store/ww1iw4cxirbjri30y65852kljwvysbvl-daedaluswallet-io-1.0.0`.
  Exact generated download pages were checked for the named primary manifests,
  Mainnet-only legacy fallback and retained preview prefix/CDN directory.
- `git diff --check`: passed. No live manifest publication is assumed.

## Initial validation

2026-11-04. Worktree: `/home/sam/work/se7en/daedalus-website/003-pilot-installers`.

- `nix develop -c npm ci`: passed with the existing lockfile. npm reports
  existing dependency audit findings (5 high, 1 critical); dependency upgrades
  remain in the separate 001 feature.
- `nix develop -c npm test`: six test groups passed. Coverage includes both
  manifest formats for both channels; URLs, checksums, signature blob contents,
  modal links and prefixed icons; independent pending and failed requests;
  malformed and empty manifests; package-only Linux releases; partial Windows
  manifests; unsafe URLs; built EN/JA pages with independent endpoint overrides,
  isolation explanations, prefixed assets and unique element IDs.
- `nix develop -c npm run build`: passed, 12 localized pages generated.
- `nix build .#default .#preview --no-link --print-out-paths`: both passed.
  Default output: `/nix/store/7g9xn893cxvjgvshp2aivyvnf21i1yq9-daedaluswallet-io-1.0.0`.
  Preview output: `/nix/store/qqh5fq8an09w21x8kjxi4rkvza58hljp-daedaluswallet-io-1.0.0`.
  Exact output files were inspected: default retains the original Mainnet source;
  preview retains its CDN Mainnet source and `/daedalus/site/` prefix; both use
  the Pilot S3 source with environment `pilot`.
- `git diff --check`: passed.

Tests use release fixtures; they do not certify live Pilot publication, signing
keys, installer behavior or wallet storage implementation. Storage descriptions
reflect the user-provided release behavior. Existing platform verification
dialogs are reused. No deployment or external publication was performed.

Setup encountered an absent `tar` binary; supplying it through Nix allowed the
same Spec Kit reuse operation to complete. No implementation/test failures
required a change of approach.
