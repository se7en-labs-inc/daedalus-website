# Daedalus website constitution

1. Preserve the Eleventy site, English/Japanese routes and Nix
   production/preview builds.
2. Use the project Nix shell for development and validation. Keep runtime and
   dependency upgrades separate from hosting changes.
3. Write a feature specification, plan and tasks before implementation. Allocate
   numbered features across the full worktree family.
4. Validate hosting changes with a real local Workers runtime, including
   redirects, headers and localized 404 responses. Validate the Nix package
   build.
5. Keep changes in the selected worktree. Do not deploy, change DNS, commit or
   push without a request. Explain failed approaches and ask before changing
   approaches.

Version: 1.0.0. Ratified: 2026-10-30.
