import React from 'react'
import PropTypes from 'prop-types'
import DownloadPageQuery from '../queries/DownloadPageQuery'
import Container from '@material-ui/core/Container'
import Layout from '../components/Layout'
import Title from '../components/Download/Title'
import OSColumn from '../components/Download/OSColumn'
import styled from 'styled-components'
import Loader from '../components/Loader'

import { FaCogs } from 'react-icons/fa'

const Columns = styled.div`
  width: 100%;
  text-align: center;
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
// common, os, error, loading
const Download = ({ beta = false }) => (
  <DownloadPageQuery
    beta={beta}
    render={({ common, os, error, loading }) => (
      <Layout>
        <Container maxWidth='lg'>
          {console.log('downloadContent common', common)}
          {console.log('downloadContent os', os)}
          <Title
            beta={beta}
            title={common.frontmatter.content.title}
            subtitle={common.frontmatter.content.subTitle}
            noteUrl={common.frontmatter.content.release_notes.url}
            flightNoteUrl={common.frontmatter.content.release_notes_flight.url}
            noteLabel={common.frontmatter.content.release_notes.label}
            flightNoteLabel={common.frontmatter.content.release_notes_flight.label}
          />
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
          }
        </Container>
      </Layout>
    )}
  />
)

Download.propTypes = {
  beta: PropTypes.bool
}

export default Download
