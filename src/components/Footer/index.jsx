import React from 'react'
import './style.scss'

class Footer extends React.Component {
  render() {
    return (
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
    )
  }
}

export default Footer
