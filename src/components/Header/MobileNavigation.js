import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from '@input-output-hk/front-end-core-components'
import { MdMenu, MdClose } from 'react-icons/md'
import { addEventListener, removeEventListener, getScrollOffset, scrollTo } from '../../helpers/dom'

const Container = styled.div`
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 4;
  left: 0;
  
  .toggle-menu {
    position:absolute;
    z-index:5;
    top:1rem;
    right:1rem;
    height:3.2rem;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 3.4rem;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 6rem;
  height: 100vh;
  width: 100%;
  position:relative;
  transform: translate(0, 0);
  background-color: ${({ theme }) => theme.palette.secondary.main};
  z-index:2;
  width:100%;
  padding:0 1rem;
  position: absolute;
  overflow: scroll;

  > ul {
    margin-top: 5rem;
    list-style: none;

    > li {
      margin: 2rem 0;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      flex: 1;
      font-weight: 600;
      font-size: 2rem;
      letter-spacing: 0.1em;

      &:hover,
      &.active,
      &:focus {
        color: ${({ theme }) => theme.palette.text.primary}
      }
    }
  }

  &.mobileNav-enter {
    transition: transform 0.5s ease-in-out;
    transform: translate(0, -100vh);
  }

  &.mobileNav-leave {
    transition: transform 0.35s ease-in;
    transform: translate(0, 0);
  }

  &.mobileNav-enter-active {
    transform: translate(0, 0);
  }

  &.mobileNav-leave-active {
    transform: translate(0, -100vh);
  }
`

const MobileNavigation = ({ navigation }) => {
  const [ scrollPosition, setScrollPosition ] = useState(getScrollOffset())
  const [ mobileNavVisible, setMobileNavVisible ] = useState(false)

  const toggleMobileNav = e => {
    e.preventDefault()
    setMobileNavVisible(!mobileNavVisible)
  }

  const closeNav = e => {
    e.preventDefault()
    setMobileNavVisible(false)
  }

  const onScroll = () => {
    if (!mobileNavVisible) setScrollPosition(getScrollOffset())
    if (mobileNavVisible) scrollTo(scrollPosition)
  }

  const addEventListeners = () => {
    addEventListener('touchmove', onScroll)
    addEventListener('scroll', onScroll)
  }

  const removeEventListeners = () => {
    removeEventListener('touchmove', onScroll)
    removeEventListener('scroll', onScroll)
  }

  useEffect(() => {
    removeEventListeners()
    addEventListeners()

    return () => {
      removeEventListeners()
    }
  }, [ mobileNavVisible ])

  return (
    <Container>
      <Fragment>
        <Link
          href='/'
          onClick={toggleMobileNav}
          id='browser-testing-toggle-navigation'
          className='toggle-menu'
          tracking={{ label: `mobile_navigation_${mobileNavVisible ? 'close' : 'open'}` }}
        >
          {!mobileNavVisible && <MdMenu id='browser-testing-toggle-collapsed' />}
          {mobileNavVisible && <MdClose id='browser-testing-toggle-expanded' />}
        </Link>
        <ReactCSSTransitionGroup
          transitionName='mobileNav'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={350}
        >
          {mobileNavVisible &&
            <Nav key='nav'>
              <ul>
                <li>
                  <Link
                    onClick={closeNav}
                    href='/'
                    activeClassName='active'
                    id='browser-testing-navigation-link-home'
                    tracking={{ label: 'mobile_navigation_home' }}
                  >
                    {navigation.labels.home}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNav}
                    href='/team/'
                    activeClassName='active'
                    id='browser-testing-navigation-link-team'
                    tracking={{ label: 'mobile_navigation_team' }}
                  >
                    {navigation.labels.team}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNav}
                    href='/download/'
                    activeClassName='active'
                    id='browser-testing-navigation-link-download'
                    tracking={{ label: 'mobile_navigation_download' }}
                  >
                    {navigation.labels.download}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeNav}
                    href='/flight/'
                    activeClassName='active'
                    id='browser-testing-navigation-link-flight'
                    tracking={{ label: 'mobile_navigation_flight' }}
                  >
                    {navigation.labels.beta}
                  </Link>
                </li>
              </ul>
            </Nav>
          }
        </ReactCSSTransitionGroup>
      </Fragment>
    </Container>
  )
}

MobileNavigation.propTypes = {
  navigation: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default MobileNavigation
