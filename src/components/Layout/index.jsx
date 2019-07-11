import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import './style.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    let { subtitle } = this.props
    if (subtitle) {
      subtitle = `${subtitle} | `
    } else {
      subtitle = ""
    }

    return (
      <div className="page-container">
        <Helmet>
          <title>{subtitle}Eyal Roth</title>
        </Helmet>
        <div className="content-wrap">
          <Sidebar globalLinkId={this.props.globalLinkId} />
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout
