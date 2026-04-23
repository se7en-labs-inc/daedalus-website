{ perSystem = { pkgs, ... }: {
    packages.default = pkgs.buildNpmPackage {
      pname = "daedaluswallet-io";
      version = "1.0.0";
      src = pkgs.lib.cleanSource ./../..;
      npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      # Placeholder: run `nix build` once, paste the correct hash from error output
      buildPhase = "npm run build";
      installPhase = "cp -r _site $out";
    };
  };
}
