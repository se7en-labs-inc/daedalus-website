import React from 'react'
import styled from 'styled-components'

const Triangle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-width: 2.6rem 1.5rem 0 1.5rem;
  border-color: ${({ theme }) => theme.palette.primary.main} transparent
    transparent transparent;
  border-style: solid;
  width: 0;
  height: 0;

  &:after {
    content: '';
    border-width: 2.4rem 1.3rem 0 1.3rem;
    border-color: ${({ theme }) => theme.palette.background.default} transparent
      transparent transparent;
    border-style: solid;
    transform: translate(-50%, -2.5rem);
    left: 50%;
    position: absolute;
  }
`

export default () => <Triangle />
