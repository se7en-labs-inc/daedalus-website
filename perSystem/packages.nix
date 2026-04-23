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
        npmDepsHash = "sha256-WXytD20TvQ/hsmbulKpbB5pWppG7Mp1R32QLnk6Yvj0=";
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
      downloadEndpoint = "https://cdn.dripdropz.io/daedalus/7.4/daedalus-latest-version.json";
    };
  };
}
