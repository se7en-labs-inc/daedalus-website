---
# Netlify identifier
title: Ja (Japanese) download page content
content:
  title: ダウンロード
  subtitle: ご希望のOS用の最新バージョンのDaedalusをダウンロードしてください。
  cta_string: ダイダロスのダウンロード
  pgp_download: ダウンロード Signature
  version_string: バージョン
  verify_signature: 署名の検証
  verify_checksum: チェックサムの検証
  pgp_signature: PGP署名
  sha_256_checksum: SHA256 チェックサム
  warning:
    DaedalusはPC（Microsoft Windows/Linux）およびApple
    Macアプリケーションのみです。モバイル（Android/iOS）版はありません。
  release_notes:
    label: リリースノート
    url: https://github.com/input-output-hk/daedalus/releases
  supported_platforms:
    heading: オペレーティングシステム
    mac: macOS ≥10.15、64ビット（Tahoe、Sequoia）
    win: Windows ≥10、64ビット
    linux:
      aimed_at: すべてのLinuxディストリビューションをサポート予定です。
      tested_against:
        label: Linux OS - 比較的最近のカーネル、64ビット。動作確認済みLinux OS
        linuxa: Debian系
        linuxb: Arch系
        linuxc: RPM系
  recommended_hardware:
    heading: 推奨ハードウェア要件
    item1: 64ビットデュアルコアプロセッサー
    item2: 24GB RAM （32GB推奨）
    item3: 250～300GBの空きディスク容量（継続的に増加）
    item4: ブロードバンドインターネット接続
  linux_deprecated: 旧インストーラー — パッケージマネージャーの使用を推奨します
  linux_section:
    heading: Linux
    intro: >-
      パッケージマネージャーを使用してインストールすると、自動更新とGPG署名済みパッケージが利用できます。
      または下記から直接ダウンロードすることもできます。
    tabs:
      apt: Debian / Ubuntu
      yum: Fedora / RHEL
      arch: Arch Linux
      nixos: NixOS
    arch_note: '/etc/pacman.confに追加してください:'
    then_run: 'インストール:'
    nixos_note: 'flake.nixのinputsとNixOS設定に追加してください:'
    direct_heading: 直接ダウンロード
    direct_intro: お使いのディストリビューション向けの最新パッケージをダウンロードしてください。
---
