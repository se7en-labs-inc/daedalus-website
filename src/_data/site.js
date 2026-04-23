module.exports = {
  title: 'Daedalus Wallet',
  year: new Date().getFullYear(),
  osanoSrc: process.env.GATSBY_OSANO || '',
  downloadEndpoint: process.env.DOWNLOAD_ENDPOINT ||
    'https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-latest-version.json',
  medusaSrc: '//webdevm.iohk.io/',
}
