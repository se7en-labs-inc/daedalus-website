# Implementation plan

## Context and design

Eleventy 3 and Nunjucks produce `_site`; static files pass through from
`static/`. Use a static-only `wrangler.toml` with automatic trailing-slash
handling and nearest `404.html` lookup. Add `static/_redirects` and
`static/_headers`; Eleventy already copies these to the output root.

Use Wrangler supplied by the pinned nixpkgs input in the dev shell. Cloudflare
Builds can use `npx wrangler@4.62.0 deploy`, matching that input, after
`npm run build`. Do not add npm dependencies or change the lock/hash. Keep
Cloudflare account/domain configuration outside this change.

Remove `netlify.toml`, `.netlify.toml`, `netlify/`, `static/admin/index.html`,
and the unused Netlify project bootstrap script. Replace the obsolete Gatsby
README and tours with current usage. Rename the Netlify-named logo without
changing image contents.

## Research and tradeoffs

- Static-only Workers support `_headers` and `_redirects`, with nearest 404
  lookup: https://developers.cloudflare.com/workers/static-assets/
- HTML handling defaults to folder trailing slashes:
  https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
- Default browser caching revalidates. Only fingerprinted assets should use
  immutable caching:
  https://developers.cloudflare.com/workers/static-assets/headers/
- Workers Builds supports `.node-version` and `NODE_VERSION`:
  https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
- Master has no Node engine restriction; the supplied Node 26 warning comes from
  the separate dependency branch. Leave the runtime pin to that work.

## Validation

Use Nix for `npm ci`, production build, Wrangler deploy dry-run and local
Workers HTTP checks. Check every English/Japanese page, redirects, trailing
slashes, 404 bodies/status, cache and frame headers, and removed admin content.
Build Nix default/preview packages; verify preview prefix/assets. Record
commands and limitations in validation.md.

## Constitution check

Pass: no new service, dependency upgrade, deployment or account mutation.
Specification, plan and tasks precede implementation. The existing Nix package
dependency hash is unchanged. No data model or API contracts are needed for a
static hosting migration.
