import React from 'react'
import Query from './Query'
import styled from 'styled-components'
import Markdown from '../Markdown'

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-weight: 300;
  position: relative;
  margin-top: 5rem;
`

const Title = styled.h1`
  max-width: 100%;
  margin: 4rem auto 0.2rem auto;
`

const Content = styled(Markdown)`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: 1.8rem;
`

export default () => (
  <Query
    render={(markdown) => (
      <Container>
        <Title>{markdown.frontmatter.use.title}</Title>
        <Content>{markdown.frontmatter.use.content}</Content>
        <Title>{markdown.frontmatter.feedback.title}</Title>
        <Content>{markdown.frontmatter.feedback.content}</Content>
      </Container>
    )}
  />
)
