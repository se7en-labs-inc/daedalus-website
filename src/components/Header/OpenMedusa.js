import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { DiGithubBadge } from 'react-icons/di'
import { ModalTrigger } from '../Modal'

const expand = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }

  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`

const Container = styled.div`
  font-size: 3.5rem;
  border-radius: 2rem;
  line-height: 4.8rem;
  width: 4rem;
  height: 4rem;
  text-align: center;
  position: relative;

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
    z-index: -1;
    animation-name: ${expand};
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
    animation-duration: 2.5s;
  }

  &:after {
    width: 6rem;
    height: 6rem;
    border-radius: 3rem;
    background-color: ${({ theme }) => theme.palette.primary.main};
    transition: opacity 0.1s ease-in-out;
    animation-delay: 0.6s;
  }

  &:before {
    width: 8rem;
    height: 8rem;
    border-radius: 4rem;
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  .open-medusa {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

const OpenMedusa = ({ name }) => (
  <Container id="browser-testing-open-medusa-component">
    <ModalTrigger
      name={name}
      id="browser-testing-open-medusa-toggle"
      className="open-medusa"
    >
      <DiGithubBadge />
    </ModalTrigger>
  </Container>
)

OpenMedusa.propTypes = {
  name: PropTypes.string.isRequired,
}

export default OpenMedusa
