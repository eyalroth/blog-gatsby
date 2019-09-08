import React from 'react'
import { Link } from 'gatsby'
import Context from '../../components/Context'
import PageHelmet from '../../components/PageHelmet'
import ProfileImg from '../../components/ProfileImg'
import { Author } from '../../consts/author'
import { SidebarLinks } from '../../consts/menuLinks'
import './style.scss'

class Home extends React.Component {
  render() {
    const language = this.context.layout.language.get()
    const languageId = language.id
    
    const siteLinks = Object.values(SidebarLinks[languageId]).filter(link => link.id !== "home")
    
    return (
      <div className="home">
        <PageHelmet description={`Home page - ${languageId}`}/>
        <ProfileImg className="home__author-img" />
        <h1 className="home__author-title">
          {Author.name[languageId]}
        </h1>
        <p className="home__author-subtitle">
          {Author.subtitle[languageId]}
        </p>
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

Home.contextType = Context

export default Home