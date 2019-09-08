import React from 'react'
import Context from '../Context'
import AuthorLinks from '../AuthorLinks'
import ProfileImg from '../ProfileImg'
import NavMenu from '../NavMenu'
import { Author } from '../../consts/author'
import { SidebarLinks } from '../../consts/menuLinks'
import Toggle from '../Toggle'
import ThemeButton from '../ThemeButton'
import './style.scss'

const SidebarMode = Object.freeze({
  Main: "main",
  Menu: "menu",
  Contact: "contact"
})

class Sidebar extends React.Component {

  constructor(props) {
    super(props)

    this.state = { mode: SidebarMode.Main }
  }

  changeMode(newMode) {
    this.setState({ mode: newMode })
  }

  render() {
    const profileImg = this.renderProfileImg()
    const authorTitle = this.renderAuthorTitle()
    const menu = this.renderMenu()
    const contact = this.renderContact()
    const menuButton = this.renderMenuButton()
    const contactButton = this.renderContactButton()

    return this.compose(profileImg, authorTitle, menu, contact, menuButton, contactButton)
  }

  compose(profileImg, authorTitle, menu, contact, menuButton, contactButton) {

    const themeButton = (
      <ThemeButton className="sidebar__theme-button"/>
    )

    return (
      <PeekingToggle>
        <div id="sidebar" className="sidebar">
          {menuButton}
          {profileImg}
          {authorTitle}
          {contact}
          {menu}
          {themeButton}
          {contactButton}
        </div>
      </PeekingToggle>
    )
  }

  renderProfileImg() {
    return (
      <SidebarToggle main={true} menu={false} contact={true} {...this.state}>
        <ProfileImg className="sidebar__author-img"/>
      </SidebarToggle>
    )
  }

  renderAuthorTitle() {
    const language = this.context.layout.language.get()

    return (
      <SidebarToggle main={true} menu={false} contact={false} {...this.state}>
        <span className="sidebar__author-title">
          {Author.name[language.id]}
        </span>
        <p className="sidebar__author-subtitle">
          {Author.subtitle[language.id]}
        </p>
      </SidebarToggle>
    )
  }

  renderMenu() {
    const { layout } = this.context

    function navMenu(className) {
      return (
        <NavMenu
          linkDescriptions={SidebarLinks[layout.language.get().id]}
          classNamePrefix={`${className} sidebar__menu`}
          currentLinkId={layout.sidebarLinkId.get()}
        />
      )
    }

    return (
      <div className="sidebar__menu-container">
        <SidebarToggle main={false} menu={true} contact={false} {...this.state}>
          {navMenu("visible")}
          {navMenu("hidden")}
        </SidebarToggle>
      </div>
    )
  }

  renderContact() {
    return (
      <SidebarToggle main={false} menu={false} contact={true} {...this.state}>
        <nav className="sidebar__contact">
          <AuthorLinks />
        </nav>
      </SidebarToggle>
    )
  }

  renderMenuButton() {
    const isEnabled = this.state.mode === SidebarMode.Menu
    const newMode = (isEnabled) ? SidebarMode.Main : SidebarMode.Menu

    return (
      <Toggle isEnabled={isEnabled}>
        <button 
          className="sidebar__menu-button"
          onClick={() => this.changeMode(newMode)}
        >
          <i title="Menu" className="icon-menu" />
        </button>
      </Toggle>
    )
  }

  renderContactButton() {
    const isEnabled = this.state.mode === SidebarMode.Contact
    const newMode = (isEnabled) ? SidebarMode.Main : SidebarMode.Contact

    return (
      <Toggle isEnabled={isEnabled}>
        <button 
          className="sidebar__contact-button"
          onClick={() => this.changeMode(newMode)}
        >
          <i title="Contact" className="icon-info-circled" />
        </button>
      </Toggle>
    )
  }
}

Sidebar.contextType = Context

export default Sidebar

class SidebarToggle extends React.Component {
  render() {
    return (
      <Toggle isEnabled={this.isEnabled(this.props.mode)}>
        {this.props.children}
      </Toggle>
    )
  }

  isEnabled(mode) {
    // eslint-disable-next-line
    switch (mode) {
      case SidebarMode.Main:
        return this.props.main
      case SidebarMode.Menu:
        return this.props.menu
      case SidebarMode.Contact:
        return this.props.contact
    }
  }
}

class PeekingToggle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isEnabled: true}
    this.lastScrollY = null
    this.scrollUpRate = {
      firstEventTime: null,
      lastEventTime: null,
      firstScrollY: null
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.isFastScrollUp = this.isFastScrollUp.bind(this)
  }

  render() {
    return (
      <Toggle isEnabled={this.state.isEnabled}>
        {this.props.children}
      </Toggle>
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    const scrollY = window.scrollY
    
    const isScrollUp = this.lastScrollY && this.lastScrollY > scrollY
    this.lastScrollY = scrollY
    const isFastScrollUp = this.isFastScrollUp(event.timeStamp, scrollY, isScrollUp)

    const isInTopOfPage = scrollY <= window.innerHeight
    const isEnabled = isInTopOfPage || isFastScrollUp || (this.state.isEnabled && isScrollUp)

    if (isEnabled !== this.state.isEnabled) {
      this.setState({isEnabled})
    }
  }

  isFastScrollUp(eventTime, scrollY, isScrollUp) {

    const maxEventTimeGap = 100

    if (isScrollUp) {
      if (this.scrollUpRate.firstScrollY && 
          maxEventTimeGap > eventTime - this.scrollUpRate.lastEventTime) {
        this.scrollUpRate.lastEventTime = eventTime
      } else {
        this.scrollUpRate = {
          firstEventTime: eventTime,
          lastEventTime: eventTime,
          firstScrollY: scrollY
        }
      }

      const pixels = this.scrollUpRate.firstScrollY - scrollY
      const millis = this.scrollUpRate.lastEventTime - this.scrollUpRate.firstEventTime

      return pixels > 50 && (millis / pixels) < 10
    } else {
      this.scrollUpRate = {
        firstEventTime: null,
        lastEventTime: null,
        firstScrollY: null
      }
      return false
    }
  }
  
}