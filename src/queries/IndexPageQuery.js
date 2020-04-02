import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Language from '@input-output-hk/front-end-core-components/components/Language'

const IndexPageQuery = ({ render }) => (
  <Language.Consumer>
    {({ key: lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(filter:{relativePath:{glob:"content/pages/index/*.md"}}) {
              nodes{
                relativePath,
                childMarkdownRemark{
                  frontmatter {
                    content {
                      title
                      subtitle
                      cta {
                        learn
                        learn_link
                        support
                        support_link
                      }
                      overview {
                        title
                        content
                      }
                      learn_more {
                        title
                        links {
                          label
                          href
                        }
                      }
                      wallet_features {
                        title
                        unlimited_accounting {
                          title
                          description
                        }
                        advanced_security {
                          title
                          description
                        }
                        desktop_platforms {
                          title
                          description
                        }
                        newsfeed {
                          title
                          description
                        }
                        personalization {
                          title
                          description
                        }
                      }
                      coming_soon {
                        title
                        description
                      }
                      uiComponentsTitle
                      ui_points {
                        built_with_web_technologies {
                          title
                          description
                        }
                        extend_with_plugins {
                          title
                          description
                        }
                        rich_and_secure_interface {
                          title
                          description
                        }
                        user_interface_framework {
                          title
                          description
                        }
                        design_your_daedalus_plugins {
                          title
                          description
                        }
                        create_custom_themes {
                          title
                          description
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allFile }) => {
          const content = allFile.nodes.filter(node => node.relativePath === `content/pages/index/index-${lang}.md`).shift()
          if (!content || !content.childMarkdownRemark) throw new Error(`No index translations found for language ${lang}`)
          return render(content.childMarkdownRemark.frontmatter.content)
        }}
      />
    )}
  </Language.Consumer>
)

IndexPageQuery.propTypes = {
  render: PropTypes.func.isRequired
}

export default IndexPageQuery
