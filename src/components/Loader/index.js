import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import Spinner from '../Spinner'

const Pulse = keyframes`
  0% {
    transform: scale(0.7, 0.7);
  }

  50% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(0.7, 0.7);
  }
`

const Container = styled.div`
  position: relative;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    > div {
      transform: scale(0.7, 0.7);
      animation: ${Pulse} 2s ease-in-out infinite;
    }
  }
`

const Loader = ({ size }) => (
  <Container size={size} className='browser-testing-loader-component'>
    <div>
      <Spinner spinTime='8s' />
    </div>
  </Container>
)

Loader.propTypes = {
  size: PropTypes.number
}

Loader.defaultProps = {
  size: 20
}

export default Loader
