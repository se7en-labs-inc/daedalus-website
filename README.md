# Daedalus Wallet website

The English and Japanese website uses Eleventy and Nunjucks. Page templates live
in `src/`, content in `resources/content/`, and public files in `static/`.
`npm run build` writes the deployable site to `_site/`.

## Local development

Use the pinned Nix environment, which includes Node.js and Wrangler:

```sh
nix develop
npm ci
npm run develop
```

Open http://localhost:8080. To test Cloudflare routing, redirects and headers:

```sh
npm run build
npm run preview
```

Wrangler serves the built site at http://localhost:8787. Rebuild after editing
source files when using this preview. No Cloudflare login is needed for local
preview or `npm run deploy -- --dry-run`.

## Cloudflare Workers

The site uses Workers Static Assets, configured in `wrangler.toml`, targeting
the existing `daedalus-website` Worker. The account, custom domain and Git
integration are managed in the Cloudflare dashboard.

For the existing Workers Builds integration, use the repository root with:

- Build command: `npm run build`
- Deploy command: `npx wrangler@4.62.0 deploy`
- Non-production branch command configured in the existing CI:
  `npx wrangler preview`

The CI preview command uses a newer Wrangler than the local Nix shell. It
requires the empty `[previews]` table in `wrangler.toml`; assets and
compatibility settings remain at the top level. `npm run preview` runs the local
development server with `wrangler dev`.

Wrangler 4.62.0 matches the version supplied by this flake's pinned nixpkgs.
Cloudflare installs npm dependencies automatically. `_site/` is declared in
`wrangler.toml`; this is a Worker with static assets, not a Pages project, and
requires no Worker entrypoint or separate publish-directory setting.

For a manual deployment from the Nix shell, after building and authenticating
with the intended Cloudflare account, use `npm run deploy`.

`static/_redirects` preserves the legacy native-tokens and d0 redirects.
`static/_headers` adds frame protection and one-week image caching. HTML and
unversioned CSS/JS use Workers' default browser revalidation policy. Missing
URLs return the nearest `404.html`, including the Japanese page under `/ja/`.

Content changes are made in Git. The obsolete Netlify CMS and Identity admin
page have been removed.

### Dependency branch runtime

This hosting migration starts from `master` and does not upgrade Node or npm
dependencies. The separate `001-update-dependencies` branch requires Node
26.13.0 or newer within major 26. When merging that work, also select that
runtime in Cloudflare Builds using `.node-version` or the `NODE_VERSION` build
variable. A package `engines` field and a Netlify build variable do not select
Cloudflare's build runtime. The supplied CI excerpt shows an engine warning
followed by successful Eleventy output; it contains no fatal error.

## Nix builds

```sh
nix build .#default .#preview --no-link
```

The preview package uses `/daedalus/site` as its path prefix and the configured
preview download endpoint. Both packages include the Cloudflare headers and
redirects. `PATH_PREFIX` and `DOWNLOAD_ENDPOINT` remain available to npm builds;
Cloudflare Builds environment variables must be configured as build variables,
not Worker runtime bindings.
