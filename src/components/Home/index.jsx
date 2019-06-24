import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import Footer from '../Footer'
import './style.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Helmet>
          <title>Eyal Roth</title>
        </Helmet>
        {this.renderContent()}
        <Footer />
      </div>
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