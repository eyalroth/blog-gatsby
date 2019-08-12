import React from 'react'
import { Author } from '../../consts/author'
import './style.scss'

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
            <i title="Github Profile" className="icon-github-circled" />
          </a>
        </li>
        <li key="linkedin">
          <a
            href={Author.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            >
            <i title="Linkedin Profile" className="icon-linkedin" />
          </a>
        </li>
        <li key="email">
          <a href={`mailto:${Author.links.email}`}>
            <i title="Email" className="icon-mail" />
          </a>
        </li>
      </ul>
    )
  }
}

export default AuthorLinks
