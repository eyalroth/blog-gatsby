require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

import littlefoot from 'littlefoot'
import 'littlefoot/dist/littlefoot.css'
import './src/assets/scss/_progress.scss'

var sidebarState = "main"

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
  }

  if (document.getElementById("sidebar")) {
    const menu = document.getElementById("sidebar__menu")
    const menuButton = document.getElementById("sidebar__menu-button")

    const contact = document.getElementById("sidebar__contact")
    const contactButton = document.getElementById("sidebar__contact-button")

    const profileImage = document.getElementById("sidebar__author-img")
    const authorTitle = document.getElementById("sidebar__author-title")

    setSidebarState(sidebarState)

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

    function enable(item) {
      item.classList.add(`${item.id}-enabled`)
      item.classList.remove(`${item.id}-disabled`)
    }

    function disable(item) {
      item.classList.add(`${item.id}-disabled`)
      item.classList.remove(`${item.id}-enabled`)
    }
  }
}