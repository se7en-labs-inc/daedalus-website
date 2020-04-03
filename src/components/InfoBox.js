import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Triangle from '/TriangleSeperator'

const Container = styled.div`
  width: 100%;
  padding: 5rem;
  background-color: ${({ theme }) => theme.background.overlay05};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-align: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
    width: 12rem;
    color: ${({ theme }) => theme.palette.secondary.contrastText};
  }
`



const Body = styled.div`
  color: ${({ theme }) => theme.background.overlay05};
`

const InfoBox = ({ title, children }) => (
  <Container>
    <Triangle />
    <h3>{title}</h3>
    <Body>
      {children}
    </Body>
  </Container>
)

InfoBox.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default InfoBox
