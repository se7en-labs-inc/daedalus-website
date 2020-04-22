import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled, { keyframes } from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { getBody, getScrollOffset, scrollTo, addEventListener, removeEventListener } from '../../helpers/dom'
import { getHashParam, setHashParam } from '../../helpers/url'
import { modalView } from '../../helpers/analytics'
import { Link } from '@input-output-hk/front-end-core-components'

const scaleIn = keyframes`
  0% {
    transform: scale(0.03, 0);
  }

  50% {
    transform: scale(0.03, 1);
  }

  100% {
    transform: scale(1, 1);
  }
`

const scaleOut = keyframes`
  0% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(0.03, 1);
  }

  100% {
    transform: scale(0.03, 0);
  }
`

const ModalContainer = styled.div`
  height: 100%;

  .modal-content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border: 0 solid ${({ theme }) => theme.palette.primary.main};
    border-top-width: 1.5rem;
    border-bottom-width: 1.5rem;
    @media (max-width:${({ theme }) => theme.breakpoints.values.sm}px) {
        border-top-width: 0.5rem;
        border-bottom-width: 0.5rem;
    }

    .modal-content-inner-wrapper {
      position: absolute;
      z-index: 1;
      top: -1.5rem;
      bottom: -1.5rem;
      width: 100%;
      border: 0 solid ${({ theme }) => theme.palette.primary.main};
      border-left-width: 1.5rem;
      border-right-width: 1.5rem;
      @media (max-width:${({ theme }) => theme.breakpoints.values.sm}px) {
        border-left-width: 0.5rem;
        border-right-width: 0.5rem;
      }
    }
  }

  .modal-content {
    transition: opacity 500ms ease-in-out;
    opacity: 1;
    height: 100%;
    ul, ol {
      list-style-position: outside;
    }
    ol {
      li {
        p {
          display:inline-block;
        }
      }
    }
  }

  .cardano-modal-leave {
    transform: scale(1);

    .modal-content {
      opacity: 0;
    }
  }

  .cardano-modal-enter {
    transform: scale(0);

    .modal-content {
      opacity: 0;
    }
  }

  .cardano-modal-enter-active {
    animation: ${scaleIn} 500ms ease-in-out;
    animation-iteration-count: 1;
  }

  .cardano-modal-leave-active {
    animation: ${scaleOut} 600ms ease-in-out;
    animation-delay: 500ms;
    animation-iteration-count: 1;
  }
`

const CloseContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  width: 15rem;
  height: 15rem;
  @media (max-width:${({ theme }) => theme.breakpoints.values.sm}px) {
    width: 8rem;
    height: 9rem;
  }
  border-radius: 7.5rem;
  transform: translate(50%, -40%);
  background-color: ${({ theme }) => theme.palette.primary.main};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 4rem;
    transform: translate(-100%, -10%);
    @media (max-width:${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size:3rem;
      top: 60%;
    }
  }
`

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    // Modal name for tracking
    name: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { renderModal: false, scrollPosition: getScrollOffset(), isVisible: getHashParam('modal') === props.name }
  }

  handleClose = (e) => {
    e.preventDefault()
    setHashParam('modal', '')
  }

  renderCloseComponent () {
    return (
      <CloseContainer>
        <Link href='#' onClick={this.handleClose} tracking={{ label: `modal_close_${this.props.name}` }}>
          <IoMdClose />
        </Link>
      </CloseContainer>
    )
  }

  trackView () {
    modalView(this.props.name)
  }

  onHashChange = () => {
    if (getHashParam('modal') === this.props.name && !this.state.isVisible) this.setState({ isVisible: true })
    if (getHashParam('modal') !== this.props.name && this.state.isVisible) this.setState({ isVisible: false })
  }

  componentDidMount () {
    this.setState({ renderModal: true })
    this.addEventListeners()
    if (this.state.isVisible) this.trackView()
  }

  componentWillUnmount () {
    this.removeEventListeners()
  }

  onScroll = () => {
    if (!this.state.isVisible) this.setState({ scrollPosition: getScrollOffset() })
    if (this.state.isVisible) scrollTo(this.state.scrollPosition)
  }

  addEventListeners () {
    addEventListener('hashchange', this.onHashChange)
    addEventListener('touchmove', this.onScroll)
    addEventListener('scroll', this.onScroll)
  }

  removeEventListeners () {
    removeEventListener('hashchange', this.onHashChange)
    removeEventListener('touchmove', this.onScroll)
    removeEventListener('scroll', this.onScroll)
  }

  componentDidUpdate (_, prevState) {
    if (this.state.isVisible && !prevState.isVisible) this.trackView()
  }

  render () {
    if (!this.state.renderModal) return null
    return createPortal((
      <ModalContainer id={this.props.id}>
        <ReactCSSTransitionGroup
          transitionName='cardano-modal'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1000}
        >
          {this.state.isVisible &&
            <div className='modal-content-wrapper' key='modal-content-wrapper'>
              <div className='modal-content-inner-wrapper'>
                {this.renderCloseComponent()}
                <div className='modal-content'>
                  {this.props.children}
                </div>
              </div>
            </div>
          }
        </ReactCSSTransitionGroup>
      </ModalContainer>
    ), getBody())
  }
}
