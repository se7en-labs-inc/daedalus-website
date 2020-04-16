import React from 'react'
import Select from '@material-ui/core/Select'
import { Box, Grid } from '@material-ui/core'
import styled from 'styled-components'
import Language from '@input-output-hk/front-end-core-components/components/Language'
// import GlobalContentQuery from '../queries/GlobalContentQuery'

const StyledSelect = styled(Box)`
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export default () => (
  <Language.Consumer>
    {({ key: lang, availableLanguages, setLang }) => (
      <Grid container className='select-lang'>
        {/* <Grid item xs={6}>
          <GlobalContentQuery
            render={(content) => (
              <label>{content.select_language}</label>
            )}
          />
        </Grid> */}
        <StyledSelect>
          <Select
            value={lang}
            onChange={e => setLang(e.target.value)}
            native
          >
            {availableLanguages.map(language => (
              <option key={language.key} value={language.key}>
                {language.flag} {language.label}
              </option>
            ))}
          </Select>
        </StyledSelect>
      </Grid>
    )}
  </Language.Consumer>
)
