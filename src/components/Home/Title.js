import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Container = styled.div`
  /* color: ${({ theme }) => theme.colors.text}; */
  text-align: center;
  font-weight: 300;
  position: relative;
`

const MainTitle = styled(Typography)`
  max-width: 60rem;
  margin: 0 auto 0.2rem auto;
`

const SubTitle = styled(Typography)`
  /* color: ${({ theme }) => theme.colors.secondaryText}; */
  margin-top: 1.8rem;
`

const Title = ({ title, subtitle }) => (
  <Container>
      <MainTitle variant='h1'>
        {title}
      </MainTitle>
      <SubTitle variant='h2'>
        {subtitle}
      </SubTitle>
  </Container>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default Title
