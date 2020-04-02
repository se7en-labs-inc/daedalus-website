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

// const MainTitle = styled.h1`
//   max-width: 60rem;
//   margin: 0 auto 0.2rem auto;
// `

const SubTitle = styled.h2`
  /* color: ${({ theme }) => theme.colors.secondaryText}; */
  margin-top: 1.8rem;
`

const Title = ({ title, subtitle }) => (
  <Container>
    <Typography
      variant='h1'
    >
      {title}
    </Typography>
    <SubTitle>{subtitle}</SubTitle>
  </Container>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default Title
