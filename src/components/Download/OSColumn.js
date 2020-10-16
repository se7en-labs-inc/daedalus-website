import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import Modal, { ModalTrigger } from '../Modal'
import { Link } from '@input-output-hk/front-end-core-components'
import { FiClipboard } from 'react-icons/fi'
import * as analytics from '@input-output-hk/front-end-core-libraries/build/analytics'

const window = global.window || { navigator: {} }

const Container = styled.div`
  text-align: center;

  .pgp-signature-verify {
    display: block;
    margin-top: 1rem;
  }

  .checksum-instructions,
  .pgp-signature-verify {
    color: ${({ theme }) => theme.colors.interactive};
  }

  Button {
    cursor:pointer;
  }

  a {
    font-size: 1.6rem;
    &:hover {
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }
    &.secondaryBtn {
      font-weight:300;
      &:hover {
        color: ${({ theme }) => theme.palette.secondary.contrastText};
      } 
    }
  }

  a.beta-btn {
    background: #ffb633;
    color: #121326;
    &:hover {
      background: #e59f27;
    }
  }
`

const Image = styled.img`
  width: 100%;
  max-width: 14rem;
`

const Title = styled.h4`
  margin-bottom: 1rem;
`

const Version = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin: 0 0 2rem;
  letter-spacing: 0.06rem;
`

const PGPSignatureTitle = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin: 2.5rem 0 0.5rem;
  letter-spacing: 0.06rem;
`

const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ModalTitle = styled.h2`
  margin: 0 auto;
  text-align: center;
  padding: 5rem 2rem;
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;
`

const ModalBodyWrapper = styled.div`
  flex: 1;
  overflow: scroll;
`

const ModalBody = styled.div`
  margin: 0 auto;
  padding: 0 2rem 5rem;
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;

  code {
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.palette.background.overlay01};
    display: block;
    font-size: 1.2rem;
  }

  ul,
  ol {
    margin-left: 2rem;
    max-width: 100%;

    li {
      max-width: 100%;
    }

    code {
      white-space: nowrap;
      overflow-x: scroll;
    }
  }
`

const TextArea = styled.textarea`
  font-size: 1.6rem;
  line-height: 1.6;
  font-weight:300;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  border: none;
  resize: none;
  outline: none;
`

const ChecksumArea = styled.div`
  text-align: center;

  .clipboard {
    color: ${({ theme }) => theme.colors.interactive};
    font-size: 2rem;
    line-height: 2rem;
    margin-left: 0.5rem;
    display: inline-block;
    transform: translateY(-2rem);
  }
`

const OSColumn = ({ common, osData, checksum, signature, beta, catalyst }) => {
  // console.log(URL)
  const checksumTextAreaRef = createRef()
  const pgpName = osData.binary.split('/').pop()
  const getPGPFilename = () => `${pgpName}.asc`
  const getPGPBlog = () => window.Blob && new window.Blob([ osData.signature ], { type: 'text/txt' })
  const getPGPSignatureHref = () => {
    const blob = getPGPBlog()
    return blob ? URL.createObjectURL(blob) : '#'
  }

  const onDownloadPGPSignature = (os) => (e) => {
    analytics.click({
      category: analytics.constants.EXTERNAL_LINK,
      label: getTrackingLabel(`download_pgp_${os}`),
      event: e
    })

    if (window.navigator.msSaveBlob || e.target.href === '#') e.preventDefault()
    if (window.navigator.msSaveBlob) window.navigator.msSaveBlob(getPGPBlog(), getPGPFilename())
  }

  const copyChecksumToClipboard = (e) => {
    e.preventDefault()
    checksumTextAreaRef.current.select()
    window.document && window.document.execCommand('copy')
  }

  const getTrackingLabel = label => `${beta ? 'beta_' : ''}${label}_${osData.version}`

  let buttonTitle = beta ? common.frontmatter.content.beta_cta_string : common.frontmatter.content.cta_string
  buttonTitle = catalyst ? common.frontmatter.content.catalyst_cta_string : buttonTitle

  const unCacheURL = (url) => {
    return url + '?t=' + (new Date().getTime())
  }

  const trackDownload = (os) => (event) => analytics.click({
    category: analytics.constants.EXTERNAL_LINK,
    label: getTrackingLabel(`download_cta_${osData.key}`),
    event
  })

  return (
    <Container id={`browser-testing-download-${osData.key}-component`}>
      <Image src={osData.image} alt={osData.os} />
      <Title>{osData.os}</Title>
      <Version id={`browser-testing-download-${osData.key}-version`}>{common.frontmatter.content.version_string}: {osData.version}</Version>
      <Button
        color='primary'
        size='large'
        variant='contained'
        href={unCacheURL(osData.binary) || ''}
        id={`browser-testing-download-${osData.key}-cta`}
        onClick={trackDownload(osData.key)}
        className={beta ? 'beta-btn' : ''}
      >
        {buttonTitle}
      </Button>
      <PGPSignatureTitle>
        {common.frontmatter.content.pgp_signature}
      </PGPSignatureTitle>
      <Button
        color='secondary'
        size='small'
        variant='contained'
        href={getPGPSignatureHref()}
        onClick={onDownloadPGPSignature(osData.key)}
        download={getPGPFilename()}
        id={`browser-testing-download-${osData.key}-pgp-signature`}
        className='secondaryBtn'
      >
        {common.frontmatter.content.pgp_download}
      </Button>
      <ModalTrigger
        id={`browser-testing-download-${osData.key}-open-pgp-instructions`}
        name={`download_pgp_instructions_${osData.key}`}
        className='pgp-signature-verify'
      >
        ({common.frontmatter.content.verify_signature})
      </ModalTrigger>
      <Modal
        id={`browser-testing-download-${osData.key}-pgp-signature-instructions-modal`}
        name={`download_pgp_instructions_${osData.key}`}
      >
        <ModalContent>
          <ModalTitle>
            {signature.frontmatter.title}
          </ModalTitle>
          <ModalBodyWrapper>
            <ModalBody
              dangerouslySetInnerHTML={{ __html: signature.html }}
            />
          </ModalBodyWrapper>
        </ModalContent>
      </Modal>
      <p>
        {common.frontmatter.content.sha_256_checksum}
      </p>
      <ChecksumArea id={`browser-testing-download-${osData.key}-checksum`}>
        <TextArea
          ref={checksumTextAreaRef}
          value={osData.checksum}
          readonly
          rows='3'
          onChange={() => { }}
        />
        <Link
          href='#'
          onClick={copyChecksumToClipboard}
          className='clipboard'
          tracking={{ label: getTrackingLabel(`copy_checksum_${osData.key}`) }}
        >
          <FiClipboard />
        </Link>
      </ChecksumArea>
      <ModalTrigger
        id={`browser-testing-download-${osData.key}-open-checksum-instructions`}
        className='checksum-instructions'
        name={`download_checksum_instructions_${osData.key}`}
      >
        ({common.frontmatter.content.verify_checksum})
      </ModalTrigger>
      <Modal
        id={`browser-testing-download-${osData.key}-checksum-instructions-modal`}
        name={`download_checksum_instructions_${osData.key}`}
      >
        <ModalContent>
          <ModalTitle>
            {checksum.frontmatter.title}
          </ModalTitle>
          <ModalBodyWrapper>
            <ModalBody
              dangerouslySetInnerHTML={{ __html: checksum.html }}
            />
          </ModalBodyWrapper>
        </ModalContent>
      </Modal>
    </Container>
  )
}

OSColumn.propTypes = {
  beta: PropTypes.bool,
  catalyst: PropTypes.bool,
  common: PropTypes.shape({
    frontmatter: PropTypes.shape({
      content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        cta_string: PropTypes.string.isRequired,
        beta_cta_string: PropTypes.string.isRequired,
        catalyst_cta_string: PropTypes.string.isRequired,
        pgp_download: PropTypes.string.isRequired,
        version_string: PropTypes.string.isRequired,
        verify_signature: PropTypes.string.isRequired,
        verify_checksum: PropTypes.string.isRequired,
        pgp_signature: PropTypes.string.isRequired,
        sha_256_checksum: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  osData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    binary: PropTypes.string.isRequired,
    checksum: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }).isRequired,
  checksum: PropTypes.shape({
    html: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  }).isRequired,
  signature: PropTypes.shape({
    html: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  }).isRequired
}

export default OSColumn
