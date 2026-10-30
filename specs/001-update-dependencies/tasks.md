# Dependency refresh tasks

Execute in order; validation depends on updated manifests, locks and cache hash.

- [x] T001 Inventory dependencies, branch/spec numbers and repository
      conventions.
- [x] T002 Create verified worktree and specification, plan and requirements
      checklist.
- [x] T003 [US1] Refresh flake.nix inputs and flake.lock; verify current
      Node.js.
- [x] T004 [US1] Align perSystem/devShells.nix and perSystem/packages.nix
      runtime.
- [x] T005 [US2] Refresh package.json and package-lock.json stable dependencies.
- [x] T006 [US2] Compute and update npmDepsHash in perSystem/packages.nix.
- [x] T007 [US1] Validate Nix evaluation and both package builds.
- [x] T008 [US2] Validate reproducible npm install, audit and site output.
- [x] T009 Record versions, checks and limitations in validation.md and review
      diff.
