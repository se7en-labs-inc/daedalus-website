# Implementation plan: Pilot installers

Date: 2026-11-04. Specification: [spec.md](spec.md).

## Technical context and research

Eleventy 3, Nunjucks templates, Markdown YAML content, plain browser JavaScript
and CSS. Development uses the existing Nix shell (Node 20); no new dependencies.
The current renderer normalizes flat and nested manifests, with one global
download root and one Mainnet Linux package section. Modal clicks are delegated,
so a second grid can reuse the existing verification dialogs.

## Design

1. Use `daedalus-mainnet.json` and `daedalus-pilot.json` in the existing Mainnet
   S3 bucket. Keep independent `DOWNLOAD_ENDPOINT` and `PILOT_DOWNLOAD_ENDPOINT`
   overrides, plus `DOWNLOAD_FALLBACK_ENDPOINT` for Mainnet's legacy manifest.
   Pass a fallback attribute only to the Mainnet download root. Try the fallback
   after a network/HTTP/JSON failure or a manifest with no usable artifacts;
   skip it after successful primary loading. Expose the same arguments in
   `mkSite`; preview retains its CDN directory with the new Mainnet filename
   and its old filename as fallback. Pilot never uses a legacy fallback.
2. Extract the download-root markup into a shared partial for both channels
   and locales. Add Mainnet and Pilot headings, descriptions and localized
   loading/error/button labels in existing download content files.
3. Load all `[data-download-channel]` roots independently. Reuse normalization
   and card rendering. Include Pilot Linux package cards with signatures and
   checksums; keep repository instructions restricted to the Mainnet root.
   Handle package-only Mainnet manifests by allowing the Linux section to render.
4. Use localized buttons to identify the channel. Add modest section spacing and
   an isolation callout using the site's existing colors and grid rules.
5. Add Node built-in test runner coverage using VM browser stubs and built-page
   assertions. Cover two independent asynchronous fetches, reversed failures,
   both schemas, Linux package-only releases, metadata and prefixed assets.

No new API or persistent model is needed: manifests retain their existing schema.
Pilot repository URLs/package names are unknown and will not be guessed.

## Constitution check

Preserve Eleventy, EN/JA and production/preview Nix builds; use Nix; spec, plan
and tasks precede implementation. No hosting behavior, dependency or runtime
changes. Hosting-specific Workers checks are inapplicable to this feature.
Validate both Nix packages. No deployment, commits or pushes. Design recheck:
all applicable gates pass.

## Validation / quickstart

Run `nix develop -c npm ci`, `nix develop -c npm test`, and
`nix develop -c npm run build`. Run `nix build .#default .#preview`.
For local testing set `DOWNLOAD_ENDPOINT` and `PILOT_DOWNLOAD_ENDPOINT` to
fixture-serving URLs before `nix develop -c npm run develop`. Check both
`/download/` and `/ja/download/`; serve `_site` beneath the configured prefix
when checking a preview build. Record exact validation results in validation.md.
