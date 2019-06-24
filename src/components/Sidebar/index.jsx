import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Menu from '../Menu'
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import './style.scss'

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
            render={data => (
                <div className="sidebar">
                  <div className="sidebar__inner">
                    {this.renderAuthorBlock(data)}
                    <Menu/>
                  </div>
                </div>
            )}
        />)
  }

  renderAuthorBlock(queryData) {
        const { author, subtitle, copyright } = queryData.site.siteMetadata

        /* eslint-disable jsx-a11y/img-redundant-alt */
        return (
          <div>
            <Link to="/">
              <ProfileImg className="sidebar__author-img" author={author.name}/>
            </Link> 
            <h1 className="sidebar__author-title">
              <Link className="sidebar__author-link" to="/">
                {author.name}
              </Link>
            </h1>
            <p className="sidebar__author-subtitle">
              {subtitle}
            </p>
            <div className="sidebar__author-icons">
                <Links data={author} />
            </div>
          </div>
        )
        /* eslint-enable jsx-a11y/img-redundant-alt */
  }
}

export default Sidebar
