import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import spinner from '../../../resources/images/spinner.svg'

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  display: block;
  width: 100%;

  img {
    width: 100%;
    margin: 0;
    display: block;
    transform: rotate(0deg);
    animation: ${Rotate} ${({ spinTime }) => spinTime} linear infinite;
  }
`

const Spinner = ({ spinTime }) => (
  <Container spinTime={spinTime} className="browser-testing-spinner-component">
    <img src={spinner} alt="Daedalus" />
  </Container>
)

Spinner.propTypes = {
  spinTime: PropTypes.string,
}

Spinner.defaultProps = {
  spinTime: '240s',
}

export default Spinner
