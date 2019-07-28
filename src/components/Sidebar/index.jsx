import React from 'react'
import ContextConsumer from '../Context'
import AuthorLinks from '../AuthorLinks'
import ProfileImg from '../ProfileImg'
import NavMenu from '../NavMenu'
import { Author } from '../../consts/author'
import { SidebarLinks } from '../../consts/menuLinks'
import Toggle from '../Toggle'
import './style.scss'

const SidebarMode = Object.freeze({
  Main: "main",
  Menu: "menu",
  Contact: "contact"
})

class Sidebar extends React.Component {

  constructor(props) {
    super(props)

    this.state = { isEnabled: true, mode: SidebarMode.Main }
    this.lastScrollY = null
    this.scrollUpRate = {
      firstEventTime: null,
      lastEventTime: null,
      firstScrollY: null
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.calcScrollUpRate = this.calcScrollUpRate.bind(this)
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

    return (
      <Toggle isEnabled={this.state.isEnabled}>
        <div id="sidebar" className="sidebar">
          {menuButton}
          {profileImg}
          {authorTitle}
          {contact}
          {menu}
          {contactButton}
        </div>
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
    const isFastScrollUp = this.calcScrollUpRate(event.timeStamp, scrollY, isScrollUp)

    const isInTopOfPage = scrollY <= window.innerHeight
    const isEnabled = isInTopOfPage || isFastScrollUp || (this.state.isEnabled && isScrollUp)

    if (isEnabled != this.state.isEnabled) {
      this.setState({isEnabled})
    }
  }

  calcScrollUpRate(eventTime, scrollY, isScrollUp) {

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

  renderProfileImg() {
    return (
      <SidebarToggle main={true} menu={false} contact={true} {...this.state}>
        <ContextConsumer>
          {context => (
            <ProfileImg
              className="sidebar__author-img"
              languageId={context.data.languageId}
            />
          )}
        </ContextConsumer>
      </SidebarToggle>
    )
  }

  renderAuthorTitle() {
    return (
      <SidebarToggle main={true} menu={false} contact={false} {...this.state}>
        <ContextConsumer>
          {context => (
            <span className="sidebar__author-title">
              {Author.name[context.data.languageId]}
            </span>
          )}
        </ContextConsumer>
        <ContextConsumer>
          {context => (
            <p className="sidebar__author-subtitle">
              {Author.subtitle[context.data.languageId]}
            </p>
          )}
        </ContextConsumer>
      </SidebarToggle>
    )
  }

  renderMenu() {
    return (
      <SidebarToggle main={false} menu={true} contact={false} {...this.state}>
        <ContextConsumer>
          {context => (
            <NavMenu
              id="sidebar-links"
              languageId={context.data.languageId}
              linkDescriptions={SidebarLinks[context.data.languageId]}
              classNamePrefix="sidebar__menu"
              currentLinkId={context.data.sidebar.linkId}
            />
          )}
        </ContextConsumer>
      </SidebarToggle>
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
    const isEnabled = this.state.mode == SidebarMode.Menu
    const newMode = (isEnabled) ? SidebarMode.Main : SidebarMode.Menu

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
    const isEnabled = this.state.mode == SidebarMode.Contact
    const newMode = (isEnabled) ? SidebarMode.Main : SidebarMode.Contact

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
}

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