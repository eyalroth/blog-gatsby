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
+ Permanent sidebar adjusted for both mobile and desktop screens.
+ Site layout with multi-language and color theme support.
+ Navigation menu with a moving slider.
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

const src = 'https://utteranc.es/client.js'

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
    script.setAttribute('src', src)
    script.setAttribute('repo', this.props.repository)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', 'github-light')
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
    // same as before (except for the src attribute)
    
    script.setAttribute('src', `${src}?v=${new Date().getTime()}`)
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

Note that now we also add a "fake" query to the source script with the current timestamp. The purpose of this query is to make sure the script is never cached; otherwise, in case the internet connection breaks, the initial script will load successfully (since it's cached), but it will fail loading any other resource (since there's no internet connection), and you won't get an event for that, eventually preventing you from alerting your users about the failure.

### Theme Change

As seen before, the utterances script supports multiple themes by accepting a theme parameter. If your website has only one design, you may simply choose the utterances theme that best suits you. On the other hand, if your website allows for choosing a theme -- for instance, a light theme and a dark theme -- you'd might want to have a different utterances theme for each of your site's themes. There are multiple ways of implementing a theme change, but I believe the best way is to make sure the theme changes without reloading the entire page.

I will be examining the full theme-change solution in a later post. For now, I'll be focusing on integrating your website's theme change with the utterances script. What you need to know for now is that the theme change is controlled via a [React context](https://reactjs.org/docs/context.html): Every time the user changes the theme, the context will get updated with the new theme, and the `Utterances` component will be invoked with `componentDidUpdate`, even though neither its `state` nor its `props` have changed.

The idea is to load a new script once per _utterances_ theme (not per site theme), and only when that theme has been switched to. When the user switches between the themes, we will keep the previously loaded script(s), but will hide them with `display: none` and only show the script for the current theme.

The `Utterances` component state will now keep both the current loading status and the current (utterances) theme. Whenever the (site) theme changes, the component will check whether its current theme matches the new theme. If they don't match, the component will proceed to check whether the new theme script was loaded before. If it did, then it will simply update the current state; otherwise, it will also create the new script just as before.

```jsx:title=Utterances/index.jsx
// same as before
import Context from '../Context' // the react context; more on that in a later post

class Utterances extends React.Component {
  constructor(props) {
    // same as before
    this.themeStatus = {}
    this.state = {status: "", theme: null}
  }

  componentDidUpdate() {
    this.loadScript()
  }

  loadScript() {
    const theme = this.context.theme.get().utterances // get the current theme from the context

    if (theme !== this.state.theme) {
      let status = "loading"

      if (theme in this.themeStatus) {
        status = this.themeStatus[theme]
      } else {
        this.themeStatus[theme] = status
        const script = this.createScript(theme)
        this.rootElm.current.appendChild(script)
      }

      this.setState({
        status,
        theme,
      })
      // only display current theme's script element
      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }
  }

  createScript(theme) {
    // same as before (except for the event listeners and theme attribute)

    script.setAttribute('theme', theme.utterances)
    script.addEventListener("load", () => this.scriptLoaded(theme, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme, false), {once: true})

    const div = document.createElement('div')
    div.id = theme
    div.appendChild(script)
    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({
      status,
      theme,
    })
  }
}

Utterances.contextType = Context // "hook" the Utterances component to the context
```

And this is how the themes look like:

```jsx:title=themes.jsx
class Theme {
    constructor(id, utterances) {
        this.id = id
        this.utterances = utterances
    }
}

const Themes = Object.freeze({
    Light: new Theme('light', 'github-light'),
    Dark: new Theme('dark', 'photon-dark'),
})
module.exports.Themes = Themes
``` 

You'll note that the theme status "history" is _not_ kept in the component state, but rather in the `this.themeStatus` map. This is because it's a bit cumbersome to update a map nested within the state map, but it's definitely do-able.

One small caveat is that any interaction the user is making with the script will be "forgotten" when a theme changes. For instance, if the user started writing a comment in the editor and then switched to another theme, the comment will disappear. This is because there are two different scripts in place which do not share data. Switching back to the previous theme will bring back the changes.

### Full Example

Let's see how this all comes together:

```jsx:title=Utterances/index.jsx
import React from 'react'
import Context from '../Context'
import './style.scss'

const src = 'https://utteranc.es/client.js'

class Utterances extends React.Component {
  constructor(props) {
    super(props)

    this.rootElm = React.createRef()
    this.themeStatus = {}
    this.state = {
      status: "",
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

  loadScript() {
    const theme = this.context.theme.get().utterances

    if (theme !== this.state.theme) {
      let status = "loading"
      
      if (theme in this.themeStatus) {
        status = this.themeStatus[theme]
      } else {
        this.themeStatus[theme] = status
        const script = this.createScript(theme)
        this.rootElm.current.appendChild(script)
      }

      this.setState({
        status,
        theme,
      })
      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }

  }

  createScript(theme) {
    const script = document.createElement('script')

    script.setAttribute('src', `${src}?v=${new Date().getTime()}`)
    script.setAttribute('repo', this.props.repository)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', theme)

    script.addEventListener("load", () => this.scriptLoaded(theme, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme, false), {once: true})

    const div = document.createElement('div')
    div.id = theme
    div.appendChild(script)
    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({
      status,
      theme,
    })
  }
}

Utterances.contextType = Context
export default Utterances
```

Don't forget the SCSS file from earlier (`Utterances/style.scss`), and stay tuned for the next posts in the series which will elaborate and further examine the theme change feature via React context.