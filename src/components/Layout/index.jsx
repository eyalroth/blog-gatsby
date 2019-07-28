import React from 'react'
import ContextConsumer, { ContextProviderComponent } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import './style.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    const sidebar = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <Sidebar /> : null}
      </ContextConsumer>
    )

    return (
      <ContextProviderComponent>
        <div className="page-container">
          <div className="content-wrap">
            {sidebar}  
            {children}
          </div>
          <Footer />
        </div>
      </ContextProviderComponent>
    )
  }
}

export default Layout
