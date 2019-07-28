import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello/css/fontello.css'

class Links extends React.Component {
  render() {
    const author = this.props.data
    const links = {
      github: author.github,
      linkedin: author.linkedin,
      email: author.email,
    }

    return (
      <ul className="author-links">
        <li key="github">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="icon-github-circled" />
          </a>
        </li>
        <li key="linkedin">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="icon-linkedin" />
          </a>
        </li>
        <li key="email">
          <a href={`mailto:${links.email}`}>
            <i className="icon-mail" />
          </a>
        </li>
      </ul>
    )
  }
}

export default Links
