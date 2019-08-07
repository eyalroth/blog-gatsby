import React from 'react'
import Footer from '../../Footer'
import './style.scss'

class StaticPageLayout extends React.Component {
  render() {
    return (
      <div className="page-container">
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
  
export default StaticPageLayout
  