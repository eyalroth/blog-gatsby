import React from 'react'
import Page from '../components/Page'

class NotFoundRoute extends React.Component {
  render() {
    return (
      <Page title="404">
        <p>
          You just hit a route that doesn&#39;t exist... the sadness.
        </p>
      </Page>
    )
  }
}

export default NotFoundRoute