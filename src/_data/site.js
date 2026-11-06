module.exports = {
  title: 'Daedalus Wallet',
  year: new Date().getFullYear(),
  osanoSrc: process.env.GATSBY_OSANO || '',
  downloadEndpoint: process.env.DOWNLOAD_ENDPOINT ||
    'https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-mainnet.json',
  downloadFallbackEndpoint: process.env.DOWNLOAD_FALLBACK_ENDPOINT ||
    'https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-latest-version.json',
  pilotDownloadEndpoint: process.env.PILOT_DOWNLOAD_ENDPOINT ||
    'https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-pilot.json',
  reportsEndpoint: process.env.REPORTS_ENDPOINT ||
    'https://daedalus.se7enlabs.org/reports/index.json',
  medusaSrc: '//webdevm.iohk.io/',
}
