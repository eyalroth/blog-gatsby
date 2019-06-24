import React from 'react'
import Layout from '../components/Layout'

class NotFoundRoute extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">NOT FOUND</h1>
                <div className="page__body">
                  <p>
                    You just hit a route that doesn&#39;t exist... the sadness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundRoute