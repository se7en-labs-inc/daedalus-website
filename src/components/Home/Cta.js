import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import Link from '@input-output-hk/front-end-core-components/'

const CTAContainer = styled.div`
  text-align: center;

  a {
    margin: 1rem;
    padding:0;
  }
`

const BigButtonText = styled(Button)`
  font-size: ${({ theme }) => theme.typography.bigFontSize}px;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  } 
`

const BigButtonTextSecondary = styled(BigButtonText)`
  &:hover {
    color: ${({ theme }) => theme.palette.secondary.contrastText};
  } 
`

const Cta = ({ learnLink, learn, supportLink, support }) => {
  return (
    <CTAContainer>
      <BigButtonText
        size='large'
        href={learnLink}
        id='browser-testing-learn-more-cta'
        tracking={{ label: 'home_cta_learn' }}
        component={Link}
        variant='contained'
        color='primary'
      >
        {learn}
      </BigButtonText>
      <BigButtonTextSecondary
        size='large'
        href={supportLink}
        variant='contained'
        color='secondary'
        id='browser-testing-support-cta'
        tracking={{ label: 'home_cta_support' }}
      >
        {support}
      </BigButtonTextSecondary>
    </CTAContainer>
  )
}

Cta.propTypes = {
  learnLink: PropTypes.string,
  learn: PropTypes.string,
  supportLink: PropTypes.string,
  support: PropTypes.string
}

export default Cta
