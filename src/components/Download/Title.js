
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

const Title = ({ walletType, walletTypeTitle, title, subtitle, noteUrl, flightNoteUrl, catalystNoteUrl, noteLabel, flightNoteLabel, catalystNoteLabel }) => (
  <div id='browser-testing-download-component-title-container'>
    <Heading>
      {(walletType === 'normal') ? title : walletTypeTitle}
    </Heading>
    <Subtitle>
      {subtitle} {walletType}
    </Subtitle>
    {(walletType === 'normal') &&
      <ReleaseNotes>
        <ReleaseNotesLink href={noteUrl}>{noteLabel}</ReleaseNotesLink>
      </ReleaseNotes>
    }
    {(walletType === 'flight') &&
      <ReleaseNotes>
        <ReleaseNotesLink href={flightNoteUrl}>{flightNoteLabel}</ReleaseNotesLink>
      </ReleaseNotes>
    }
    {(walletType === 'catalyst') &&
      <ReleaseNotes>
        {(catalystNoteUrl !== '#')
          ? <ReleaseNotesLink href={catalystNoteUrl}>{catalystNoteLabel}</ReleaseNotesLink>
          : <h5>No notes link yet</h5>
        }
      </ReleaseNotes>
    }
  </div>
)

Title.propTypes = {
  walletType: PropTypes.string,
  walletTypeTitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  noteUrl: PropTypes.string,
  flightNoteUrl: PropTypes.string,
  catalystNoteUrl: PropTypes.string,
  noteLabel: PropTypes.string,
  flightNoteLabel: PropTypes.string,
  catalystNoteLabel: PropTypes.string
}

export default Title