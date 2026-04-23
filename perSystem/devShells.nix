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

      # Gatsby v2 uses webpack 4 which has OpenSSL compatibility issues with
      # Node 17+. This sets the legacy provider as a fallback if not already set.
      shellHook = ''
        export NODE_OPTIONS="''${NODE_OPTIONS:---openssl-legacy-provider}"
        echo "Run: npm install && npm run develop"
        echo "Then open: http://localhost:8000"
      '';
    };
  };
}
