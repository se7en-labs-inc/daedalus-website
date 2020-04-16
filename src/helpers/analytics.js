import ReactGA from 'react-ga'
import config from '../config'
import { getDocumentHeight, getDocumentWidth } from './dom'
import { getHashParam, getHostname } from './url'

const options = {
  debug: process.env.NODE_ENV !== 'production',
  titleCase: false,
  gaOptions: { cookieDomain: getHostname(), cookieName: 'gaDaedalus' }
}

ReactGA.initialize(config.ga.trackingID, options)

/**
 * Tracks a page view
 *
 * @param {String} path Path to the page
 */
export const pageView = (path) => {
  try {
    ReactGA.pageview(path)
  } catch (error) {
    console.error({
      description: 'Failed to track page view',
      args: [ path ],
      error
    })
  }
}

/**
 * Tracks a modal view
 *
 * @param {String} name Name of the modal
 */
export const modalView = (name) => {
  try {
    ReactGA.modalview(name)
  } catch (error) {
    console.error({
      description: 'Failed to track modal view',
      args: [ name ],
      error
    })
  }
}

/**
 * Event triggered by users action
 *
 * @param {String} category Generic category
 * @param {String} action The action taken
 * @param {String} label (optional) Further categorisation
 * @param {Integer} value (optional) if value is a number then set here
 */
export const capture = ({ category, action, label, value }) => {
  try {
    ReactGA.event({ category, action, label, value })
  } catch (error) {
    console.error({
      description: 'Failed to track capture',
      args: [ { category, action, label, value } ],
      error
    })
  }
}

const getRelativeCoordinates = (event) => {
  const documentHeight = getDocumentHeight()
  const documentWidth = getDocumentWidth()
  if (documentHeight === null || documentWidth === null) return
  return {
    x: (event.pageX / documentWidth).toFixed(2),
    y: (event.pageY / documentHeight).toFixed(2),
    modal: getHashParam('modal')
  }
}

/**
 * Click event
 *
 * @param {String} category Generic category
 * @param {String} label (optional) Further categorisation
 * @param {Event} event (optional) Click event
 */
export const click = ({ category, label, event }) => {
  try {
    capture({ category, label, action: 'click' })
    if (event) {
      const relativeCoordinates = getRelativeCoordinates(event)
      if (relativeCoordinates) capture({ category, label: JSON.stringify(relativeCoordinates), action: 'click_coordinates' })
    }
  } catch (error) {
    console.error({
      description: 'Failed to track click',
      args: [ { category, label } ],
      error
    })
  }
}

/**
 * Event not triggered by a user action
 *
 * @param {String} category Generic category
 * @param {String} action The action taken
 * @param {String} label (optional) Further categorisation
 * @param {Integer} value (optional) if value is a number then set here
 */
export const autoCapture = ({ category, action, label, value }) => {
  try {
    ReactGA.event({ category, action, label, value, nonInteraction: true })
  } catch (error) {
    console.error({
      description: 'Failed to track auto capture',
      args: [ { category, action, label, value } ],
      error
    })
  }
}

/**
 * Captures a timing
 *
 * @param {String} category Generic category of timing, e.g. network_requests
 * @param {String} label (optional) further categorisation
 * @param {Integer} value Time in ms
 * @param {String} variable Name of the timing variable
 */
export const timing = ({ category, label, value, variable }) => {
  try {
    ReactGA.timing({ category, label, value, variable })
  } catch (error) {
    console.error({
      description: 'Failed to track timing',
      args: [ { category, label, value, variable } ],
      error
    })
  }
}

/**
 * Tracks an exception
 *
 * @param {String} description Description of the exception
 * @param {Boolean} fatal Was the exception fatal?
 * @param {Array} args Args on the function which threw the error
 * @param {Error} error The exception (error) object
 */
export const exception = ({ description, fatal, args, error }) => {
  try {
    ReactGA.exception({ description, fatal })
  } catch (err) {
    console.error('failed to track exception', [ { description, fatal, args, error } ], err)
  }
}
