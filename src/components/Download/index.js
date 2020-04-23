import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Query from './Query'
import Container from '@material-ui/core/Container'
import Layout from '../../components/Layout'
import Title from './Title'
import OSColumn from './OSColumn'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import Flight from '../../components/Flight'

import { FaCogs } from 'react-icons/fa'

const Kontainer = styled(Container)`
  margin-bottom:9rem;
`

const Columns = styled.div`
  width: 100%;
  text-align: center;
  ul {
    list-style-position: outside;
  }
  li {
    text-align: left;
    max-width: 60rem;
    margin: 0 auto;
    ul {
      margin-left: 2rem;
    }
  }
`

const Column = styled.div`
  display: inline-block;
  width: 33%;
  box-sizing: border-box;
  padding: 2rem;

  @media screen and (max-width: 1000px) {
    text-align: left;
    width: 50%;
  }

  @media screen and (max-width: 700px) {
    text-align: left;
    width: 100%;
    max-width: 500px;
  }
`

const ErrorText = styled.p`
  text-align: center;
  margin-top: 4rem;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.warning};
  font-size: 20px;
  span {
    font-size:32px;
  }
`

const LoadingContainer = styled.div`
  margin-top: 4rem;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`
// render={({ common, os, error, loading }) => (
const Download = ({ beta = false }) => (
  <Query
    beta={beta}
    render={({ common, os, error, loading }) => (
      <Layout>
        <Kontainer maxWidth='lg'>
          {beta &&
            <Flight />
          }
          {common &&
            <Title
              beta={beta}
              title={common.frontmatter.content.title}
              subtitle={common.frontmatter.content.subtitle}
              noteUrl={common.frontmatter.content.release_notes.url}
              flightNoteUrl={common.frontmatter.content.release_notes_flight.url}
              noteLabel={common.frontmatter.content.release_notes.label}
              flightNoteLabel={common.frontmatter.content.release_notes_flight.label}
            />
          }
          {error &&
            <ErrorText id='browser-testing-download-error'>
              <span><FaCogs /></span><br />
              We're working on a new version of Daedalus {beta && `Flight`} right now. Please check back soon!
            </ErrorText>
          }
          {loading && !error &&
            <LoadingContainer key='loading-container'>
              <Loader />
            </LoadingContainer>
          }
          {!loading && !error &&
            <Fragment>
              <Columns>
                {Object.keys(os).map(key => (
                  <Column key={key}>
                    <OSColumn
                      common={common}
                      osData={os[key].osData}
                      checksum={os[key].checksum}
                      signature={os[key].signature}
                      beta={beta}
                    />
                  </Column>
                ))}
              </Columns>
              <Columns>
                <h4>{common.frontmatter.content.supported_platforms.heading}</h4>
                <ul>
                  <li>{common.frontmatter.content.supported_platforms.win}</li>
                  <li>{common.frontmatter.content.supported_platforms.mac}</li>
                  <li>Linux - {common.frontmatter.content.supported_platforms.linux.tested_against.label}:
                    <ul>
                      <li>{common.frontmatter.content.supported_platforms.linux.tested_against.linuxa}</li>
                      <li>{common.frontmatter.content.supported_platforms.linux.tested_against.linuxa}</li>
                      <li>{common.frontmatter.content.supported_platforms.linux.tested_against.linuxa}</li>
                    </ul>
                  </li>
                </ul>
              </Columns>
              <Columns>
                <h4>{common.frontmatter.content.recommended_hardware.heading}</h4>
                <ul>
                  <li>{common.frontmatter.content.recommended_hardware.item1}</li>
                  <li>{common.frontmatter.content.recommended_hardware.item2}</li>
                  <li>{common.frontmatter.content.recommended_hardware.item3}</li>
                  <li>{common.frontmatter.content.recommended_hardware.item4}</li>
                </ul>
              </Columns>
            </Fragment>
          }
        </Kontainer>
      </Layout>
    )}
  />
)

Download.propTypes = {
  beta: PropTypes.bool
}

export default Download
