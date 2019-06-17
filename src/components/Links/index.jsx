import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello-1c73886c/css/fontello.css'

class Links extends React.Component {
  render() {
    const author = this.props.data
    const links = {
      github: author.github,
      linkedin: author.linkedin,
      email: author.email,
    }

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-github-circled" />
            </a>
          </li>
          <li className="links__list-item">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-linkedin" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`mailto:${links.email}`}>
              <i className="icon-mail" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Links
