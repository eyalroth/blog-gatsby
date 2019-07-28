import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Page from '../Page'
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import { SidebarLinks } from '../../consts/menuLinks'
import './style.scss'
import '../Layout/style.scss'

class Home extends React.Component {
  render() {
    return (
      <Page sidebarLinkId={SidebarLinks.Home.id} renderSidebar={false}>
        {this.renderContent()}
      </Page>
    )
  }

  renderContent() {
    return (
      <StaticQuery
        query={graphql`
            query HomeQuery {
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
        render={data => this.renderContentFromQuery(data)}
    />)
  }

  renderContentFromQuery(queryData) {
    const { author, subtitle, copyright } = queryData.site.siteMetadata

    const siteLinks = [
      {
        label: "Blog",
        path: "/blog"
      },
      {
        label: "About",
        path: "/about"
      },
    ]

    return (
      <div className="home">
            <ProfileImg className="home__author-img" author={author.name}/>
            <h1 className="home__author-title">
              {author.name}
            </h1>
            <p className="home__author-subtitle">
              {subtitle}
            </p>
            <div className="home__author-icons">
                <Links data={author} />
            </div>
            <nav className="home__site-links">
              <ul className="home__site-links-list">
                {siteLinks.map(item => (
                  <li className="home__site-links-item" key={item.path}>
                    <Link
                      to={item.path}
                      className="home__site-links-item-link"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
      </div>
    )
  }
}

export default Home