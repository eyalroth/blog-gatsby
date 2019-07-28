import React from 'react'
import { Author } from '../../consts/author'
import './style.scss'
import '../../assets/fonts/fontello/css/fontello.css'

class AuthorLinks extends React.Component {
  render() {
    return (
      <ul className="author-links">
        <li key="github">
          <a
            href={Author.links.github}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="icon-github-circled" />
          </a>
        </li>
        <li key="linkedin">
          <a
            href={Author.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="icon-linkedin" />
          </a>
        </li>
        <li key="email">
          <a href={`mailto:${Author.links.email}`}>
            <i className="icon-mail" />
          </a>
        </li>
      </ul>
    )
  }
}

export default AuthorLinks
