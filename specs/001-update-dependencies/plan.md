# Implementation plan

## Context and constraints

Eleventy static site, Nunjucks templates, gray-matter and markdown-it. Nix
flake-parts provides a dev shell and buildNpmPackage for default/preview output.
No existing constitution or Spec Kit artifacts were found. Follow the personal
Nix, worktree and failure-recovery agreements.

## Design

Refresh the supported nixpkgs release and all remaining flake inputs. Select the
latest stable Node.js available from refreshed nixpkgs explicitly in both shell
and buildNpmPackage. Verify against upstream release information. Use npm
registry stable tags for direct dependencies and update the full lock graph. Use
Nix's prefetch-npm-deps to compute npmDepsHash before builds. Declare the
runtime requirement for non-Nix builds.

## Validation

Check node/npm versions; npm ci; npm outdated; npm audit; npm run build; preview
build with PATH_PREFIX; inspect representative EN/JA HTML and asset links. Run
flake evaluation/checks and Nix default and preview builds. Format only changed
files. Capture versions and outcomes in validation.md.

## Constitution check

No project constitution. No new services, reusable scripts or external writes.
Keep specification, plan and tasks ahead of implementation.
