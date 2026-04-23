{ perSystem = { pkgs, ... }:
  let
    mkSite = pathPrefix: pkgs.buildNpmPackage {
      pname = "daedaluswallet-io";
      version = "1.0.0";
      src = pkgs.lib.cleanSource ./../..;
      npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      # Placeholder: run `nix build` once, paste the correct hash from error output
      buildPhase = "PATH_PREFIX=${pathPrefix} npm run build";
      installPhase = "cp -r _site $out";
    };
  in {
    packages.default = mkSite "/";
    # Build for a subdirectory:  nix build .#preview
    # packages.preview = mkSite "/daedalus/";
  };
}
