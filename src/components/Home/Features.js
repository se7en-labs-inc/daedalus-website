import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from '@input-output-hk/front-end-core-components'
// import { GiWallet, GiVibratingShield, GiDesk, GiNewspaper, GiAbstract011 } from 'react-icons/gi'

import WalletIcon from '../../../static/images/daedalus_wallet.svg'
import DesktopIcon from '../../../static/images/daedalus_desktop.svg'
import NewsIcon from '../../../static/images/daedalus_news.svg'
import SecurityIcon from '../../../static/images/daedalus_security.svg'
import ThemeIcon from '../../../static/images/daedalus_theme.svg'

const Container = styled.div`
  position: relative;
  padding-bottom: 1rem;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
  }

  &:after {
    border-right: 0.1rem dashed ${({ theme }) => theme.palette.text.primary};
    left: 50%;
    height: 100%;
    top: 0;
    transform: translateX(-50%);
  }

  &:before {
    border-radius: 0.9rem;
    width: 1.8rem;
    height: 1.8rem;
    border: 0.1rem solid ${({ theme }) => theme.palette.text.primary};
    left: 50%;
    transform: translate(-50%, -50%);
    top: 6rem;
  }

  > div {
    display: inline-block;
    position: relative;
    width: 50%;
    box-sizing: border-box;
    padding: 0rem 12rem;
    vertical-align: top;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }
  }

  h3 {
    text-transform: uppercase;
    margin-top: 5rem;
    margin-bottom: 3.5rem;
    position: relative;

    &:after,
    &:before {
      content: '';
      position: absolute;
      display: block;
    }

    &:before {
      border-radius: 0.4rem;
      background-color: ${({ theme }) => theme.palette.primary.main};
      width: 0.8rem;
      height: 0.8rem;
      top: 50%;
    }

    &:after {
      top: 50%;
      border: 0.1rem solid ${({ theme }) => theme.palette.primary.main};
      width: 8.8rem;
    }
  }

  @media screen and (max-width: 900px) {
    &:before,
    &:after {
      display: none;
    }

    > div {
      display: block;
      width: 100%;
      padding: 0;
    }

    h3 {
      &:before,
      &:after {
        display: none;
      }
    }
  }
`

const FeaturesWrap = styled.div`
  h3 {
    &:before {
      transform: translate(-100%, -50%);
      left: -2.8rem;
    }

    &:after {
      transform: translate(-100%, -50%);
      left: -3.2rem;
    }
  }

  h4 {
    display:flex;
    align-items: center;
    @media (max-width:899px) {
      justify-content: center;
    }

    span {
      font-size: 1.5rem;
      & ~ span {
        padding-left:2rem;
      }
    }
  }

  > div {
    margin-bottom: 5rem;

    img {
      display: block;
      width: 2.5em;
      height: 2.5em;
      margin-bottom: 0;
      color: ${({ theme }) => theme.palette.text.secondary};
    }

    h4 {
      text-transform: uppercase;
      margin-top: 4rem;

      &:first-of-type {
        margin-top: 0;
      }
    }
  }

  @media screen and (max-width: 900px) {
    text-align: center;
  }
`

const Features = ({ securityTitle, securityDesc, accountTitle, accountDesc, platformTitle, platformDesc, newsFeedTitle, newsFeedDesc, personalTitle, personalDesc }) => (
  <Container>
    <FeaturesWrap>
      <div>
        <h4>
          <span>
            <Image src={SecurityIcon} alt={securityTitle} />
          </span>
          <span>{securityTitle}</span>
        </h4>
        <p>
          {securityDesc}
        </p>
        <h4>
          <span>
            <Image src={WalletIcon} alt={accountTitle} />
          </span>
          <span>{accountTitle}</span>
        </h4>
        <p>
          {accountDesc}
        </p>
        <h4>
          <span>
            <Image src={DesktopIcon} alt={platformTitle} />
          </span>
          <span>{platformTitle}</span>
        </h4>
        <p>
          {platformDesc}
        </p>
      </div>
    </FeaturesWrap>
    <FeaturesWrap>
      {/* <h3>{frontmatter.content.wallet_features.title}</h3> */}
      <div>
        <h4>
          <span>
            <Image src={NewsIcon} alt={newsFeedTitle} />
          </span>
          <span>{newsFeedTitle}</span>
        </h4>
        <p>
          {newsFeedDesc}
        </p>
        <h4>
          <span>
            <Image src={ThemeIcon} alt={personalTitle} />
          </span>
          <span>{personalTitle}</span>
        </h4>
        <p>
          {personalDesc}
        </p>
      </div>
    </FeaturesWrap>
  </Container>
)

Features.propTypes = {
  securityTitle: PropTypes.string,
  securityDesc: PropTypes.string,
  accountTitle: PropTypes.string,
  accountDesc: PropTypes.string,
  platformTitle: PropTypes.string,
  platformDesc: PropTypes.string,
  newsFeedTitle: PropTypes.string,
  newsFeedDesc: PropTypes.string,
  personalTitle: PropTypes.string,
  personalDesc: PropTypes.string
}

export default Features
