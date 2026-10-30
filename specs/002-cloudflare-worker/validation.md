# Validation

Validated 2026-10-30 on x86_64-linux. Branch `002-cloudflare-worker` starts at
`master` commit `75b8675`. The maintainer confirmed the existing Cloudflare
Worker name is `daedalus-website`.

## Completed checks

- `nix develop`: Node 20.20.2, npm 10.8.2, Wrangler 4.62.0 from the pinned
  flake.
- `npm ci`: passed with the unchanged master lockfile, 137 installed packages.
- `npm run build`: passed; Eleventy 3.1.5 wrote 12 pages and copied 38 files.
- `npm run deploy -- --dry-run`: passed with the final configuration. No upload
  or deployment was performed.
- `npm run preview -- --ip 127.0.0.1 --port 8787`: local Workers runtime parsed
  six redirects and two header rules. All 24 HTTP scenarios passed:
  - Ten English/Japanese home, download, reports, team and terms pages return
    200, the expected language, frame protection and revalidation headers.
  - Six legacy redirects match the destinations and 302 statuses extracted from
    `master:.netlify.toml`.
  - English and nested Japanese unknown paths return the exact corresponding
    generated 404 body with HTTP 404. Missing assets and removed `/admin/` also
    return 404. These responses include frame protection.
  - CSS/JS revalidate, images cache for a week, and the renamed logo is served
    successfully.
  - `/download` redirects to `/download/` with HTTP 307.
- Generated `_headers` and `_redirects` match the source files. No admin
  directory is generated.
- `nix build .#default .#preview --no-link --json`: both final packages passed.
  Output checks cover EN/JA pages, localized 404 files, hosting metadata, logo,
  removed admin page and preview URL prefix.
- `nix flake check --no-build --all-systems`: passed evaluation for all four
  declared platforms. The existing unknown `inputs` flake-output warning
  remains.
- Changed Nix, JSON and Markdown files formatted with the flake formatter.
  Copied shell helpers had trailing blank lines removed. `git diff --check`
  passed.
- Dependency lockfile, flake inputs, Nix package runtime and npm dependency hash
  are unchanged. Both original worktrees remain clean and their branches
  unchanged.

## Runtime compatibility

The flake pins Wrangler 4.62.0 and workerd 1.20260131.0. The initial
current-date compatibility setting produced a local fallback warning. The final
compatibility date is explicitly `2026-01-31`, matching the tested runtime; the
server reloaded without warnings and all HTTP checks passed. No Worker
application code or runtime compatibility flags are required.

## Limits and separate dependency work

The clean install reports six existing vulnerabilities (five high, one critical)
in master's dependency graph. They are left to `001-update-dependencies`; no
automatic audit fixes were applied. This branch intentionally does not select
Node 26 in Cloudflare Builds. That selection belongs with the dependency branch
that requires it.

The supplied CI excerpt contains a Node engine warning and successful Eleventy
output, but ends before any fatal failure. No remote CI result, Cloudflare
account configuration, DNS, authenticated deployment or browser rendering was
tested. No commits, pushes or deployments were made. The temporary preview
server was stopped after validation.

## CI preview configuration follow-up

The later CI log identifies the failure: `wrangler preview` requires a
`previews` block. Added an empty top-level `[previews]` table, retaining
top-level assets and compatibility settings, as specified in the
[Cloudflare preview configuration documentation](https://developers.cloudflare.com/workers/previews/configuration/#wrangler-configuration-file).
Updated the README to reflect the existing CI command and distinguish it from
the local `npm run preview` development server.

Nix `builtins.fromTOML` assertions passed for the empty previews table, Worker
name, asset directory and 404 handling. The local Wrangler 4.62.0 deploy dry-run
still passes; that older version warns about the new `previews` field. It does
not implement the newer CI preview command, so remote preview creation remains
to be verified by a CI rerun. No preview upload or deployment was performed.
