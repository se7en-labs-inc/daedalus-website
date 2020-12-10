
/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Heading = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.hilight};
`

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => (theme.palette.background.overLay05)};
  margin-bottom:0.2rem;
`
const ReleaseNotes = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`
const ReleaseNotesLink = styled.a`
  text-align: center;
`

const Title = ({ title, subtitle, noteUrl, noteLabel }) => (
  <div id='browser-testing-download-component-title-container'>
    <Heading>
    {title}
    </Heading>
    <Subtitle>
      {subtitle}
    </Subtitle>
    {(noteUrl !== '#') &&
      <ReleaseNotes>
        <ReleaseNotesLink href={noteUrl}>{noteLabel}</ReleaseNotesLink>
      </ReleaseNotes>
    }
  </div>
)

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  noteUrl: PropTypes.string,
  noteLabel: PropTypes.string
}

export default Title