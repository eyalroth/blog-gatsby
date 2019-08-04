import React from 'react'
import Sidebar from '../../Sidebar'
import Footer from '../../Footer'
import ProgressBar from '../../ProgressBar'
import './style.scss'

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className="page-container">
        <ProgressBar />
        <div className="surface0"/>
        <div className="surface1"/>
        <div className="content-wrap">
          <Sidebar />
          <div className="content">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default DefaultLayout
