---
# Netlify identifier
title: En (English) download page content
content:
  title: Download
  subtitle:
    Download the latest version of Daedalus for your preferred operating system.
  cta_string: Download Daedalus
  pgp_download: Get Signature
  version_string: Version
  verify_signature: Verify signature instructions
  verify_checksum: Verify checksum instructions
  pgp_signature: PGP signature
  sha_256_checksum: SHA256 checksum
  warning:
    'Daedalus is available only as a PC (Microsoft Windows/Linux) and Apple Mac
    application, there is no mobile (Android/iOS) version of Daedalus.'
  release_notes:
    label: Release notes
    url: https://github.com/input-output-hk/daedalus/releases
  supported_platforms:
    heading: Operating Systems
    mac: macOS ≥10.15, 64-bit (Tahoe, Sequoia)
    win: Windows ≥10, 64-bit
    linux:
      aimed_at: Aimed at all Linux distributions
      tested_against:
        label:
          'Linux OS - any reasonably recent kernel, 64-bit. Linux OS has been
          tested against'
        linuxa: Debian-based
        linuxb: Arch-based
        linuxc: RPM-based
  recommended_hardware:
    heading: Recommended hardware requirements
    item1: 64-bit dual core processors
    item2: 24 GB of RAM (32GB of RAM is recommended)
    item3: 250-300 GB of free drive space (continuously growing)
    item4: Broadband Internet connection
  linux_deprecated: Legacy self-extracting installer — use a package manager instead
  linux_section:
    heading: Linux
    intro: >-
      Install via your system's package manager for automatic updates and GPG-verified
      packages, or download directly below.
    tabs:
      apt: Debian / Ubuntu
      yum: Fedora / RHEL
      arch: Arch Linux
      nixos: NixOS
    arch_note: 'Add to /etc/pacman.conf:'
    then_run: 'Then install:'
    nixos_note: 'Add to your flake.nix inputs and NixOS configuration:'
    direct_heading: Direct downloads
    direct_intro: Download the latest package for your distribution.
---
