import React from 'react'
import App from './src/App'
import Root from './src/Root'

export const wrapPageElement = App
export const wrapRootElement = Root

const OSANO_SRC = process.env.GATSBY_OSANO

export function onRenderBody({ setHeadComponents }) {
  const scripts = []
  if (OSANO_SRC) {
    scripts.unshift(<script key="osano" src={OSANO_SRC} />)
  }

  setHeadComponents(scripts)
}
