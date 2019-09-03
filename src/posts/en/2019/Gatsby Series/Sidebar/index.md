---
language: english
layout: post
demo: false
date: "2019-08-29T02"
title: "Gatsby - Part II: Sidebar"
path: "gatsby-sidebar"
category: "articles-en"
tags:
    - Web Development
    - Gatsby
    - React
    - JavaScript
    - CSS
series:
  path: "programming-with-gatsby"
  name: "Programming with Gatsby"
  order: 2
---

This is the second post in the series about creating a website with Gatsby, in which I'll be examining a technique for building a "sidebar".

As I've mentioned earlier [in my first post](/en/blog/2019/08/hello-world/), I wanted my blog to have a strong visual signature. I figured one way to achieve this is by having a permanent component across all pages with a visual item unique to me; say, my profile image. Moreover, it is probably a good idea to give quick access to all of the site's sections from any given page. It also happened that one of the Gatsby starter sites -- [Lumen v2](https://github.com/GatsbyCentral/gatsby-v2-starter-lumen), the one I eventually used -- featured what seemed to me as a nice looking sidebar. That how I knew I wanted to have a permanent sidebar in my blog.

## Mobile

After playing around with several layouts for the sidebar, I've decided to go with these components:
+ A profile image.
+ A title & a subtitle.
+ Contact links in the form of icons.
+ A theme toggle button.
+ A menu to navigate the different sections of the website.

Creating a design for a sidebar with all of these components becomes a bit of a problem when considering mobile screens. Mobile screens are just not wide enough to contain both the content of a page and the components of the sidebar next to it. The solution, as some of you mobile readers have probably noticed, is to make the sidebar a "topbar" on smaller screens, hovering at the top of the screen. This is hardly a new concept, and might even say it is a standard in mobile design.

That wasn't enough though, as one "line" at the top of a narrow screen wasn't enough to contain all of the components. Another modification was due then, and this time I chose to make both of the lists in the bar -- the contact links and the navigation menu -- collapsible; i.e, hidden at first but able to come into view with the click of a button.

### Collapsing Modes

One approach to collapsible components is to think of each "collapsing state" individually. In the case of my sidebar, there are 3 states - the initial "main" state with all the lists hidden, the state in which the navigation menu is shown and the contact links are hidden, and lastly the opposite state where the contact links are shown and the navigation menu is hidden:

```jsx:title=Sidebar/index.jsx
import React from 'react'

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
}
export default Sidebar
```

Since we're coding with React, which already has a different use for the term "state", I'll be referring to these collapsing states as "modes" from now on.

In each mode, some components are shown and some are hidden. Well, how do you hide components? You can do that by changing the `display` or `visibility` CSS properties of the components, but sometimes you want to have a more elaborate design of visibility; hence, it is best to assign a custom CSS class which indicates whether a component is enabled or disabled, and control each component behavior individually via CSS.

Let's create a generic component to control the "appearance" CSS class for our individual components:

```jsx:title=Toggle/index.jsx
import React from 'react'

class Toggle extends React.Component {
  render() {
    return (
      <div className={(this.props.isEnabled) ? "enabled" : "disabled"}>
        {this.props.children}
      </div>
    )
  }
}
export default Toggle
```

Let's also accompany it with some SASS mixins:

```scss:title=mixins/toggle.scss
@mixin enabled {
  .enabled > & {
    @content;
  }
}
@mixin disabled {
  .disabled > & {
    @content;
  }
}
```

And we will be using the `Toggle` component as so:

```jsx
const title = (
  <Toggle isEnabled={this.state.isTitleEnabled}>
    <h1 className="title">Eyal Roth</h1>
  </Toggle>
)
```

```scss
@import "scss/mixins/toggle";

title {
  @include enabled {
    transition: opacity 0.2s ease-in;
    opacity: 1;
  }
  @include disabled {
    opacity: 0;
  }
}
```

Changing the CSS class of a component, or any other attribute for that matter, is impossible once the component has been created. Sure, it is possible to modify the DOM after the `render` method in either `componentDidMount` or `componentDidUpdate`, but that is rather cumbersome and prone to error. This is why the `Toggle` component doesn't add the CSS class to the given components' `class` attribute, but rather wraps them with a `div` element annotated with said class.

The SASS mixins make sure to apply the styling only to direct descendants (`>`) of the toggle `div`s, making it possible to nest `Toggle` components without then interfering with one another.

Back to the sidebar components, each of them is either enabled or disabled according to the sidebar mode. Let's create a generic component to toggle our sidebar components according to each mode:

```jsx:title=Sidebar/index.jsx
import Toggle from '../Toggle'

class SidebarToggle extends React.Component {
  render() {
    return (
      <Toggle isEnabled={this.isEnabled()}>
        {this.props.children}
      </Toggle>
    )
  }
  isEnabled() {
    // eslint-disable-next-line
    switch (this.props.mode) {
      case SidebarMode.Main:
        return this.props.main
      case SidebarMode.Menu:
        return this.props.menu
      case SidebarMode.Contact:
        return this.props.contact
    }
  }
}
```

And now we can render all kind of different components in the sidebar:

```jsx:title=Sidebar/index.jsx
  renderTitle() {
    return (
      <SidebarToggle main={true} menu={false} contact={false} {...this.state}>
        <h1 className="sidebar__title">Eyal Roth</h1>
      </SidebarToggle>
    )
  }

  renderMenu() {
    return (
      <SidebarToggle main={false} menu={true} contact={false} {...this.state}>
        <nav className="sidebar__menu">
          {/* ... */}
        </nav>
      </SidebarToggle>
    )
  }
```

The title will be enabled for the `Main` mode, and disabled for the other two modes, while the menu will be enabled only for the `Menu` mode. The mode itself is passed from the `Sidebar`'s own state to the `SidebarToggle`. To make the menu collapsible, we need to make use of some (S)CSS:

```scss:title=Sidebar/style.scss
$z-index: 1;

sidebar {
  z-index: $z-index; // above the page content
  &__menu {
    position: absolute;
    width: 80vw;
    right: 0; // if you want to make it appear from the right
    transition:
        width 0.2s ease-out,
        opacity 0.2s ease-in,
    ; 
    @include enabled {
        opacity: 1;
        z-index: $z-index; // same as the sidebar itself
    }
    @include disabled {
        opacity: 0;
        width: 0;
    }
  }
}
```

Also, let's not forget the buttons that will allow the user to toggle between the different modes:

```jsx:title=Sidebar/index.jsx
  renderMenuButton() {
    const isEnabled = this.state.mode === SidebarMode.Menu
    const newMode = (isEnabled) ? SidebarMode.Main : SidebarMode.Menu
    return (
      <Toggle isEnabled={isEnabled}>
        <button className="sidebar__menu-button" onClick={() => this.changeMode(newMode)}>
          <i title="Menu" className="icon-menu" />
        </button>
      </Toggle>
    )
  }

  changeMode(newMode) {
    this.setState({ mode: newMode })
  }
```

Remember that the buttons might also have different styling when they are either enabled or disabled. This time we're using the simple `Toggle` instead of `SidebarToggle`, since we need to make use of the `isEnabled` variable to also determine what would be the mode that a button click would switch to.

And this is how our sidebar component `render` method would look like:

```jsx:title=Sidebar/index.jsx
  render() {
    return (
      <div className="sidebar">
        {this.renderMenuButton()}
        {this.renderProfileImage()}
        {this.renderTitle()}
        {this.renderMenu()}
        {this.renderContact()}
        {this.renderThemeButton()}
        {this.renderContactButton()}
      </div>
    )
  }
```

The ordering of the components should mostly reflect their order on larger screens, since with the smaller screens -- where the sidebar is a topbar -- we're controlling the components with `absolute` CSS positions.

Speaking of larger screens, we need to make sure that all of the work we've done for mobile screens won't reflect in the design of the bar-on-the-side. A common approach to designing a website is the "mobile first" approach - by default, you style the design for smaller screens, and then you add styling modifications to adjust the design to larger screens:

```scss:title=Sidebar/style.scss
@media screen and (min-width: 900px) { // this should be encapsulated in a mixin
  sidebar {
    z-index: unset;
    &__menu {
      position: unset;
      @include enabled {
          z-index: unset;
      }
      @include disabled {
          opacity: unset;
          width: unset;
      }
    }
    &-button {
      display: none;
    }
  }
}
```

Here, we are undoing all of the styling we previously declared which will interfere with the larger screens design. It might seem as we only need to worry about the `Main` state, since the concept of "modes" doesn't exist for larger screens (and that's why we're completely removing the buttons from the display), but in fact it is. First, devices can switch between portrait and landscape orientations, drastically changing the screen size. Then there's the option to reduce the window size on desktop screens, especially the width of the window. Lastly, this really helps when debugging your website in the developer tools, constantly switching between mobile and desktop views.

## Positioning

Up until now we've been dealing with the lack of space on mobile screens via collapsing components and multiple modes, but we have yet to position the sidebar on either small or large screens. In order to control the positioning of the sidebar, we first have to consider the general layout of a page in the site. For the purpose of this post we'll be using a simple page layout. I will be examining a more elaborate layout on a later post in this series.

```jsx:title=Layout/index.jsx
import React from 'react'
import Sidebar from '../Sidebar'
import './style.scss'

class Layout extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Sidebar/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

Every page in the website will render the `Layout` component as its top-most component, which will enforce the following styling:

```scss:title=Layout/style.scss
$topbar-height: 50px;
content {
  width: 90vw;
  margin: 0 auto;
  padding-top: $topbar-height;
}
sidebar { // actually located at Sidebar/style.scss
  position: fixed;
  width: 100vw;
  top: 0;
  height: $topbar-height;
}

@include breakpoint-md { // the @media query encapsulated in a mixin
  $content-width-md: 600px;
  content {
    width: $content-width-md;
    padding-top: 0;
  }
  sidebar {
    width: 230px;
    margin-left: calc(50vw + #{$content-width-md} / 2);
    height: 70vh;
    padding-top: 30vh;
  }
}
```

This is the most bare-bone styling needed to make the sidebar appear at the top of the page on smaller screens and to the side of the page on larger screens. There are actually multiple ways of achieving this behavior, as CSS is rather flexible, but I've found this technique to be simple and intuitive. Note that on smaller screens, the content is "shifted" down just enough so the topbar will not hide the top of the content. 

One important thing to note here is that this styling will behave the same for all screens larger than the "md" breakpoint (900px), and it's rather hard to find the exact styling that would fit this large variety of screens. Instead, you should add more "breakpoints" to adjust the styling according to sub-set of screen sizes. For my websites, I've been using the breakpoints in my styling sheets:
* `xsm: 360px;` - handsets in portrait mode.
* `sm: 600px;` - handsets in landscape mode, tablets in portrait mode. 
* `md: 900px;` - large handsets (landscape), tables (landscape), large tablets (portrait).
* `lg: 1280px;` - desktop.

Remember, it's not just about different devices, but it's also relevant for desktop screens when considering the ability to resize the window.

## Peeking Topbar

For the last part of this post, we'll slightly improve the behavior of the topbar by making it disappear when scrolling down a page, and reappearing on scroll up; hence, a "peeking topbar". Once again we will be using the toggle technique to style the appearance and disappearance of the topbar:

```scss:title=Sidebar/style.scss
sidebar {
  transition: transform 0.5s ease-out;
  @include disabled {
    transform: translateY(-$topbar-height - 10);
  }
}

@include breakpoint-md 
  sidebar {
    @include disabled {
      transform: unset;
    }
  }
}
```

We only need to define the disabled mode since the sidebar is enabled by default. Note that we're using `transform: translateY()` instead of `top`. The reason for this is because we want to disable this disappearance behavior on larger screens -- even when scrolling down a page -- but we don't want to accidentally disable any other `top` styling that might be declared.

Now that we have the styling in mind, we'll need to control when the sidebar is enabled or not. Since object-oriented design is nice and [composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) is a nice a good principle, we'll encapsulate the "peeking" functionality in a new component:

```jsx:title=Sidebar/index.jsx
class Sidebar extends React.Component {
  render() {
    return (
      <PeekingToggle>
        <div className="sidebar">
          {/* same as before */}
        </div>
      </PeekingToggle>
    )
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

    // we need to bind `this` because these will be invoked as an event listener
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
```

This is all just some fancy code to make sure the topbar is disabled when the page has been scrolled down at least one "screen height" (`100vh`), and that it reappears only if it's scrolled up "fast enough" (go ahead and adjust the numbers to your liking).

That's it for the sidebar. Stay tuned for the next posts in the series!