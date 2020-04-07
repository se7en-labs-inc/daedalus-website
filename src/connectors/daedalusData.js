import logger from '../helpers/logger'
import { autoCapture, timing } from '../helpers/analytics'
import { XHR_RESPONSE, XHR_REQUEST, XHR_TIMING } from '../constants/analytics'

const getEndpoint = (beta) => (beta
  ? 'https://update-cardano-mainnet-flight.iohk.io/daedalus-latest-version.json'
  : 'https://s3-ap-northeast-1.amazonaws.com/update.cardano-mainnet.iohk.io/daedalus-latest-version.json'
)

const data = { cached: {} }

export const getCached = (beta) => data.cached[getEndpoint(beta)]

export const get = async (beta) => {
  try {
    autoCapture({ category: XHR_REQUEST, action: 'request_daedalus_data' })
    const startTime = Date.now()
    const endpoint = getEndpoint(beta)
    console.log(endpoint)
    const result = await window.fetch(`${endpoint}?date=${Math.floor(Date.now() / 1000)}`)
    timing({ category: XHR_TIMING, value: Date.now() - startTime, variable: 'daedalus_download_data' })
    const JSONRes = await result.json()
    data.cached[endpoint] = JSONRes
    autoCapture({ category: XHR_RESPONSE, action: 'received_daedalus_data' })
    return [ JSONRes, null ]
  } catch (error) {
    logger.error({
      description: 'error fetching latest Daedalus data',
      args: [],
      error
    })
    return [ getCached(beta), error ]
  }
}
