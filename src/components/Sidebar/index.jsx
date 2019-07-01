import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import './style.scss'

const menuList = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Blog",
    path: "/blog"
  },
  {
    label: "About",
    path: "/about"
  },
]

class Sidebar extends React.Component {

  render() {
    return (
        <StaticQuery
            query={graphql`
                query SidebarQuery {
                  site {
                    siteMetadata {
                      subtitle
                      copyright
                      author {
                        name
                        email
                        github
                        linkedin
                      }
                    }
                  }
                }
            `}
            render={data => this.renderFromQueryData(data)}
        />)
  }

  renderFromQueryData(queryData) {
        const { author, subtitle, copyright } = queryData.site.siteMetadata

        const menu = (
          <nav id="sidebar__menu" className="sidebar__menu">
            <ul className="sidebar__menu-list">
              {menuList.map(item => (
                <li className="sidebar__menu-list-item" key={item.path}>
                  <Link
                    to={item.path}
                    className="sidebar__menu-list-item-link"
                    activeClassName="sidebar__menu-list-item-link sidebar__menu-list-item-link--active"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div id="sidebar__menu-underline" className="sidebar__menu-underline" />
          </nav>
        )

        const contact = (
          <nav id="sidebar__contact" className="sidebar__contact">
                <Links data={author} />
            </nav>
        )

        return (
          <div id="sidebar" className="sidebar">
            <button id="sidebar__menu-button" className="sidebar__menu-button">
                <i className="icon-menu" />
            </button>
            <ProfileImg id="sidebar__author-img" className="sidebar__author-img" author={author.name}/>
            <span id="sidebar__author-title" className="sidebar__author-title">
              {author.name}
            </span>
            <p className="sidebar__author-subtitle">
              {subtitle}
            </p>
            {contact}
            {menu}
            <button id="sidebar__contact-button" className="sidebar__contact-button">
              @
            </button>
          </div>
        )
  }
}

export default Sidebar
