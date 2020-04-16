import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const Markdown = (props) => (
  <ReactMarkdown
    {...props}
    renderers={{ ...props.renderers }}
  />
)

Markdown.propTypes = {
  renderers: PropTypes.object
}

export default Markdown
