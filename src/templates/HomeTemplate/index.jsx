import React from 'react'
import Context from '../../components/Context'
import PageHelmet from '../../components/PageHelmet'
import ProfileImg from '../../components/ProfileImg'
import NavMenu from '../../components/NavMenu'
import { Author } from '../../consts/author'
import { SidebarLinks } from '../../consts/menuLinks'
import './style.scss'

class HomeTemplate extends React.Component {
  render() {
    const language = this.context.layout.language.get()
    const languageId = language.id
    
    const siteLinks = Object.values(SidebarLinks[languageId])
    
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
        <NavMenu
          linkDescriptions={siteLinks}
          classNamePrefix="home__menu"
          currentLinkId={SidebarLinks[languageId].Blog.id}
        />
      </div>
    )
  }
}

HomeTemplate.contextType = Context

export default HomeTemplate