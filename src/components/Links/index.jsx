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
      <div className="author-links">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="icon-github-circled" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="icon-linkedin" />
          </a>
          <a href={`mailto:${links.email}`}>
            <i className="icon-mail" />
          </a>
      </div>
    )
  }
}

export default Links
