# Feature specification: Pilot installers

Branch: `003-pilot-installers`. Created: 2026-11-04.
Status: Authorized for implementation by the feature request.
Base: `master` at `75b8675`. Numbers 001 and 002 are already allocated;
no additional abandoned numbers were found in branch, worktree or spec records.

## User scenarios and acceptance

### US1: Choose Mainnet or Pilot (P1)

Visitors can obtain the existing Mainnet installers and the new Pilot installers
from the download page in English and Japanese.

- Given available manifests, when either download page opens, then clearly
  labelled Mainnet and Pilot sections show their respective platform downloads,
  versions, signatures and checksums.
- Given a failed, empty or malformed Pilot manifest, when the page opens, then
  the Mainnet downloads remain usable and Pilot shows a localized unavailable
  message. The reverse also holds.
- Given either supported manifest format, when packages are published, then
  their URLs and verification metadata come from that environment's manifest.

### US2: Understand Pilot storage (P1)

Visitors understand what Pilot contains before downloading it.

- Given either language, when viewing Pilot, then the copy states that Pilot
  includes Preview, Preprod and Mainnet Flight, each using isolated storage.
- Given a standard Mainnet installation, when reading the Pilot information,
  then it explicitly says Flight does not share storage with standard Mainnet.

### US3: Configure release sources (P2)

Maintainers can independently override Mainnet and Pilot manifest sources in
local, production and preview builds.

- Given the default configuration, when building, then Mainnet and Pilot use
  `daedalus-mainnet.json` and `daedalus-pilot.json` in the existing
  `update.cardano-mainnet.iohk.io` bucket.
- Given an unavailable or unusable new Mainnet manifest, when loading, then
  Mainnet retries `daedalus-latest-version.json`. Pilot has no legacy fallback.
- Given endpoint overrides, when building, then each section uses its own
  configured source, including builds with a path prefix.

## Requirements

- FR-001: Keep existing Mainnet downloads and Linux repository instructions.
- FR-002: Add independent Pilot manifest loading, download links and verification.
- FR-003: Explain the three Pilot versions and their storage isolation in EN/JA.
- FR-004: Support existing flat and nested platform manifests, partial platforms,
  package-only Linux releases, and independent failure/loading states.
- FR-005: Pilot must never direct users to standard Mainnet package installation
  commands. Show available Pilot Linux packages as direct downloads instead.
- FR-006: Add an independent Pilot endpoint override to JS site data and Nix builds.
- FR-007: Retain localized routes, modal verification, responsive grids and prefixes.

## Assumptions and entities

Pilot is one distribution containing Preview, Preprod and Mainnet Flight, rather
than three separately invented manifest schemas. As clarified on 2026-11-06,
both new manifest filenames share the existing Mainnet bucket; only Mainnet
falls back to the legacy filename until the new manifests are published.
No changes to installer contents, wallet storage, release publishing or hosting
are required. Live Pilot availability is not a prerequisite for rendering Mainnet.
The entities are a release channel, its manifest, and platform artifact entries
containing URL, version, signature and SHA256.

## Success criteria

Both localized pages offer both channels and explain isolation. Fixture-based
checks prove channel separation, both schema formats, package-only releases,
failure isolation and verification metadata. The static site and both Nix
packages build with the intended endpoint configuration.
