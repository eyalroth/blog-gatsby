import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import { Author } from '../../consts/author'
import { SidebarLinks } from '../../consts/menuLinks'
import './style.scss'
import '../Layout/style.scss'

class Home extends React.Component {
  render() {
    const { languageId } = this.props

    return (
      <Page
        languageId={languageId}
        sidebarLinkId={SidebarLinks[languageId].Home.id}
        renderSidebar={false}
      >
        {this.renderContent()}
      </Page>
    )
  }

  renderContent() {
    const { languageId } = this.props

    const siteLinks = Object.values(SidebarLinks[languageId]).filter(link => link.id != "home")

    return (
      <div className="home">
            <ProfileImg className="home__author-img" languageId={languageId}/>
            <h1 className="home__author-title">
              {Author.name[languageId]}
            </h1>
            <p className="home__author-subtitle">
              {Author.subtitle[languageId]}
            </p>
            <div className="home__author-icons">
                <Links/>
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