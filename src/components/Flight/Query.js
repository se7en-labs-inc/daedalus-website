import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { LanguageConsumer } from '../../state'

const Query = ({ render }) => (
  <LanguageConsumer>
    {({ lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(
              filter: { relativePath: { glob: "content/pages/flight/*.md" } }
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
              (node) => node.relativePath === `content/pages/flight/${lang}.md`,
            )
            .shift()
          if (!content)
            throw new Error(
              `No content found for flght page using language ${lang}`,
            )
          return render(content.childMarkdownRemark)
        }}
      />
    )}
  </LanguageConsumer>
)

Query.propTypes = {
  render: PropTypes.func.isRequired,
}

export default Query
