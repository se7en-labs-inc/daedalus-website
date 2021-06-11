import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import TosPageQuery from '../queries/TosPageQuery'
import Markdown from '../components/Markdown'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  h2 {
    display: inline-block;
    width: 100%;
  }
  p {
    display: initial;
  }
  ol,
  ul {
    list-style-position: outside;
  }
  ol li {
    padding-left: 1rem;
  }
  li {
    margin-bottom: 2rem;
  }
`

export default () => (
  <TosPageQuery
    render={(content) => (
      <Layout>
        <StyledContainer maxWidth="lg">
          <Box marginTop={6} marginBottom={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Markdown source={content.default_content} />
              </Grid>
            </Grid>
          </Box>
        </StyledContainer>
      </Layout>
    )}
  />
)
