require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

import littlefoot from 'littlefoot'
import 'littlefoot/dist/littlefoot.css'
import './src/assets/scss/_progress.scss'

var sidebarState = "main"
var lastUnderlineLink = null

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    )
  
    if (answer === true) {
      window.location.reload()
    }
}

export function onRouteUpdate({ location }) {
  addLittlefoot()
  addSidebarCollapse(location)
}

function addLittlefoot() {
  const bt = `
    <button
        aria-controls="fncontent:<%= id %>"
        aria-expanded="false"
        aria-label="Footnote <%= number %>"
        class="littlefoot-footnote__button"
        id="<%= reference %>"
        rel="footnote"
        title="See Footnote <%= number %>"
    />
        <%= number %>
    </button>
  `
  littlefoot({buttonTemplate: bt})
}

function addSidebarCollapse(location) {

  if (location.pathname == "/") {
    sidebarState = "main"
    lastUnderlineLink = null
  }

  if (document.getElementById("sidebar")) {
    const menu = document.getElementById("sidebar__menu")
    const menuButton = document.getElementById("sidebar__menu-button")
    const menuLinks = document.getElementsByClassName("sidebar__menu-list-item-link")
    const menuUnderline = document.getElementById("sidebar__menu-underline")

    const contact = document.getElementById("sidebar__contact")
    const contactButton = document.getElementById("sidebar__contact-button")

    const profileImage = document.getElementById("sidebar__author-img")
    const authorTitle = document.getElementById("sidebar__author-title")

    setSidebarState(sidebarState)
    setupUnderline(location)

    menuButton.addEventListener("click", () => toggle("menu-button"))
    contactButton.addEventListener("click", () => toggle("contact-button"))

    function toggle(buttonClicked) {
      if (buttonClicked == "menu-button") {
        if (sidebarState == "menu") {
          setSidebarState("main")
        } else {
          setSidebarState("menu")
        }
      } else if (buttonClicked == "contact-button") {
          if (sidebarState == "contact") {
            setSidebarState("main")
          } else {
            setSidebarState("contact")
          }
      }
    }

    function setSidebarState(state) {

      sidebarState = state
    
      if (state == "main") {
        enable(profileImage)
        enable(authorTitle)
        disable(menu)
        disable(menuButton)
        disable(contact)
        disable(contactButton)
      } else if (state == "menu") {
        disable(profileImage)
        disable(authorTitle)
        enable(menu)
        enable(menuButton)
        disable(contact)
        disable(contactButton)
      } else if (state == "contact") {
        enable(profileImage)
        disable(authorTitle)
        disable(menu)
        disable(menuButton)
        enable(contact)
        enable(contactButton)
      }
    }

    function setupUnderline(location) {

      const lastLink = findMatchingLink(lastUnderlineLink)
      const currentLink = findMatchingLink(location)

      if (currentLink) {
        if (lastLink) {
          setUnderline(lastLink)
          shiftUnderline({from: lastLink, to: currentLink})
        } else {
          if (menu.getBoundingClientRect().width > 0) {
            setUnderline(currentLink)
          } else {
            menuButton.addEventListener('click', () => {
              menu.addEventListener('transitionend', () => {
                setUnderline(currentLink)
              }, {once: true})
            }, {once: true})
          }
        }
        lastUnderlineLink = currentLink
      } else {
        lastUnderlineLink = null
      }

      function setUnderline(link) {
        const { left, width } = link.getBoundingClientRect()
        menuUnderline.style.left = `${left}px`
        menuUnderline.style.width = `${width}px`
      }
      
      function shiftUnderline({from, to}) {
        const { left: fromX  } = from.getBoundingClientRect()
        const { left: toX, width } = to.getBoundingClientRect()
        menuUnderline.style.transform = `translateX(${toX - fromX}px)`
        menuUnderline.style.width = `${width}px`
      }
    }
    
    function enable(item) {
      item.classList.add(`${item.id}-enabled`)
      item.classList.remove(`${item.id}-disabled`)
    }

    function disable(item) {
      item.classList.add(`${item.id}-disabled`)
      item.classList.remove(`${item.id}-enabled`)
    }
    
    function findMatchingLink(location) {
      
      if (location == null) {
        return null
      }

      for (let i = 0; i < menuLinks.length; i++) {
        let link = menuLinks[i]
        if (noTrailingSlash(link.pathname) == noTrailingSlash(location.pathname)) {
          return link    
        }
      }

      return null

      function noTrailingSlash(pathname) {     
        return pathname.replace(/\/$/, "")
      }
    }
  }
}