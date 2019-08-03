import React from 'react'
import ContextConsumer from '../Context'
import { Feeds } from '../../consts/rss'
import './style.scss'

class Footer extends React.Component {
  render() {
    return (
      <ContextConsumer>
        {({language}) => (
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
              <div className="footer__feed-box">
                <a className="footer__feed" href={Feeds[language.get().id].outputPath}>
                  <i className="icon-rss" />
                </a>
              </div>
          </footer>
        )}
      </ContextConsumer>
    )
  }
}

export default Footer
