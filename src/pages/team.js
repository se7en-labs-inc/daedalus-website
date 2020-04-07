import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import TeamPageQuery from '../queries/TeamPageQuery'
import Member from '../components/Member.js'

export default () => (
  <TeamPageQuery
    render={(content) => (
      <Layout>
        <Container maxWidth='lg'>
          <Box marginTop={6} marginBottom={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {content.team.map(({ member, twitter, linkedin, github, iohkProfile, location, jobTitle, imagePath, description }) => (
                  <Member
                    key={member}
                    member={member}
                    twitter={twitter}
                    linkedin={linkedin}
                    github={github}
                    iohkProfile={iohkProfile}
                    location={location}
                    jobTitle={jobTitle}
                    imagePath={imagePath}
                    description={description}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    )}
  />
)
