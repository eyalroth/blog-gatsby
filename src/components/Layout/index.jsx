import React from 'react'
import Helmet from 'react-helmet'
import ContextConsumer, { ContextProviderComponent } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import './style.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    const header = (
      <ContextConsumer>
        {context => (
          <Helmet>
            <title>{`${context.data.pageSubtitle}Eyal Roth`}</title>
          </Helmet>
        )}
      </ContextConsumer>
    )

    const sidebar = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <Sidebar /> : null}
      </ContextConsumer>
    )

    const content = (
      <div className="content-wrap">
        {sidebar}  
        {children}
      </div>
    )

    return (
      <ContextProviderComponent>
        <div className="page-container">
          {header}
          {content}
          <Footer />
        </div>
      </ContextProviderComponent>
    )
  }
}

export default Layout
