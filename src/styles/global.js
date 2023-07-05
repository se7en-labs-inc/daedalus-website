import { createGlobalStyle } from 'styled-components'
import { osanoStyling, osanoVariables } from './osano'

export default createGlobalStyle`
  ${osanoStyling}
  
  :root {
    ${osanoVariables}
  }
`
