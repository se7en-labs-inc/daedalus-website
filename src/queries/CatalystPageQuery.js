import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Language from '@input-output-hk/front-end-core-components/components/Language'

const CatalystPageQuery = ({ render }) => (
  <Language.Consumer>
    {({ key: lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(
              filter: { relativePath: { glob: "content/pages/catalyst/*.md" } }
            ) {
              nodes {
                relativePath
                childMarkdownRemark {
                  frontmatter {
                    content {
                      title
                      subtitle
                      content
                    }
                    use {
                      title
                      content
                    }
                    feedback {
                      title
                      content
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allFile }) => {
          const content = allFile.nodes
            .filter(
              (node) =>
                node.relativePath ===
                `content/pages/catalyst/catalyst-${lang}.md`,
            )
            .shift()
          if (!content || !content.childMarkdownRemark)
            throw new Error(
              `No catalyst translations found for language ${lang}`,
            )
          return render(content.childMarkdownRemark.frontmatter.content)
        }}
      />
    )}
  </Language.Consumer>
)

CatalystPageQuery.propTypes = {
  render: PropTypes.func.isRequired,
}

export default CatalystPageQuery
