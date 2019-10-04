---
language: english
layout: post
demo: "false"
date: '2019-08-29T03'
title: 'Gatsby - Part III: Layout'
path: 'gatsby-layout'
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
  order: 3
---

It is fairly common for a website to have a certain layout with multiple components appearing in most or all pages and located at the same place on each page. There could be other, more abstract properties shared between pages, and those are often considered as part of the site layout as well. Some of these components, much like non-layout components, may exhibit a dynamic behavior where they change their content or appearance, triggered either by page navigation or any other user interaction.

In this post, I'll be examining how to implement a layout in Gatsby with two dynamic and abstract "components", affecting multiple other components in the page:

1. A UI theme, affecting the colors and other styling properties, and controlled by the user via a button.
2. A display language, affecting the content and orientation, and configured individually for every page.

## Singleton vs Multiton

At first, the Gatsby team had realized the importance of layouts and included builtin support for them. In version 1, Gatsby had a special layout component that was wrapped around a page and persisted between different pages. There was only one instance of the layout component in the entire application -- a "singleton".

Later, while developing version 2 -- the current version -- the Gatsby team [has decided to drop out the special layout components](https://www.gatsbyjs.org/blog/2018-06-08-life-after-layouts/). The motivation behind this decision, other than internal complexity and performance boost, was to remain true to do React's compositional model, and to eliminate confusion regarding how the special layout component communicates with the other page components. Instead, in this model, each page is responsible for instantiating a layout component and nest the unique page components inside of it.

The instantiation of the layout component on each page -- now a "multiton" -- means that the layout and its components -- such as a footer or a sidebar -- are not shared between pages at all, which gives rise to certain disadvantages. One of the more apparent disadvantages with this model is the difficulty to implement animation when pages change; for instance, a transition of a navigation menu. Another main disadvantage is the reduced encapsulation of layout components, which cannot maintain their state between pages, and are forced to persist it someplace global; for instance, maintaining the "mode" of a sidebar between pages now has to be persisted outside of the sidebar component.

The Gatsby team did however keep the early native support for layout components [via a plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-layout/), which basically re-implements the "singleton" model that existed in Gatsby 1. This is great, because this gives us developers the choice of which model to use. I eventually chose to go with the "singleton" model using the plugin, mostly due to the encapsulation of the layout components. This approach comes at a cost, though, and I will be examining the ways to mitigate it.

## UI Theme

Let's start by implementing a layout with a UI color theme:

```jsx title=Layout/index.jsx
import React from 'react'

export default ({ children }) => {
  return <Layout>{children}</Layout>
}

class Layout extends React.Component {
  render() {
    return (
      <div className={`global-container ${theme}`}>{this.props.children}</div>
    )
  }
}
```

We would also need to configure the layout plugin to use this component:

```js title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.jsx`),
      },
    },
  ],
}
```

Now we have a "global container" `div` with a `class` attribute specifying the current theme, and using these SASS mixins:

```scss title=scss/themes.scss
@mixin light {
  .theme-light & {
    @content;
  }
}

@mixin dark {
  .theme-dark & {
    @content;
  }
}
```

we can fit the styling of different components to each theme:

```scss title=Footer/style.scss
@import 'scss/themes';

.footer {
  height: 30px;
  @include light {
    background-color: white;
  }
  @include dark {
    background-color: black;
  }
}
```

### Context

You may have noticed that the `Layout` component expects the value of the current theme in the variable `theme`, but this variable is not defined. Of course, we can just initiate it in the component with some value, but then how can the user control it? We will want some other component to be responsible for allowing the user to change the theme; say, by clicking a button -- aka a `ThemeButton` component -- which will be nested somewhere inside our page.

What we need is a way for a component to communicate with its parent. The React team acknowledged this requirement and introduced a construct named [Context](https://reactjs.org/docs/context.html). In a sense, it acts as a state shared between any component registered to the context, making sure to update (re-render) these components upon modifications.

Let's examine how the `Layout` and `ThemeButton` components will be using the context:

```jsx title=Layout/index.jsx
import React from 'react'
import Context, { ContextProvider } from '../Context'

export default ({ children }) => {
  return (
    <ContextProvider>
      <Layout>{children}</Layout>
    </ContextProvider>
  )
}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isClient: false }
  }
  render() {
    return (
      <div
        key={this.state.isClient}
        className={`global-container ${this.context.theme.get()}`}
      >
        {this.props.children}
      </div>
    )
  }
  componentDidMount() {
    this.setState({ isClient: true })
  }
}
Layout.contextType = Context
```

```jsx title=ThemeButton/index.jsx
import React from 'react'
import Context from '../Context'

class ThemeButton extends React.Component {
  render() {
    const { theme } = this.context

    return <button className="theme-button" onClick={toggleTheme} />

    function toggleTheme() {
      const newTheme =
        theme.get() === 'theme-light' ? 'theme-dark' : 'theme-light'
      theme.set(newTheme)
    }
  }
}
ThemeButton.contextType = Context
```

This is the standard pattern for using a context - the entire layout (and thereby the entire page) is wrapped with a provider, and the two components are registered to the context via `.contextType = Context`, and so they are able to access it via `this.context`. You might recognize this pattern from [the first post in the series](local::english/gatsby-comments), where we examined how to "listen" to theme changes in the `Utterances` component. However, there are two oddities here.

#### Hydration

The first notable oddity is the addition of the `isClient` property to the `Layout` state. It is completely unrelated to the context; rather, its sole purpose is to provide a workaround to a very common problem with Gatsby, where the attributes of HTML elements would sometimes not get updated appropriately. This is happening due to the nature of Gatby, being mostly a server-side rendering (SSR) framework and heavily relying on React's [hydration functionality](https://reactjs.org/docs/react-dom.html#hydrate).

This problem will most likely affect any website adopting the pattern examined in this post, especially if the website is also using [the offline plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) (which is quite common), and will potentially creep into your website regardless if you choose to adopt this layout pattern. For more information on this, visit [this issue in the Gatsby repository](https://github.com/gatsbyjs/gatsby/issues/17914).

#### Access Layer

The second oddity, which is much less notable than the first, is how the `theme` context property has both `get` and `set` methods, granting access to query and modify the property in the context -- but how? Let's find out:

```jsx title=Context/index.jsx
import React from 'react'

const Context = React.createContext({})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.provided = {
      theme: new ThemeContextProvider(this),
    }
  }
  render() {
    return (
      <Context.Provider value={{ ...this.provided }}>
        {this.props.children}
      </Context.Provider>
    )
  }
  get(property) {
    return this.state[property]
  }
  set(property, value) {
    if (this.get(property) !== value) {
      const newState = {}
      newState[property] = value
      this.setState({
        ...this.state,
        newState,
      })
    }
  }
}

export { Context as default, ContextProvider }

class ThemeContextProvider {
  constructor(provider) {
    this.provider = provider
  }
  get() {
    let theme = this.provider.get('theme')
    if (!theme) {
      theme = 'theme-light' // default value
    }
    return theme
  }
  set(newTheme) {
    this.provider.set('theme', newTheme)
  }
}
```

Again, this is a fairly standard pattern where we have the `ContextProvider` as a component holding the shared state and providing the registered components access to that state. The only enhancement here is the added abstraction over the access layer -- the `ThemeContextProvider` -- which is a mere non-component class, solely responsible for accessing the theme property.

It is very useful to have this additional layer, as some properties may be needed to be persisted someplace other than the context; for instance, we can store the theme in a browser cookie as well:

```jsx
import Cookies from 'js-cookie'

class ThemeContextProvider {
  get() {
    let theme = this.provider.get('theme')
    if (!theme) {
      theme = Cookies.get('theme')
      if (!theme) {
        theme = 'theme-light'
      }
    }
    return theme
  }
  set(newTheme) {
    Cookies.set('theme', newTheme, { path: '/' })
    this.provider.set('theme', newTheme)
  }
}
```

## Language

Now that our layout has a UI theme, let's move on to the next feature - language. Like the theme, the language is an abstract concept that affects multiple components in the page; but unlike the theme, the language is not a property persisted across pages, but rather each page determines the language on its own. This is a significant difference between the two features, and it exposes one of the major disadvantages of the "singleton" layout model.

We would like to include the language in our layout just the same way we did with the theme; that is, we want it to specify it in the `class` attribute of our global container `div`, and we want to persist it in our context:

```jsx title=Layout/index.jsx
class Layout extends React.Component {
  render() {
    const theme = this.context.theme.get()
    const language = // ???
    return (
      <div key={this.state.isClient} className={`global-container ${theme} ${language}`}>
        {this.props.children}
      </div>
    )
  }
}
```

And if we were to go with the "multiton" layout model, we would just pass the language to the `Layout`:

```jsx title=Page/index.jsx
import React from 'react'
import Layout from '../Layout'

class Page extends React.Component {
  render() {
    return <Layout language="english">{/*...*/}</Layout>
  }
}
```

But in the "singleton" model that we use, the `Page` doesn't wrap its content with the `Layout` component on its own -- but rather by the layout plugin -- and so it cannot pass `props` to it. Instead, the only way it can communicate with the `Layout` component is via the context. OK then, let's try this again:

```jsx title=Page/index.jsx
import React from 'react'
import Context from '../Context'

class Page extends React.Component {
  render() {
    this.context.language.set('english')
    return /*...*/
  }
}
Page.contextType = Context
```

This, however, won't work either, and for three reasons:

1. The `Layout` is rendered before the `Page`, so on its first render, the language property will have no value. It might be possible to have a default initial value, but that would cause any page with a different value to _visibly_ "flash" and change its language when it loads, which is not a very good user experience.

2. This is also true for any component nested within the `Page`. Even though the components render after the `Page` -- where's the `Layout` renders before it -- on first render, they too will not be able to access the language property, as the state will only update after the initial render of the `Page` and its nested components.

3. When the `Page` sets the language, it is in fact changing the (React) state of the `ContextProvider`, and that should be avoided; a React state should not be set from within a `render` method. We will also get a warning for doing so. Earlier, we saw the `ThemeButton` setting the state from within the `onClick` of a `button`, which is triggered by the user, not while the `render` is executing.

Let's start with the first problem, and allow the page to pass the language to the `Layout` before it renders. Normally, we will create our pages in `gatsby-node.js` by first querying their content with GraphQL and then applying it on a template:

```js title=gatsby-node.js
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`... our query`).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      const edges = result.data.allMarkdownRemark.edges // might differ between queries
      _.each(edges, edge => {
        const { slug, language } = edge.node.frontmatter
        createPage({
          path: slug,
          component: ,// path to page template
          context: {
            slug,
            language,
          },
        })
      })
      resolve()
    })
  })
}
```

It is quite reasonable that the language of the page will be available along with its content; meaning, that we could pass it along with Gatsby's page context -- not to be confused with React's context -- which is in fact available to the `Layout` component:

```jsx title=Layout/index.jsx
export default ({ children, pageContext }) => {
  return (
    <ContextProvider>
      <Layout {...pageContext}>{children}</Layout>
    </ContextProvider>
  )
}

class Layout extends React.component {
  render() {
    const theme = this.context.theme.get()
    const language = this.props.language
    this.context.language.set(language)
    return (
      <div key={this.state.isClient} className={`global-container ${theme} ${language}`}>
        {this.props.children}
      </div>
    )
  }
}
```

This pattern is of course not possible with static pages which are not generated by `gatsby-node.js`, as they do not have access to the page context. If you have that type of pages in your site, you should (a) make sure that your `Layout` component can still function without the language property, and (b) do not access the language property within those pages or any of the components in them; they should all be "language agnostic".

Now that the first problem is behind us, we will tackle both the second and the third problems together; that is, we will make the language property available to all of the components immediately after we first set it (problem #2), and also make sure to not update React's context while rendering (problem #3). In order to do so, we will need to redesign the way we manage the state of the `ContextProvider`:

```jsx title=Context/index.jsx
class ContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.nonReactState = {}
    this.provided = {
      theme: new ThemeContextProvider(this),
      language: new LanguageContextProvider(this), // same as the theme provider
    }
  }
  get(property) {
    return this.nonReactState[property]
  }
  set(property, value) {
    if (this.get(property) !== value) {
      this.nonReactState[property] = value
      setTimeout(() => this.forceUpdate(), 0)
    }
  }
}
```

We're basically dumping the React state of the `ContextProvider` all together. Instead, we maintain a plain map and make sure to update the components by forcing an update on the `ContextProvider` whenever the map changes. This way, changes to the state are visible immediately as they are made. Also, note that the update is invoked with a timeout, as we want to avoid forcing an update while rendering (`set` will be invoked in `Layout`'s `render`, remember?).

In fact, we can improve this pattern even further. When we set the language in the `Layout`, we don't want to force an update on the registered components, as they did not even render for the first time yet. On the other hand, whenever we update the theme, we definitely want to re-render all of the page's components. So let's allow each property to have a different "update policy":

```jsx title=Context/index.jsx
class ContextProvider extends React.Component {
  set(property, value, updateComponents) {
    if (this.get(property) !== value) {
      this.nonReactState[property] = value
      if (updateComponents) {
        setTimeout(() => this.forceUpdate(), 0)
      }
    }
  }
}

class ThemeContextProvider {
  set(newTheme) {
    this.provider.set('theme', newTheme, true)
  }
}

class LanguageContextProvider {
  set(newTheme) {
    this.provider.set('theme', newTheme, false)
  }
}
```

Here we see another advantage for using an additional abstraction layer for each property :)

## Multiple layouts

In the final part of this post I would like to address the issue of multiple layouts in the "singleton" layout model. A site might have several layouts for different sections, with some components similar between the layouts -- say, a footer -- and some completely unique to a layout -- say, a sidebar.

In the "singleton" model, multiple layouts are an illusion, as there is only the single layout instance. It's possible to render some of the layout's components according to a property passed by the pages:

```jsx title=Layout/index.jsx
class Layout extends React.Component {
  render() {
    const sidebar = this.props.hasSidebar ? <Sidebar /> : null
    return (
      <div key={this.state.isClient} className={/* ... */}>
        {sidebar}
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
```

Or rather, explicitly render the sidebar within each page:

```jsx
class GalleryPage extends React.Component {
  render() {
    return <SidebarLayout>{/*...*/}</SidebarLayout>
  }
}

class PostPage extends React.Component {
  render() {
    return <SidebarLayout>{/*...*/}</SidebarLayout>
  }
}

class HomePage extends React.Component {
  render() {
    // no sidebar
    return /*...*/
  }
}

class SidebarLayout extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        {this.props.children}
      </div>
    )
  }
}
```

But with both approaches, the unique layout component -- for instance, a sidebar -- is not shared across _all_ pages, but only among pages of the same "layout"; in fact, with the second approach, unique components are not even shared between pages of the same "layout", since this approach is basically an implementation of the "multiton" model.

Multiple layouts are definitely possible with the "singleton" model, but they forgo the major advantage it provides -- persisting layout components' state across pages. Every time the user navigates to a page of a different layout, the previous layout's unique components are unmounted and lose their state.

Also, one more little advice before I end this post: If you have multiple layouts on your site -- whether with the "singleton" or with the "multiton" model -- use different CSS `class` names for each layout. Even if you only import a layout's S/CSS file in its component, [Gatsby will load all of the site's CSS files in every page](https://github.com/gatsbyjs/gatsby/issues/3446), including CSS files of other layouts, and then your CSS rules will conflict (without no warning!).
