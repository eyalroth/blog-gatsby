import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import './style.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Helmet defaultTitle="Eyal Roth" />
          {children}
        </div>
        <footer className="footer">
          {`Made with ❤️`}
          <br/>
          <div className="footer-links">
            <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>
            {` + `}
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
            {` + `}
            <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
