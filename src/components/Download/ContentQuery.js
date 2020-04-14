import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { LanguageConsumer, ThemeConsumer } from '../../state'
import logger from '../../helpers/logger'

const ContentQuery = ({ render }) => (
  <ThemeConsumer>
    {({ theme }) => (
      <LanguageConsumer>
        {({ lang }) => (
          <StaticQuery
            query={graphql`
              {
                DownloadPage: allFile(filter: {relativePath: {glob: "content/pages/download/*.md"}}) {
                  nodes {
                    relativePath
                    childMarkdownRemark {
                      frontmatter {
                        content {
                          title
                          subtitle
                          cta_string
                          pgp_download
                          version_string
                          verify_signature
                          verify_checksum
                          pgp_signature
                          sha_256_checksum
                          os {
                            windows
                            darwin
                            linux
                          }
                          release_notes {
                            label
                            url
                          }
                          release_notes_flight {
                            label
                            url
                          }
                        }
                      }
                    }
                  }
                }
                DownloadContent: allFile(filter: {relativePath: {glob: "content/download/*.md"}}) {
                  nodes {
                    relativePath
                    childMarkdownRemark {
                      html
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `}
            render={({ DownloadContent, DownloadPage }) => {
              const formattedData = {}
              const pageContent = DownloadPage.nodes.filter(node => node.relativePath === `content/pages/download/${lang}.md`).shift()
              if (!pageContent) throw new Error(`No content found for download page using language ${lang}`)
              formattedData.common = pageContent.childMarkdownRemark
              DownloadContent.nodes.forEach(node => {
                try {
                  // eslint-disable-next-line no-unused-vars
                  const [ _, os, contentType, language ] = node.relativePath.match(/^content\/download\/([^_]+)_([^\\.]+)\.([^\\.]+)\.md$/)
                  if (lang !== language) return
                  formattedData.os = formattedData.os || {}
                  formattedData.os[os] = formattedData.os[os] || {
                    osData: {
                      image: theme.images.os[os],
                      key: os,
                      os: formattedData.common.frontmatter.content.os[os]
                    }
                  }
                  formattedData.os[os][contentType] = node.childMarkdownRemark
                } catch (error) {
                  logger.error({
                    description: `error processing download content, ${node.relativePath}`,
                    args: [ { DownloadContent, DownloadPage } ],
                    error
                  })
                  return render({ error })
                }
              })
              return render(formattedData)
            }}
          />
        )}
      </LanguageConsumer>
    )}
  </ThemeConsumer>
)

ContentQuery.propTypes = {
  render: PropTypes.func.isRequired
}

export default ContentQuery
