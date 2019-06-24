import React from 'react'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Menu from '../Menu'
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import './style.scss'

class Sidebar extends React.Component {
  render() {
    const { location } = this.props
    const {
      author,
      subtitle,
      copyright,
      menu,
    } = this.props.data.site.siteMetadata
    const isHomePage = get(location, 'pathname', '/') === '/'

    /* eslint-disable jsx-a11y/img-redundant-alt */
    const authorBlock = (
      <div>
        <Link to="/">
          <ProfileImg className="sidebar__author-img" author={author.name}/>
        </Link> 
        {isHomePage ? (
          <h1 className="sidebar__author-title">
            <Link className="sidebar__author-link" to="/">
              {author.name}
            </Link>
          </h1>
        ) : (
          <h2 className="sidebar__author-title">
            <Link className="sidebar__author-link" to="/">
              {author.name}
            </Link>
          </h2>
        )}
        <p className="sidebar__author-subtitle">
          {subtitle}
        </p>
        <div className="sidebar__author-icons">
            <Links data={author} />
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/img-redundant-alt */

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          {authorBlock}
          <Menu/>
        </div>
      </div>
    )
  }
}

export default Sidebar
