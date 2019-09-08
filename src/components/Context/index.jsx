import React from "react"
import isMatch from 'lodash/isMatch'
import LayoutContextProvider from './LayoutContextProvider'
import ThemeContextProvider from './ThemeContextProvider'

const Context = React.createContext({})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.provided = {
      layout: new LayoutContextProvider(new StateManager(this)),
      theme: new ThemeContextProvider(new StateManager(this)),
    }
  }

  render() {
    return (
      <Context.Provider value={{...this.provided}}>
        {this.props.children}
      </Context.Provider>
    )
  }

}

export { Context as default, ContextProvider }

class StateManager {
  constructor(provider) {
    this.provider = provider
    // we keep a local state and not using React's state because we want immediate state changes
    this.state = {}
  }

  get(property) {
    return this.state[property]
  }

  set(property, value) {
    if (this.get(property) !== value) {
      this.state[property] = value
      this.forceUpdate()
    }
  }

  setBatch(newState) {
    if (!isMatch(this.state, newState)) {
      this.state = {
        ...this.state,
        ...newState
      }
      this.forceUpdate()
    }
  }

  forceUpdate() {
    // timeout since we don't want to update while in render
    // we want an anonymous function so the update will be invoked for each set action
    setTimeout(() => this.provider.forceUpdate(), 0)
  }
}