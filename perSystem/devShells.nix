{
  perSystem = {
    config,
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_26
        wrangler
        config.treefmt.build.wrapper
      ];

      shellHook = ''
        echo "Run: npm ci && npm run develop"
        echo "Then open: http://localhost:8080"
      '';
    };
  };
}
