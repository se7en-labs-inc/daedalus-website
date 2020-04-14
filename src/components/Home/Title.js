import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  font-weight: 300;
  position: relative;
`

const MainTitle = styled(Typography)`
  max-width: 70rem;
  /* margin: 0 auto 0.2rem auto; */
`

const SubTitle = styled(Typography)`
  /* margin-top: 1.8rem; */
`

const Title = ({ title, subtitle }) => (
  <Container>
    {/* The inline style below removes horrid onload positioning issue */}
    <MainTitle variant='h1' style={{ margin: '0 auto' }}>
      {title}
    </MainTitle>
    <SubTitle variant='h4'>
      {subtitle}
    </SubTitle>
  </Container>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default Title
