import React from 'react'
import styled from 'styled-components'
import { ThemeConsumer } from '../../state'

const Container = styled.div`
  text-align: center;
`

const LogoImage = styled.img`
  margin: 0 0 1.6rem 0;
  width: 11rem;
`

const LogoText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.3rem;
  font-size: 2rem;
  text-transform: uppercase;

  span {
    font-weight: 600;
  }
`

const Logo = () => (
  <Container className='logo-container' id='browser-testing-header-logo-component'>
    <ThemeConsumer>
      {({ theme }) => (
        <LogoImage src={theme.images.daedalusLogo} alt='Daedalus logo' />
      )}
    </ThemeConsumer>
    <LogoText className='logo-text'>Daedalus <span>Wallet</span></LogoText>
  </Container>
)

export default Logo
