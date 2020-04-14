
/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import ContentQuery from './ContentQuery'
import { makeTransparent } from '../../helpers/color'

const Title = styled.h3`
  text-align: center;
`

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => makeTransparent(theme.colors.text, 0.5)};
  margin-bottom:0.2rem;
`
const ReleaseNotes = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`
const ReleaseNotesLink = styled.a`
  text-align: center;
`

export default (beta) => (
  <ContentQuery
    render={({ common }) => (
      <div id='browser-testing-download-component-title-container'>
        <Title>
          {common.frontmatter.content.title}
          {' '}
          {beta.beta ? 'Daedalus Flight' : ''}
        </Title>
        <Subtitle>
          {common.frontmatter.content.subtitle}
        </Subtitle>
        {!beta.beta
          ? <ReleaseNotes>
              <ReleaseNotesLink href={common.frontmatter.content.release_notes.url}>{common.frontmatter.content.release_notes.label}</ReleaseNotesLink>
            </ReleaseNotes>
          : <ReleaseNotes>
              <ReleaseNotesLink href={common.frontmatter.content.release_notes_flight.url}>{common.frontmatter.content.release_notes_flight.label}</ReleaseNotesLink>
            </ReleaseNotes>
        }
      </div>
    )}
  />
)
