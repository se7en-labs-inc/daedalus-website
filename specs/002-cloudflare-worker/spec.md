# Feature specification: Cloudflare Worker hosting

Branch: `002-cloudflare-worker`. Created: 2026-10-30. Status: Approved for
implementation by user request. Base: `master` at `75b8675`, explicitly
requested so this can merge before dependency updates.

## User scenarios and acceptance

### US1: Deploy the static site (P1)

As a maintainer I can build and upload the existing site to the already-created
Cloudflare Worker. Given a clean checkout, when the site builds and Wrangler
packages it, then the `_site` output is accepted without application server
code. Given a built site, when a visitor requests English/Japanese home and
content pages, then they receive the existing content and assets.

### US2: Preserve hosting behavior (P1)

Given a historical native-tokens or d0 link, when requested, then it returns its
existing external destination with HTTP 302. Given an unknown English/Japanese
URL, when requested, then it returns the closest localized 404 page with
HTTP 404. Given pages or assets, when requested, then frame protection is
present, HTML and unversioned CSS/JS revalidate, and images cache for one week.

### US3: Remove obsolete hosting integration (P2)

Given the migration, when building the public site, then no Netlify Identity or
CMS assets are published. Given the repository documentation, when a maintainer
follows it, then the commands describe Eleventy and Workers rather than obsolete
Gatsby/Netlify setup.

## Requirements

- FR-001: Add Workers static asset configuration for `_site` without DNS or
  account changes.
- FR-002: Carry all six redirects from `.netlify.toml` into deployment output.
- FR-003: Return real localized 404 responses; do not introduce an SPA fallback.
- FR-004: Preserve frame protection and image caching. Avoid year-long immutable
  caching for filenames that do not contain content hashes.
- FR-005: Remove Netlify hosting configuration and unused CMS code, public admin
  page and setup instructions.
- FR-006: Preserve npm dependencies, lockfile, Nix dependency hash, runtime
  versions, production and preview build inputs.
- FR-007: Document build/deploy commands and distinguish the separate Node 26
  dependency-branch warning from a fatal build error.

## Edge cases and assumptions

Cloudflare account, domain and Git integration are already configured by the
user. The maintainer confirmed the existing Worker name is `daedalus-website`.
No deployment is authorized. Historical redirects retain their trailing-slash
paths. Unknown files must not return the home page. Old CMS setup is unused by
the current Eleventy build. No content redesign or dependency upgrade belongs in
this branch.

## Success criteria

Clean installation and site build pass. Wrangler dry-run accepts configuration
and output. Local HTTP checks cover both languages, six redirects, localized
missing pages and cache/frame headers. Nix default and preview packages build.
No dependency/runtime changes are included.
