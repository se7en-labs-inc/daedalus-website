# Development

Use `$speckit` for new features; follow
[.specify/memory/constitution.md](.specify/memory/constitution.md).

Enter `nix develop`, then use `npm ci`, `npm run build` and `npm run develop`.
Use `npm run preview` to check Cloudflare routing locally after building.
Validate production and preview output with
`nix build .#default .#preview --no-link`. Hosting changes also require local
HTTP checks for English/Japanese pages, redirects, cache headers and 404
responses.
