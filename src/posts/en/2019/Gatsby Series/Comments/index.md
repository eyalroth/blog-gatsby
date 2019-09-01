---
language: english
layout: post
demo: false
date: "2019-08-29T01"
title: "Gatsby - Part I: Comments"
path: "gatsby-comments"
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
  order: 1
---

Throughout the development process of this website I've encountered several problems, and have failed to find any resources online discussing these problems and the ways to overcome them. Therefore, I had to solve these problems on my own, and thought it would be appropriate to share my solutions with others.

In this series of posts I will be examining problems with Gatsby and React, and how to overcome them. Among these topics are: 
+ Integration of readers comments (covered in this post).
+ Site layout with multi-language and color theme support.
+ Sidebar with navigation menu.
+ Tricks with images - dragging and featuring on social media platforms.

I believe this series should be relevant to anyone developing a website using Gatsby, and perhaps it would be even more relevant to those who are developing a blog or a personal site, as that was my goal when developing this website.

A caveat though - I had no experience with Gatsby nor with React prior to building this website. In fact, this is my first ever web project. It might also be important to note that my website is not compatible with Internet Explorer, so it may very well be that some of what's shown in this series will not be compatible with that browser as well.

## Readers Comments

It's no surprise that comments are a core feature of any blogging platform out there -- WordPress, Blogger, Medium, etc -- as that is an integral part of any website with published content; be it a blog, an online newspaper, a social network (Facebook, Twitter), a video platform (YouTube) or an online forum (Reddit).

Gatsby on the other hand is a static site generator, which means it does not have builtin support for dynamic concent, and comments are dynamic by nature. Not all is lost though; Gatsby is able to integrate with several tools [listed in the documentation](https://www.gatsbyjs.org/docs/adding-comments/), but the majority of them either require payment or include ads (Disqus I'm looking at you). The only tool on the list that is both free and has no ads is [Staticman](https://staticman.net/), but it's a bit cumbersome as it introduces a new PR and build per comment, and it leaves the visual design of the comments to the developer.

This is actually the reason I dismissed Gatsby when I first searched for a blogging platform, but then I stumbled upon [utterances](https://utteranc.es/). It is free of both payment and ads, much like Staticman, but unlike the latter, it is much less cumbersome as it relies on GitHub issues, which means it doesn't pollute your repository with PRs, doesn't require a build to generate comments, comes with the builtin design of GitHub issues (including theme support!) and gives users the ability to write *and edit* comments using the GitHub editor. The only downside is that it requires a GitHub user, unlike other services that allow for authentication via social networks, but that should be enough as a start for a blog focusing on content for technical readers.

## Utterances

Gatsby heavily relies on React, therefore it's best to encapsulate the comments functionality via Utterances in a React component.

First, let's examine how we will be using this component:
```jsx
import React from 'react'
import { graphql } from 'gatsby'
import Utterances from '../Utterances'

export default ({ data }) => (
  <div>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>We're a very cool website you should return to often.</p>
    <Utterances repository={data.site.siteMetadata.utterances}
  </div>
)

export const pageQuery = graphql`
  query {
      site {
        siteMetadata {
          title
          utterances
        }
      }
  }
`
```

This code is taken from an example in [the guide on querying with GraphQL](https://www.gatsbyjs.org/docs/querying-with-graphql), with the addition of a custom `Utterances` component which requires a link to the GitHub repository where the comments are hosted. The link is configured in the site metadata:

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    utterances: process.env.UTTERANCES_REPO,
  }
}
```

You'll notice the link is configured via an environment variable named `UTTERANCES_REPO`. This will allow us to set a different repository per environment (development, staging, production, etc). See [the documentation](https://www.gatsbyjs.org/docs/environment-variables/) on how to do that.

### React Component

Now let's see about the `Utterances` component itself:
```jsx:title=Utterances/index.jsx
import React from 'react'

class Utterances extends React.Component {
  constructor(props) {
    super(props)
    this.rootElm = React.createRef()
  }

  render() {
    return (
      <div ref={this.rootElm}/>
    )
  }

  componentDidMount() {
    this.loadScript()
  }

  loadScript() {
    const script = this.createScript()
    this.rootElm.current.appendChild(script)
  }

  createScript() {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('repo', this.props.repository)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    return script
  }
}

export default Utterances
```

What we have here is a React component class which renders an empty `div` and, once mounted, appends the Utterances `script` as its child via [a Ref](https://reactjs.org/docs/refs-and-the-dom.html). The arguments for the script are as instructed in [the tool's site](https://utteranc.es).

This is possibly the simplest way to load any script with React, which also makes sure to only load the script once when the component is first mounted. As of its current version, the script does not query for updates on its own, so in order to view new comments one must reload the script by refreshing the page.

### Loading Indicator

Even though the script is quite light, it may take a few moments until it fully loads. More importantly, the script might sometimes fail to load, and you want your users to be aware of that when that happens (and not by checking the console). Since most gatsby websites make use of a [service worker to cache their content](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/), your page may very well still load without an internet connection, but in such case the script will not load.

So let's add a loading indicator to our `Utterances` component:
```jsx:title=Utterances/index.jsx
// same as before
import './style.scss'

class Utterances extends React.Component {
  constructor(props) {
    // same as before
    this.state = {status: "loading"}
  }

  render() {
    return (
      <div ref={this.rootElm} className={`utterances ${this.state.status}`}/>
    )
  }

  createScript() {
    // same as before
    script.addEventListener("load", () => this.scriptLoaded(true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(false), {once: true})
    return script
  }

  scriptLoaded(success) {
    this.setState({status: success ? "success" : "fail"})
  }
}
```

And accompany it with a new SCSS file:
```scss:title=Utterances/style.scss
.utterances {
    text-align: center;
    &.loading::before {
      content: "Loading comments..."
    }
    &.fail::before {
      color: red;
      content: "⚠️ Failed loading comments (no internet?) ⚠️"
    }
}
```

We are maintaining the status of the script with a CSS `class` attribute on the empty `div` tag. Since our indicator is fairly simple (only text), CSS is suffice to describe it. Furthermore, if you happen to have a multi-language site, you'd want the text to match the language of the page, which can be done with the help of SASS mixin (more on that in a later post).

### Theme Toggle

// TODO intro

```jsx:title=Utterances/index.jsx
// same as before
import Context from '../Context'
import { Themes } from '../../consts/themes'

class Utterances extends React.Component {
  constructor(props) {
    // same as before
    this.themeStatus = {}
    this.state = {status: "loading", theme: null}
  }

  componentDidUpdate() {
    this.loadScript()
  }

  loadScript() {
    const theme = this.context.theme.get().id

    if (theme !== this.state.theme) {
      this.setState({status: "loading", theme})
    } else {
      if (!(theme in this.themeStatus)) {
        const script = this.createScript(theme)
        const existingScript = Array.from(this.rootElm.current.children).find(elem => elem.id === script.id)
        if (existingScript) {
          this.rootElm.current.removeChild(existingScript)
        }
        this.rootElm.current.appendChild(script)
      } else if (this.state.status !== this.themeStatus[theme]) {
        this.setState({status: this.themeStatus[theme]})
      }

      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }
  }

  createScript(theme) {
    // same as before (except for the event listeners)

    const githubTheme  = (function(theme) {
      // eslint-disable-next-line
      switch(theme) {
        case Themes.Light.id:
          return 'github-light'
        case Themes.Dark.id:
          return 'photon-dark'
      }
    })(theme)
    script.setAttribute('theme', githubTheme)
    script.addEventListener("load", () => this.scriptLoaded(theme.id, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme.id, false), {once: true})

    const div = document.createElement('div')
    div.id = theme.id
    div.appendChild(script)
    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({status})
  }
}

Utterances.contextType = Context
```

// TODO
- eslint
  - i don't want a default case
  - could add the utterances theme to the Theme object instead of a switch
- imagine we get context updates on theme change
  - more on that in a different post
- awkward to use react "state"
  - loading a the script is pure javascript, no react rendering
- writing in one theme and then swapping "forgets" the changes
  - but switching back remembers them

### Full Example

Let's see how this all comes together:

```jsx:title=Utterances/index.jsx
import React from 'react'
import Context from '../Context'
import { Themes } from '../../consts/themes'
import './style.scss'

class Utterances extends React.Component {
  constructor(props) {
    super(props)
    this.rootElm = React.createRef()
    this.themeStatus = {}
    this.state = {
      status: "loading",
      theme: null,
    }
  }

  render() {
    return (
      <div ref={this.rootElm} className={`utterances ${this.state.status}`}/>
    )
  }

  componentDidMount() {
    this.loadScript()
  }
  
  componentDidUpdate() {
    this.loadScript()
  }

  updateClassName(status) {
    this.rootElm.current.className = `utterances ${status}`
  }

  loadScript() {
    const theme = this.context.theme.get().id

    if (theme !== this.state.theme) {
      this.setState({status: "loading", theme})
    } else {
      if (!(theme in this.themeStatus)) {
        const script = this.createScript(theme)
        const existingScript = Array.from(this.rootElm.current.children).find(elem => elem.id === script.id)
        if (existingScript) {
          this.rootElm.current.removeChild(existingScript)
        }
        this.rootElm.current.appendChild(script)
      } else if (this.state.status !== this.themeStatus[theme]) {
        this.setState({status: this.themeStatus[theme]})
      }

      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }
  }

  createScript(theme) {
    const githubTheme  = (function(theme) {
      // eslint-disable-next-line
      switch(theme) {
        case Themes.Light.id:
          return 'github-light'
        case Themes.Dark.id:
          return 'photon-dark'
      }
    })(theme)

    const div = document.createElement('div')
    div.id = theme

    const script = document.createElement('script')

    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('repo', this.props.repository)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', githubTheme)

    script.addEventListener("load", () => this.scriptLoaded(theme, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme, false), {once: true})

    div.appendChild(script)

    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({status})
  }
}

Utterances.contextType = Context
export default Utterances
```

// TODO
- don't forget the SCSS file
- stay tuned for more