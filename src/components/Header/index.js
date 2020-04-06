import React, { Fragment } from 'react'
import styled from 'styled-components'
import GlobalContentQuery from '../../queries/GlobalContentQuery'
import Language from '@input-output-hk/front-end-core-components/components/Language'
import {
  Container as MuiContainer,
  Hidden
} from '@material-ui/core'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import Medusa from './Medusa'
import OpenMedusa from './OpenMedusa'
import Logo from './Logo'
import Modal from '../Modal'

const Container = styled.header`
  width: 100%;
  position: relative;
`

const TopGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 7rem;
  top: 0;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
`

const BottomGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 7rem;
  bottom: 0;
  background: linear-gradient(to top, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primary} 100%);
`

const HeaderSpace = styled(MuiContainer)`
  height: 40rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const SubContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
`

const Wrapper = styled.div`
  width: 100%;
  height: 55.8rem;
  text-align: center;
`

const MainTitleLogo = styled.div`
  position: absolute;
  top: 6rem;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
`

const MedusaContainer = styled.div`
  position: absolute;
  width: 100%;
  opacity: 0.6;
  left: 0;
  top: 0;
`

const OpenMedusaContainer = styled.div`
  position: absolute;
  top: 23rem;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 600px) {
    top: 28rem;
  }
`

const Header = () => (
  <GlobalContentQuery
    render={(content) => (
      <Fragment>
        <Hidden only={[ 'md', 'lg', 'xl' ]}>
          <MobileNavigation navigation={content.navigation} />
        </Hidden>
        <Container>
          <HeaderSpace id='browser-testing-header-space' maxWidth='lg'>
            <Hidden only={[ 'xs', 'sm' ]}>
              <DesktopNavigation navigation={content.navigation} />
            </Hidden>
          </HeaderSpace>
          <SubContainer id='browser-testing-header-sub-container'>
            <Wrapper>
              <Language.Consumer>
                {({ key: lang, availableLanguages, setLang }) => (
                  <Fragment>
                    <MedusaContainer id='browser-testing-header-medusa-container'>
                      <Medusa fullScreen={false} lang={lang} />
                    </MedusaContainer>
                    <TopGradient />
                    <BottomGradient />
                    <OpenMedusaContainer>
                      <OpenMedusa name='header_medusa' />
                    </OpenMedusaContainer>
                    <Modal name='header_medusa' id='browser-testing-fullscreen-medusa-modal'>
                      <Medusa fullScreen lang={lang} />
                    </Modal>
                    <MainTitleLogo>
                      <Logo />
                    </MainTitleLogo>
                  </Fragment>
                )}
              </Language.Consumer>
            </Wrapper>
          </SubContainer>
        </Container>
      </Fragment>
    )}
  />
)

export default Header
