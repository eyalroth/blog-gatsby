import React from 'react'
import { Languages } from '../../consts/languages'
import { Feeds } from '../../consts/rss'
import ThemeButton from '../ThemeButton'
import './style.scss'

class Footer extends React.Component {
  render() {
    const { languageId } = this.props
    const feed = (languageId) ? Feeds[languageId] : Feeds[Languages.English.id]

    // TODO remove theme button (including "import")
    return (
        <footer className="footer">
            <div className="footer__center">
              <ThemeButton/>
              {`Made with ❤️`}
              <div className="footer__links">
                <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>
                {` + `}
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
                {` + `}
                <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
              </div>
            </div> 
            <div className="footer__feed-box">
              <a className="footer__feed" href={feed.outputPath}>
                <i className="icon-rss" />
              </a>
            </div>
        </footer>
    )
  }
}

export default Footer
