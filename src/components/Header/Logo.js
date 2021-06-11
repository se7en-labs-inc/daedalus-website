import React from 'react'
import styled from 'styled-components'

import DaedalusLogo from '../../../static/images/daedalus-logo-netlify.svg'

const Container = styled.div`
  text-align: center;
`

const LogoImage = styled.img`
  width: 11rem;
`

const LogoText = styled.p`
  color: ${({ theme }) => theme.palette.text.hilight};
  letter-spacing: 0.3rem;
  font-size: 2rem;
  text-transform: uppercase;

  span {
    font-weight: 600;
  }
`

const Logo = () => (
  <Container
    className="logo-container"
    id="browser-testing-header-logo-component"
  >
    <LogoImage src={DaedalusLogo} alt="Daedalus logo" />
    <LogoText className="logo-text">
      Daedalus <span>Wallet</span>
    </LogoText>
  </Container>
)

export default Logo
