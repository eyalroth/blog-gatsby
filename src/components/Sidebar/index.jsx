import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import NavMenu from '../NavMenu'
import { GlobalLinks } from '../../consts/menuLinks'
import Toggle from '../Toggle'
import globalState from '../GlobalState'
import './style.scss'

const SidebarMode = Object.freeze({
  Main: "main",
  Menu: "menu",
  Contact: "contact"
})

class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    if (!globalState.sidebar.mode) {
      globalState.sidebar.mode = SidebarMode.Main
    }
    this.state = { mode: globalState.sidebar.mode }
  }

  changeMode(newMode) {
    this.setState({mode: newMode})
    globalState.sidebar.mode = newMode
  }

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

    const profileImg = this.renderProfileImg(author)
    const authorTitle = this.renderAuthorTitle(author, subtitle)
    const menu = this.renderMenu()
    const contact = this.renderContact(author)
    const menuButton = this.renderMenuButton()
    const contactButton = this.renderContactButton()

    return this.compose(profileImg, authorTitle, menu, contact, menuButton, contactButton)
  }

  compose(profileImg, authorTitle, menu, contact, menuButton, contactButton) {

    return (
      <div id="sidebar" className="sidebar">
        {menuButton}
        {profileImg}
        {authorTitle}
        {contact}
        {menu}
        {contactButton}
      </div>
    )
  }


  renderProfileImg(author) {
    return (
      <Toggle isEnabled={this.valueByMode(true, false, true)}>
        <ProfileImg className="sidebar__author-img" author={author.name}/>
      </Toggle>
    )
  }

  renderAuthorTitle(author, subtitle) {
    return (
      <Toggle isEnabled={this.valueByMode(true, false, false)}>
        <span className="sidebar__author-title">
          {author.name}
        </span>
        <p className="sidebar__author-subtitle">
          {subtitle}
        </p>
      </Toggle>
    )
  }

  renderMenu() {
    return (
      <Toggle isEnabled={this.valueByMode(false, true, false)}>
        <NavMenu
          id="global-links"
          linkDescriptions={GlobalLinks}
          classNamePrefix="sidebar__menu"
          currentLinkId={this.props.globalLinkId}
        />
      </Toggle>
    )
  }

  renderContact(author) {
    return (
      <Toggle isEnabled={this.valueByMode(false, false, true)}>
        <nav className="sidebar__contact">
          <Links data={author} />
        </nav>
      </Toggle>
    )
  }

  renderMenuButton() {
    let isEnabled = this.valueByMode(false, true, false)
    let newMode
    if (isEnabled) {
      newMode = SidebarMode.Main
    } else {
      newMode = SidebarMode.Menu
    }

    return (
      <Toggle isEnabled={isEnabled}>
        <button 
          className="sidebar__menu-button"
          onClick={() => this.changeMode(newMode)}
        >
          <i className="icon-menu" />
        </button>
      </Toggle>
    )
  }

  renderContactButton() {
    let isEnabled = this.valueByMode(false, false, true)
    let newMode
    if (isEnabled) {
      newMode = SidebarMode.Main
    } else {
      newMode = SidebarMode.Contact
    }

    return (
      <Toggle isEnabled={isEnabled}>
        <button 
          className="sidebar__contact-button"
          onClick={() => this.changeMode(newMode)}
        >
          <i className="icon-info-circled" />
        </button>
      </Toggle>
    )
  }

  valueByMode(mainMode, menuMode, contactMode) {
    switch(this.state.mode) {
      case SidebarMode.Main:
        return mainMode
      case SidebarMode.Menu:
        return menuMode
      case SidebarMode.Contact:
        return contactMode
    }
  }
}

export default Sidebar