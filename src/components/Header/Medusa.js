import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from '@input-output-hk/front-end-core-components'
import { isSupported as isMedusaSupported } from '../../connectors/medusa'

import StaticMedusaImage from '../../../static/images/static-medusa.jpg'

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  top: -1rem;
  position: relative;

  &.fullscreen {
    position: static;
  }
`

const MedusaFrame = styled.iframe`
  width: 110%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 60rem;

  &.fullscreen {
    width: 100%;
    height: 100vh;
  }
`

const MedusaStatic = styled.div`
  width: 110%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 60rem;

  img {
    margin: 0;
  }
`

const UnSupported = styled.p`
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  text-align: center;
`

const isSupported = () => isMedusaSupported()
const Medusa = ({ fullScreen, lang }) => {
  return (
    <Container className={fullScreen && 'fullscreen'}>
      {isSupported() &&
        <MedusaFrame
          title='medusa'
          className={fullScreen ? 'fullscreen' : ''}
          src={`//webdevm.iohk.io/?lang=${lang}${fullScreen ? '&medusa=fullscreen' : ''}&repo=daedalus${(lang === 'ja') ? '&content=' + encodeURI('Daedalusプルーフオブステークプロトコルを実装した暗号通貨およびブロックチェーンネットワーク') : ''}`}
        />
      }
      {!isSupported() && fullScreen &&
        <UnSupported>Medusa Unsupported</UnSupported>
      }
      {!isSupported() && !fullScreen &&
        <MedusaStatic>
          <Image
            src={StaticMedusaImage}
            alt='Medusa'
          />
        </MedusaStatic>
      }
    </Container>
  )
}

Medusa.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  lang: PropTypes.string
}

export default Medusa
