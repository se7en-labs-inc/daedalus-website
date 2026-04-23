{
  perSystem = {
    config,
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_20
        config.treefmt.build.wrapper
      ];

      shellHook = ''
        echo "Run: npm install && npm run develop"
        echo "Then open: http://localhost:8080"
      '';
    };
  };
}
