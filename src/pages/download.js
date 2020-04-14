import React from 'react'
// import Box from '@material-ui/core/Box'
// import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout'
import DownloadPageQuery from '../queries/DownloadPageQuery'

export default () => (
  <DownloadPageQuery
    render={(content) => (
      <Layout>
        <p>Download</p>
        {console.log('download content', content)}
      </Layout>
    )}
  />
)
