# Dependency and runtime security refresh

Branch: 001-update-dependencies Created: 2026-10-30 Status: Ready for
implementation

## User scenarios and acceptance

### US1: Supported runtime (P1)

As a maintainer, I need development and reproducible builds to use the latest
stable Node.js with current security fixes. Given a fresh checkout, when I enter
the Nix shell or build a Nix package, then both use the same supported Node.js
major and security-patched version.

### US2: Current dependencies (P1)

As a maintainer, I need direct and transitive dependencies refreshed. Given
refreshed manifests and locks, when I install reproducibly and build the site,
then English and Japanese pages, assets and preview paths remain usable.

## Requirements

- FR-001: Refresh every flake input and the npm dependency graph to current
  stable releases.
- FR-002: Use the latest stable Node.js in both the shell and Nix package
  builder.
- FR-003: Regenerate the npm lock and fixed-output dependency hash reproducibly.
- FR-004: Preserve existing production and preview configuration and all four
  Nix systems.
- FR-005: Report audit results, exact runtime versions and validation
  limitations.
- FR-006: Keep all changes isolated in this worktree; do not commit or publish
  automatically.

## Edge cases and assumptions

Prerelease package versions are excluded. Obsolete dependencies may require
compatibility changes, which must be reported before changing approaches.
External download/analytics services and unused historical scripts are not
dependency manifests. This is a maintenance update; no product behavior changes
are intended.

## Success criteria

A clean npm install and production/preview builds succeed with refreshed locks.
Nix evaluates the declared systems and both site packages build on the host. The
npm audit has zero known vulnerabilities, or unresolved findings are explicit.
