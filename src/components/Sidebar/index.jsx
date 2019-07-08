import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import Links from '../Links'
import ProfileImg from '../ProfileImg'
import Toggle from '../Toggle'
import globalState from '../GlobalState'
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
    this.menuLinks = {}
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
    const underline = React.createRef()
    const links = this.menuLinks

    return (
      <Toggle isEnabled={this.valueByMode(false, true, false)}>
        <nav ref={updateUnderline} className="sidebar__menu">
          <ul className="sidebar__menu-list">
            {menuList.map(item => (
              <li 
                className="sidebar__menu-list-item"
                key={item.path}
              >
               {createLink(item)} 
              </li>
            ))}
          </ul>
          <Stylized ref={underline} className="sidebar__menu-underline"/>
        </nav>
      </Toggle>
    )

    function createLink(item) {
      return (
        <Link
          ref={em => {
            links[noTrailingSlash(item.path)] = em
          }}
          to={item.path}
          className="sidebar__menu-list-item-link"
        >
          {item.label}
        </Link>
      )
    }


    function updateUnderline(menu) {
      if (menu) {
        const currentPath = noTrailingSlash(window.location.pathname)
        const currentLink = links[currentPath]
        if (currentLink) {
          if (globalState.sidebar.lastUnderlinePath && globalState.sidebar.lastUnderlinePath != currentPath) {
            const lastLink = links[globalState.sidebar.lastUnderlinePath]
            shiftUnderline({from: lastLink, to: currentLink})
          } else {
            if (menu.getBoundingClientRect().width > 0) {
              setUnderline(currentLink)
            } else {
              menu.addEventListener('transitionend', () => {
                setUnderline(currentLink)
              }, {once: true})
            }
          }
          globalState.sidebar.lastUnderlinePath = currentPath
        } else {
          globalState.sidebar.lastUnderlinePath = null
        }
      }
    }

    function setUnderline(link) {
      if (underline.current) {
        const { left, width } = link.getBoundingClientRect()
        underline.current.setStyle({
          left,
          width
        })
      }
    }

    function shiftUnderline({from, to}) {
      if (underline.current) {
        const { left: fromX  } = from.getBoundingClientRect()
        const { left: toX, width } = to.getBoundingClientRect()
        underline.current.setStyle({
          left: fromX,
          transform: `translateX(${toX - fromX}px)`,
          width
        })
      }
    }
    
    function noTrailingSlash(pathname) {     
      return pathname.replace(/\/$/, "")
    }
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

class Stylized extends React.Component {
  constructor(props) {
    super(props);
    this.state = {style: {}};
  }

  setStyle(style) {
    this.setState({style})
  }

  render() {
    return (
      <div className={this.props.className} style={this.state.style}/>
    )
  }
}