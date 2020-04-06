import { triggerEvent } from './dom'
import config from '../config'

const window = global.window || { location: { pathname: '/', href: '', origin: '', hash: '', hostname: '' }, history: {} }

export const getURIPath = () => window.location.pathname
export const getURIPathWithoutLang = lang => getURIPath().replace(new RegExp(`^\\/${lang}`), '')
export const languageSetInURL = () => config.availableLanguages[getURIPath().split('/').splice(1)[0]]
export const getHref = (path = null) => path ? `${window.location.origin}${path}` : window.location.href
export const setHref = href => (window.location.href = href)
export const isRelative = url => !url.match(/^(\/\/|https?:\/\/|mailto:)/)
export const isPath = url => !url.match(/^\/[^\\/]/)
export const getHash = () => window.location.hash
export const getHostname = () => window.location.hostname

const getHashParams = () => {
  const currentHash = getHash().replace(/^#/, '')
  const params = currentHash.split('&').map(p => ({ [p.split('=')[0]]: p.split('=')[1] }))
  let paramsObj = {}
  params.forEach(p => (paramsObj = { ...paramsObj, ...p }))
  return paramsObj
}

export const setHashParam = (key, value) => {
  const params = getHashParams()
  if (!value) {
    delete params[key]
  } else {
    params[key] = value
  }

  const paramStrings = Object.keys(params).map(k => params[k] && k ? `${k}=${params[k]}` : '').filter(v => !!v)
  if (paramStrings.length > 0) {
    if (window.history.pushState) {
      window.history.pushState(null, null, `#${paramStrings.join('=')}`)
      triggerEvent({ type: 'hashchange' })
    } else {
      window.location.hash = `#${paramStrings.join('=')}`
    }
  } else {
    if (window.history.pushState) {
      window.history.pushState(null, null, '#')
      triggerEvent({ type: 'hashchange' })
    } else {
      window.location.hash = ''
    }
  }
}

export const getHashParam = key => {
  return getHashParams()[key] || ''
}
