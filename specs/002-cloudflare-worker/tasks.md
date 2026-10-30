# Tasks: Cloudflare Worker hosting

Dependencies: T001 precedes implementation; T002–T004 precede T005; T005
precedes T006.

- [x] T001 Specify scope and plan in `spec.md` and `plan.md` on a verified
      sibling worktree based on master.
- [x] T002 [US1] Add `wrangler.toml`, Wrangler in `perSystem/devShells.nix`,
      preview/deploy scripts in `package.json`, and Wrangler state ignores.
- [x] T003 [US2] Add `static/_headers` and `static/_redirects` with localized
      404 handling in `wrangler.toml`.
- [x] T004 [US3] Remove obsolete Netlify configuration/CMS/setup assets and
      tours; update `README.md` and logo path in
      `src/_includes/partials/header.njk`.
- [x] T005 [US1] [US2] [US3] Validate clean build, Wrangler dry-run, local HTTP
      behavior and Nix default/preview packages.
- [x] T006 Record results and CI log limitations in `validation.md`; inspect
      final diff.

- [x] T007 Fix the reported CI `wrangler preview` configuration error by adding
      an empty top-level `previews` table; update preview documentation and
      validate the configuration without deploying.
