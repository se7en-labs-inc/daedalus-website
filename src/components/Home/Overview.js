import React from 'react'
import PropTypes from 'prop-types'
import InfoBox from '../InfoBox'

const Overview = ({ title, content }) => (
  <p>
    foo
  </p>
  // <InfoBox title={title}>
  //   <p>
  //     {content}
  //   </p>
  // </InfoBox>
)

Overview.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}

export default Overview
