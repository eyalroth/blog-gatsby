---
language: english
layout: post
demo: 'false'
date: '2019-08-29T04'
title: 'Gatsby - Part IV: Sliding Navigation Menu'
path: 'gatsby-sliding-navigation-menu'
category: 'articles-en'
tags:
  - Web Development
  - Gatsby
  - React
  - JavaScript
  - CSS
series:
  path: 'programming-with-gatsby'
  name: 'Programming with Gatsby'
  order: 4
---

A navigation menu is a fairly standard concept in web design. In its most simplistic form, a navigation menu only provides links to the major sections of the website. An improved menu would also highlight the link of the section that the current page belongs to. On top of that, a menu might even animate the transformation from one highlighted link to another, when switching between different sections of the website.

The latter option was the one I wanted for my own website; but alas, I couldn't find a resource to cover this topic comprehensively enough, especially not with Gatsby in mind. In this post I hope to amend that and examine how to implement a sliding navigation menu in Gatsby.

## 1

First, let's place the site links in a central location in the project's repository:

```js title=src/constants/siteLinks.js
class MenuLink {
  constructor(id, label, path) {
    this.id = id
    this.label = label
    this.path = path
  }
}

const SiteLinks = Object.freeze({
  Home: new MenuLink('home', 'Home', `/`),
  Blog: new MenuLink('blog', 'Blog', `/blog`),
  About: new MenuLink('about', 'About', `/about`),
})

module.exports.SiteLinks = SiteLinks
```

This would become very useful as we will be using them in multiple locations in the code, such as in this example home page:

```jsx title=src/pages/index.jsx
import React from 'react'
import NavMenu from '../../components/NavMenu'
import { SiteLinks } from '../../constants/siteLinks'

export default () => (
  <div className="home">
    <NavMenu linkDescriptions={SiteLinks} currentLinkId={SiteLinks.Home.id} />
    {/* ... */}
  </div>
)
```

The homepage includes a navigation menu component which expects two parameters - (a) the navigation links and (b) the ID of the link that the current page (the homepage) belongs to.

The homepage is not the only page among the site links, so we would like to include the navigation menu in the other pages as well; for instance, in the about page:

```jsx title=src/pages/about.jsx
import React from 'react'
import NavMenu from '../../components/NavMenu'
import { SiteLinks } from '../../constants/siteLinks'

export default () => (
  <div className="about">
    <NavMenu linkDescriptions={SiteLinks} currentLinkId={SiteLinks.About.id} />
    {/* ... */}
  </div>
)
```

You might have noticed something peculiar in this example. The navigation menu component -- the `NavMenu` -- being used in the pages is in fact not shared between them, but is rather instantiated anew in each of them. This is a problem, since in order for the menu to animate the navigation between pages, it must know to which of the link the previous page belongs to. There is a possibility of maintaining a global state which keeps track of this information, but that would break the encapsulation of the navigation menu component.

Luckily, in [the previous post in the series](local::english/gatsby-layout), we examined how to implement a "singleton" layout which gives us the ability to share components between pages. We can now include the navigation menu as part of our site's layout:

```jsx title=src/components/Layout/index.jsx
import { SiteLinks } from '../../constants/siteLinks'

class Layout extends React.component {
  render() {
    // ...
    return (
      <div
        key={this.state.isClient}
        className={`global-container ${theme} ${language}`}
      >
        <NavMenu
          linkDescriptions={SiteLinks}
          currentLinkId={this.props.currentLinkId}
        />
        {this.props.children}
      </div>
    )
  }
}
```

Note that the `currentLinkId` property, much like the `language` property, is required in the context of a page when creating it:

```js title=gatsby-node.js
const { SiteLinks } = require('src/constants/siteLinks')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    createPage({
      path: '/',
      component: path.resolve(`src/components/Home.jsx`),
      context: {
        currentLinkId: SiteLinks.Home.id,
      },
    })
  })
}
```

This also means that we will no longer place the homepage -- or any other page with the navigation menu -- in the `src/pages` directory, as we would need to create them manually and not via the builtin Gatsby plugins which generate pages from this directory.

## 2

Now that we have some understanding of how the navigation menu component will be incorporated in our site, let's get to implementing it. The component will render a `nav` element which contains both a list (`ul`) of links and a `div` element beneath the list to represent the slider:

```html
<nav class="nav">
  <ul class="nav-list">
    <li class="nav-list-item">
      <a class="nav-list-link current" href="/">Home</a>
    </li>
    <li class="nav-list-item">
      <a class="nav-list-link not-current" href="/about">About</a>
    </li>
    <li class="nav-list-item">
      <a class="nav-list-link not-current" href="/blog">Blog</a>
    </li>
  </ul>
  <div class="nav-slider" />
</nav>
```

Merely rendering these elements is not enough. The `div` slider needs to change its visual properties -- such as size and position -- according to the visual properties of the "current" link, which are determined only when the browser draws the HTML, which happens after the rendering is already complete.

In order to gain access to the visual properties of the elements, we would need to save them aside using React Refs; then, once the component is mounted, we'll perform the visual changes on the slider:

```jsx title=src/components/NavMenu.jsx
import React from 'react'
import { Link } from 'gatsby'

class NavMenu extends React.Component {
  constructor(props) {
    super(props)

    this.sliderRef = React.createRef()
    this.links = {}
  }

  render() {
    const _this = this
    const { currentLinkId, linkDescriptions } = this.props

    return (
      <nav className="nav">
        <ul className="nav-list">
          {Object.values(linkDescriptions).map(createLinkItem)}
        </ul>
        <Slider ref={this.sliderRef} className="nav-slider" />
      </nav>
    )

    function createLinkItem(linkDescription) {
      const isCurrentCss =
        linkDescription.id === currentLinkId ? 'current' : 'not-current'

      return (
        <li className="nav-list-item" key={description.id}>
          <Link
            to={linkDescription.path}
            className={`nav-list-link ${isCurrentCss}`}
            ref={em => {
              _this.links[linkDescription.id] = em
            }}
          >
            {linkDescription.label}
          </Link>
        </li>
      )
    }
  }

  componentDidMount() {
    this.updateSlider()
  }

  componentDidUpdate() {
    this.updateSlider()
  }

  updateSlider() {
    const slider = this.sliderRef.current
    const currentLink = this.links[this.props.currentLinkId]
    slider.moveTo(currentLink)
  }
}
```

In the rendering method, we capture the `Slider` ref via `createRef()`, and we capture the link elements via callback-ref functions. There is no significant difference between the two methods; it's just a matter of convenience. Note that the anonymous callback function is not bound to the class, so it needs a different way to reference the class instance -- via `_this`, which is set to capture the class's instance at the beginning of the rendering method.

Later, whenever the menu is mounted or updated, we make sure to move the slider component to the link of the current page. This animation logic is encapsulated within a new `Slider` component class, which is placed in the same file as the menu component does:

```jsx title=src/components/NavMenu.jsx
class Slider extends React.Component {
    constructor(props) {
      super(props)
      this.state = {style: {}}
      this.sliderRef = React.createRef()
    }

    render() {
      return (
        <div ref={sliderRef} className="nav-slider" style={this.state.style}/>
      )
    }

    moveTo(link) {
      const { left: parentX } = this.parentRect()
      const { left: linkX, width } = link.getBoundingClientRect()
      const style = {
        left: this.pctOfParent(linkX - parentX),
        width,
      }
      this.setState({style})
    }

    parentRect() {
      return this.sliderRef.current.parentElement.getBoundingClientRect()
    }

    pctOfParent(x) {
      return `${x / this.parentRect().width * 100}%`
    }
}
```

<!-- TODO explain
- css (also transition)
- setting style "inline"
- getBoundingClientRect (docs)
- percentage because of resizing...
-->

TODO onresize

The assertion of whether the slider exists (`if (slider)`) may seem redundant -- after all, the slider is mounted whenever the `NavMenu` is mounted -- but later on we will have cases where the slider component is not always mounted along with the entire menu.

---

TODO explain logic for non-shared component (without singleton layout)
TODO explain: need to keep 'lastSliderLinkId' somewhere globally (context?)

<!-- TODO Use or delete -->
<!-- We added the `lastSliderLinkId` class member to know what was the last page the component was in before navigating between pages. Remember, in order to persist this information between pages we need to share the component via a "singleton" layout. -->
<!-- The logic then is quite straightforward: if there is a last page and if it's different than the current one, we need to create a "shift" animation between the two in the menu; otherwise, we need to place the slider at the current link in the menu (without animation). -->

```jsx title=src/components/NavMenu.jsx
class Slider extends React.Component {
    constructor(props) {
      this.state = {
        style: {},
        callback: null
      }
      this.slider = null
      this.shift = this.shift.bind(this)
    }

    render() {
      function sliderRendered(slider) {
        this.slider = slider
        if (this.state.callback) {
          this.state.callback()
        }
      }
      sliderRendered = sliderRendered.bind(this)

      return (
        <div ref={sliderRendered} className="nav-slider" style={this.state.style}/>
      )
    }

    setStyle(style, callback) {
      this.setState({style,callback})
    }

    shift({from, to}) {
      const { left: parentX } = this.parentRect()
      const { left: fromX, width: fromWidth  } = from.getBoundingClientRect()
      const { left: toX, width: toWidth } = to.getBoundingClientRect()

      const fromLeft = this.pctOfParent(fromX - parentX)
      const toLeft = this.pctOfParent(toX - parentX)

      const fromStyle = {
        left: fromLeft,
        width: fromWidth,
      }
      const toStyle = {
        left: toLeft,
        width: toWidth,
      }

      const _this = this
      this.setStyle(fromStyle, () => {
        setTimeout(() => _this.setStyle(toStyle), 0)
      })
    }
}
```

TODO explain
TODO explain: callback reasoning - two pass rendering to support sliders which unmount between pages ()
TODO explain: callback mechanism

---

# X

NAV MENU

- organizing links
- animated slider
  - move vs shift
    - note that "shift" is adjusted for when the component is first rendered (first draws the initial location and only then transitions the slider)
  - technique: react js + css
  - ltr vs rtl?
  - dynamic width and position according to menu text
    - collapsing menu
      - can't tell when draw is done
      - create duplicate nav menus
        - visible: the collapsible, buttons are visible and slider is hidden
        - hidden: non-collapsible, buttons are hidden and slider is visible
    - resizing / screen orientation
      - problem
        - resizing the screen makes the link components move
        - the slider position is set according to the components position
        - listening on "resize" event might make the position "update" run before the link component has finished moving
        - no event to listen to / hook to latch onto for the end of movement animation
      - solution
        - "re render" the components entirely
          - basically causes the components to be recreated
          - thus, there is no actual movement
      - breakpoints
        - "re render" only on breakpoint changes
          - they mark the most significant changes to the overall UI (including orinetation change)
          - otherwise it's too expensive and distracts the eye
        - share breakpoints with scss
      - UpdatedOnResize (encapsulation)
- what about no slider but only highlight?
  - CSS: slider display none
