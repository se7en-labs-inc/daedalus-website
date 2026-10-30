{self, ...}: {
  perSystem = {pkgs, ...}: let
    mkSite = {
      pathPrefix ? "/",
      downloadEndpoint ? "https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-latest-version.json",
    }:
      pkgs.buildNpmPackage {
        pname = "daedaluswallet-io";
        version = "1.0.0";
        src = self;
        nodejs = pkgs.nodejs_26;
        npmDepsHash = "sha256-2V17nIOIl8cEH0ZkEju86sra7mYU+tivRp3KVBjnysU=";
        buildPhase = ''
          PATH_PREFIX=${pathPrefix} \
          DOWNLOAD_ENDPOINT=${downloadEndpoint} \
          npm run build
        '';
        installPhase = "cp -r _site $out";
      };
  in {
    packages.default = mkSite {};
    packages.preview = mkSite {
      pathPrefix = "/daedalus/site";
      downloadEndpoint = "https://cdn.dripdropz.io/daedalus/8.0/daedalus-latest-version.json";
    };
  };
}
