
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

const Title = ({ beta, title, subtitle, noteUrl, flightNoteUrl, noteLabel, flightNoteLabel }) => (
  <div id='browser-testing-download-component-title-container'>
    <Heading>
      {title}
      {beta ? ' Daedalus Flight' : ''}
    </Heading>
    <Subtitle>
      {subtitle}
    </Subtitle>
    {!beta
      ? <ReleaseNotes>
        <ReleaseNotesLink href={noteUrl}>{noteLabel}</ReleaseNotesLink>
      </ReleaseNotes>
      : <ReleaseNotes>
        <ReleaseNotesLink href={flightNoteUrl}>{flightNoteLabel}</ReleaseNotesLink>
      </ReleaseNotes>
    }
  </div>
)

Title.propTypes = {
  beta: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  noteUrl: PropTypes.string,
  flightNoteUrl: PropTypes.string,
  noteLabel: PropTypes.string,
  flightNoteLabel: PropTypes.string
}

export default Title