{
  perSystem = {
    config,
    pkgs,
    ...
  }: {
    treefmt = {
      projectRootFile = "flake.nix";

      programs.alejandra.enable = true;
      programs.prettier.enable = true;

      settings.global.excludes = [
        "*.lock"
        ".gitattributes"
        ".gitignore"
        "resources/*"
      ];
    };

    formatter = config.treefmt.build.wrapper;
  };
}
