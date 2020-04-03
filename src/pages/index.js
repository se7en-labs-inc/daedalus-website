import React from 'react'
// import Box from '@material-ui/core/Box'
// import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import IndexPageQuery from '../queries/IndexPageQuery'
import styled from 'styled-components'

import {
  Cta,
  Title
  
} from '../components/Home'
//Overview
// Features,
// FeaturesTitle

const CTAContainer = styled.div`
  margin-top: 3rem;
`

const SectionContainer = styled.div`
  position: relative;
  margin-top: 6rem;

  @media screen and (max-width: 900px) {
    margin-top: 10rem;
  }

  @media screen and (max-width: 500px) {
    margin-top: 8rem;
  }
`

// const SpinnerInnerContainer = styled.div`
//   position: absolute;
//   transform: translate(-50%, -50%);
//   z-index: -1;
//   opacity: 0.6;
//   margin-top: 6.5rem;
//   max-width: 90rem;
//   left: 50%;
// `

export default () => (
  <IndexPageQuery
    render={(content) => (
      <Layout>
        {console.log(content)}
        {/* <Container maxWidth='lg'>
          <Box marginTop={6} marginBottom={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p>FOO BAR</p>
              </Grid>
            </Grid>
          </Box>
        </Container> */}

        <section id='browser-testing-cta-section'>
          <Title
            title={content.title}
            subtitle={content.subtitle}
          />
          <CTAContainer>
            <Cta
              learnLink={content.cta.learn_link}
              learn={content.cta.learn}
              supportLink={content.cta.support_link}
              support={content.cta.support}
            />
          </CTAContainer>
        </section>
        {/* <section id='browser-testing-overview-section'>
          <SectionContainer>
            <Overview title={content.overview.title} conrtent={content.overview.content}/>
          </SectionContainer>
        </section> */}
        {/* <section id='browser-testing-features-section'>
          <FeaturesTitle />
          <SectionContainer>
            <SpinnerInnerContainer>
              <Spinner />
            </SpinnerInnerContainer>
          </SectionContainer>
          <SectionContainer>
            <Features />
          </SectionContainer>
        </section> */}
      </Layout>
    )}
  />
)
