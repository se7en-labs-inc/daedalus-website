import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { get as getDaedalusData, getCached as getCachedDaedalusData } from '../../connectors/daedalusData'
import DownloadPageQuery from '../../queries/DownloadPageQuery'

function renderHTMLTemplate (html, data) {
  return html.replace(/{{\s?[^\s}]+\s?}}/g, (match) => {
    const identifier = match.replace(/[{{\s\s}}]/g, '')
    return data[identifier] || match
  })
}

const Query = ({ render, walletType = 'normal' }) => {
  let isMounted = true
  const [ daedalusData, setDaedalusData ] = useState(getCachedDaedalusData(walletType))
  const [ error, setError ] = useState(null)
  useEffect(() => {
    const loadData = async () => {
      const [ data, error ] = await getDaedalusData(walletType)
      if (!isMounted) return
      if (error && !data) return setError(error)
      setDaedalusData(data)
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [ setDaedalusData ])

  if (error) return render({ error })
  if (!daedalusData) return render({ loading: true })

  return (
    <DownloadPageQuery
      render={data => {
        const formattedData = {
          ...data,
          os: {
            ...data.os,
            windows: {
              ...data.os.windows,
              checksum: {
                ...data.os.windows.checksum
              }
            },
            linux: {
              ...data.os.linux,
              checksum: {
                ...data.os.linux.checksum
              }
            },
            darwin: {
              ...data.os.darwin,
              checksum: {
                ...data.os.darwin.checksum
              }
            }
          }
        }

        try {
          Object.keys(formattedData.os).forEach(os => {
            formattedData.os[os].checksum.html = renderHTMLTemplate(formattedData.os[os].checksum.html, {
              binary: daedalusData.platforms[os].URL,
              checksum: daedalusData.platforms[os].SHA256,
              version: daedalusData.platforms[os].version,
              hash: daedalusData.platforms[os].hash,
              signature: daedalusData.platforms[os].signature,
              filename: daedalusData.platforms[os].URL.replace(/^.*\/(.*)$/, '$1')
            })

            formattedData.os[os].signature.html = renderHTMLTemplate(formattedData.os[os].signature.html, {
              binary: daedalusData.platforms[os].URL,
              checksum: daedalusData.platforms[os].SHA256,
              version: daedalusData.platforms[os].version,
              hash: daedalusData.platforms[os].hash,
              signature: daedalusData.platforms[os].signature,
              filename: daedalusData.platforms[os].URL.replace(/^.*\/(.*)$/, '$1')
            })

            formattedData.os[os].osData = {
              ...formattedData.os[os].osData,
              binary: daedalusData.platforms[os].URL,
              checksum: daedalusData.platforms[os].SHA256,
              version: daedalusData.platforms[os].version,
              hash: daedalusData.platforms[os].hash,
              signature: daedalusData.platforms[os].signature
            }
          })

          return render(formattedData)
        } catch (error) {
          console.error({
            description: `error processing content for daedalus download`,
            args: [ data ],
            error
          })
          return render({ error })
        }
      }}
    />
  )
}

Query.propTypes = {
  render: PropTypes.func.isRequired,
  walletType: PropTypes.string
}

export default Query
