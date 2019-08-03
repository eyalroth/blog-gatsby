import React from "react"
import ThemeContextProvider from '../ThemeContextProvider'
import { Languages } from '../../consts/languages'

const { Provider, Consumer } = React.createContext({})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.provided = {
      language: new SimpleProvider(this.get, this.set, "languagex", Languages.English),
      sidebar: {
          isRendered: new SimpleProvider(this.get, this.set, "sidebar.isRendered", true),
          linkId: new SimpleProvider(this.get, this.set, "sidebar.linkId"),
      },
      theme: new ThemeContextProvider(this.get, this.set),
    }
  }

  render() {
    return <Provider value={{...this.provided, ...this.state}}>{this.props.children}</Provider>
  }

  get(property) {
    return this.state[property]
  }

  set(property, value) {
    if (this.get(property) != value) {
      this.setState(state => {
        const newState = {...state}
        newState[property] = value
        return newState
      })
    }
  }
}

export { Consumer as default, ContextProvider }

class SimpleProvider {
  constructor(getContext, setContext, property, defaultValue = null) {
    this.getContext = getContext
    this.setContext = setContext
    this.property = property
    this.defaultValue = defaultValue
  }

  get() {
    const value = this.getContext(this.property)
    if (!value) {
      return this.defaultValue
    }
    return value
  }

  set(value) {
    this.setContext(this.property, value)
  }
}