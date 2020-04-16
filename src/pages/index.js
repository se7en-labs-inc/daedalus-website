import React from 'react'
// import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import IndexPageQuery from '../queries/IndexPageQuery'
import styled from 'styled-components'

import {
  Cta,
  Title,
  Overview,
  Features,
  FeaturesTitle
} from '../components/Home'

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

const SpinnerInnerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: -1;
  opacity: 0.6;
  margin-top: 6.5rem;
  max-width: 90rem;
  left: 50%;
`

export default () => (
  <IndexPageQuery
    render={(content) => (
      <Layout>
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
        <SectionContainer>
          <Container maxWidth='lg'>
            <Overview title={content.overview.title} content={content.overview.content} />
          </Container>
        </SectionContainer>
        <section id='browser-testing-features-section'>
          <FeaturesTitle featureTitle={content.wallet_features.title} />
          <SectionContainer>
            <SpinnerInnerContainer>
              <Spinner />
            </SpinnerInnerContainer>
          </SectionContainer>
          <SectionContainer>
            <Container maxWidth='lg'>
              <Features
                securityTitle={content.wallet_features.advanced_security.title}
                securityDesc={content.wallet_features.advanced_security.description}
                accountTitle={content.wallet_features.unlimited_accounting.title}
                accountDesc={content.wallet_features.unlimited_accounting.description}
                platformTitle={content.wallet_features.desktop_platforms.title}
                platformDesc={content.wallet_features.desktop_platforms.description}
                newsFeedTitle={content.wallet_features.newsfeed.title}
                newsFeedDesc={content.wallet_features.newsfeed.description}
                personalTitle={content.wallet_features.personalization.title}
                personalDesc={content.wallet_features.personalization.description}
              />
            </Container>
          </SectionContainer>
        </section>
      </Layout>
    )}
  />
)
