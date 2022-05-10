import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '@input-output-hk/front-end-core-components'
import {
  get as getDaedalusData,
  getCached as getCachedDaedalusData,
} from '../../connectors/daedalusData'

const Container = styled.div`
  width: 100%;
  position: relative;
  top: 70%;
  text-align: center;
  width: 100%;
  z-index: 1;
`

const Nav = styled.nav`
  display: flex;
  width: 100%;
  margin: 0 auto;

  a {
    text-transform: uppercase;
    flex: 1;
    font-weight: 600;
    font-size: 0.9em;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.palette.text.hilight};
    &:hover,
    &.active,
    &:focus {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  .navGradients {
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    .gradLeft,
    .gradRight {
      opacity: 0.7;
      position: relative;
      top: -0.4rem;
      height: 0.1rem;
      min-width: 10vw;
    }
    .gradLeft {
      background: linear-gradient(
        270deg,
        ${({ theme }) => theme.palette.background.overlay05} 0,
        ${({ theme }) => theme.palette.background.overlay05} 65%,
        hsla(0, 0%, 100%, 0)
      );
    }
    .gradRight {
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.palette.background.overlay05} 0,
        ${({ theme }) => theme.palette.background.overlay05} 65%,
        hsla(0, 0%, 100%, 0)
      );
    }
  }

  > div > ul {
    > li {
      margin: 0;
      display: inline-block;
      padding: 0 1rem;
      position: relative;

      @media (max-width: 990px) {
        font-size: 80%;
        padding: 0 0.8rem;
      }

      &:before {
        left: 0;
        transform: translate(-50%, -50%);
      }

      &:after {
        right: 0;
        transform: translate(50%, -50%);
      }

      &:after,
      &:first-of-type:before,
      &:nth-child(2):before {
        display: block;
        position: absolute;
        content: '';
        width: 0.6rem;
        height: 0.6rem;
        background-color: ${({ theme }) => theme.palette.background.overlay05};
        top: 50%;
        border-radius: 0.3rem;
        z-index: 2;
      }
    }
  }
`

const NewFlightLabel = styled.label`
  position: relative;
  bottom: 0.5rem; 
  left: 0.2rem;
  font-size: 70%;
  color: #EE4B2B;
  font-weight: bold;
  
  ${({ showing }) => !showing && `
    display: none
  `}
`

const DesktopNavigation = ({ navigation }) => {
  const dropdownRef = createRef()
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const closeDropdown = () => setDropdownVisible(false)

  const documentClickHandler = (e) => {
    if (!dropdownRef.current) return
    if (!dropdownRef.current.contains(e.target)) closeDropdown()
  }

  useEffect(() => {
    if (!global.document) return
    if (dropdownVisible) {
      global.document.addEventListener('click', documentClickHandler)
    } else {
      global.document.removeEventListener('click', documentClickHandler)
    }

    return () => {
      global.document.removeEventListener('click', documentClickHandler)
    }
  }, [dropdownVisible])

  const [daedalusDownloadData, setDaedalusDownloadData] = useState(
    getCachedDaedalusData('normal'),
  )
  const [daedalusFlightData, setDaedalusFlightData] = useState(
    getCachedDaedalusData('flight'),
  )
  const [error, setError] = useState(null)
  useEffect(() => {
    const loadDownloadData = async () => {
      const [data, error] = await getDaedalusData('normal')
      if (error && !data) return setError(error)
      setDaedalusDownloadData(data)
    }

    const loadFlightData = async () => {
      const [data, error] = await getDaedalusData('flight')
      if (error && !data) return setError(error)
      setDaedalusFlightData(data)
    }

    loadDownloadData()
    loadFlightData()
  }, [])

  if (error) { console.log(error) }

  if (!daedalusDownloadData || !daedalusFlightData) return null

  const shouldShowLabel = () => {
    if (daedalusDownloadData.platforms.windows.version === daedalusFlightData.platforms.windows.version &&
      daedalusDownloadData.platforms.darwin.version === daedalusFlightData.platforms.darwin.version &&
      daedalusDownloadData.platforms.linux.version === daedalusFlightData.platforms.linux.version
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <Container>
      <Nav>
        <div className="navGradients">
          <div className="gradLeft" />
          <ul>
            <li>
              <Link
                href="/"
                activeClassName="active"
                id="browser-testing-navigation-link-home"
                tracking={{ label: 'desktop_navigation_home' }}
              >
                {navigation.labels.home}
              </Link>
            </li>
            <li>
              <Link
                href="/team/"
                activeClassName="active"
                id="browser-testing-navigation-link-team"
                tracking={{ label: 'desktop_navigation_team' }}
              >
                {navigation.labels.team}
              </Link>
            </li>
            <li>
              <Link
                href="/download/"
                activeClassName="active"
                id="browser-testing-navigation-link-download"
                tracking={{ label: 'desktop_navigation_download' }}
              >
                {navigation.labels.download}
              </Link>
              <NewFlightLabel showing={!shouldShowLabel()}>NEW</NewFlightLabel>
            </li>
            <li>
              <Link
                href="/flight/"
                activeClassName="active"
                id="browser-testing-navigation-link-flight"
                tracking={{ label: 'desktop_navigation_flight' }}
              >
                {navigation.labels.flight}
              </Link>
                <NewFlightLabel showing={shouldShowLabel()}>NEW</NewFlightLabel>
            </li>
          </ul>
          <div className="gradRight" />
        </div>
      </Nav>
    </Container>
  )
}

DesktopNavigation.propTypes = {
  navigation: PropTypes.shape(PropTypes.arrayOf(PropTypes.string).isRequired)
    .isRequired,
}

export default DesktopNavigation
