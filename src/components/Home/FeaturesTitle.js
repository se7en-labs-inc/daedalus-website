import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-weight: 300;
  position: relative;
`

const MainTitle = styled.h2`
  max-width: 60rem;
  margin: 6rem auto 0rem auto;
  text-transform: uppercase;
`

const FeaturesTitle = ({ featureTitle }) => (
  <Container>
    <MainTitle>{featureTitle}</MainTitle>
  </Container>
)

FeaturesTitle.propTypes = {
  featureTitle: PropTypes.string
}

export default FeaturesTitle