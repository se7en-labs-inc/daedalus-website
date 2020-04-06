import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import TeamPageQuery from '../queries/TeamPageQuery'

export default () => (
  <TeamPageQuery
    render={(content) => (
      <Layout>
        <Container maxWidth='lg'>
          <Box marginTop={6} marginBottom={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {content.team.map(({ member }) => (
                  <div key={member}>{member}</div>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    )}
  />
)
