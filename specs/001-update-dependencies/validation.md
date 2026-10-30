# Dependency refresh validation

Validated 2026-10-30 on x86_64-linux.

## Versions

- nixpkgs: NixOS 26.05, revision 6f06d204d8f2d8761d9da78778745974a3216381
  (2026-10-29); refreshed all flake inputs.
- Node.js: 26.13.0 LTS, explicitly shared by dev shell and both package builds.
- npm: 11.20.0, as bundled with the Nix Node.js package.
- Eleventy: 3.1.7; gray-matter: 4.0.3; markdown-it: 15.0.3.
- Transitive security fixes include brace-expansion 1.1.21 and js-yaml
  3.15.2/4.3.2.
- npmDepsHash: sha256-2V17nIOIl8cEH0ZkEju86sra7mYU+tivRp3KVBjnysU=

Upstream Node.js release reference: https://nodejs.org/en/blog/release/v26.13.0

## Checks

- Nix shell: node --version and npm --version passed.
- npm update --package-lock-only followed by npm ci passed (124 packages).
- npm audit: zero vulnerabilities at all severities.
- npm outdated: empty result for direct dependencies.
- npm run build: passed; 12 generated pages and 37 copied assets.
- Inline production smoke checks: EN/JA home, download, team, reports and terms
  outputs, language attributes and key CSS/JS/image assets passed.
- Preview npm build: passed with /daedalus/site path prefix and preview download
  endpoint; EN/JA navigation, CSS URLs and endpoint checks passed.
- nix flake check --no-build --all-systems: passed evaluation for all four
  declared systems.
- nix build .#default .#preview --no-link: both passed on x86_64-linux; checked
  representative EN/JA pages and CSS in both resolved package outputs.
- Changed Nix, JSON and spec files formatted with the flake formatter.
- git diff --check: passed.

## Notes and limits

The first install retained vulnerable transitive versions from the previous
lockfile. The planned full npm update resolved them without overrides. No
browser automation or builds on other host architectures were performed. No
commits, pushes, deployment or DNS changes were made. The master checkout and
root orphan branch remain unchanged. The feature worktree's inherited
root-directory ignore configuration was removed so its new specification files
are visible to Git.
