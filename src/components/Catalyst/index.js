import React from 'react'
import CatalystPageQuery from '../../queries/CatalystPageQuery'
import { Container } from '@material-ui/core'
import styled from 'styled-components'
import Markdown from '../Markdown'

const Kontainer = styled(Container)`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-weight: 300;
  position: relative;
  margin-bottom: 10rem;
`

const Title = styled.h1`
  max-width: 100%;
  margin: 0 auto 0.2rem auto;
  color: ${({ theme }) => theme.palette.text.hilight};
`

const Subtitle = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.palette.text.hilight};
  margin-top: 1.8rem;
`

const Content = styled(Markdown)`
  margin-top: 1.8rem;
`

export default () => (
  <CatalystPageQuery
    render={data => (
      <Kontainer maxWidth='md'>
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
        <Content>{data.content}</Content>
      </Kontainer>
    )}
  />
)
