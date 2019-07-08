import React from 'react'
import { Link } from 'gatsby'
import './style.scss'
import '../../assets/fonts/fontello/css/fontello.css'

class Footer extends React.Component {
  render() {
    return (
        <footer className="footer">
            <div className="footer__center">
              {`Made with ❤️`}
              <div className="footer__links">
                <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>
                {` + `}
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
                {` + `}
                <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
              </div>
            </div> 
            <div className="footer__right">
              <a className="footer__feed" href="/rss.xml">
                <i className="icon-rss" />
              </a>
            </div>
        </footer>
    )
  }
}

export default Footer
