import React from "react"
import isMatch from 'lodash/isMatch'
import PageContextProvider from '../PageContextProvider'
import ThemeContextProvider from '../ThemeContextProvider'
import NavMenuContextProvider from '../NavMenuContextProvider'

const { Provider, Consumer } = React.createContext({})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.provided = {
      page: new PageContextProvider(new StateManager(this)),
      theme: new ThemeContextProvider(new StateManager(this)),
      navMenu: new NavMenuContextProvider(),
    }
  }

  render() {
    return <Provider value={{...this.provided}}>{this.props.children}</Provider>
  }

}

export { Consumer as default, ContextProvider }

class StateManager {
  constructor(component) {
    this.component = component
  }

  get(property) {
    return this.component.state[property]
  }

  set(property, value) {
    if (this.get(property) != value) {
      this.component.setState(state => {
        const newState = {...state}
        newState[property] = value
        return newState
      })
    }
  }

  setBatch(newState) {
    if (!isMatch(this.component.state, newState)) {
      this.component.setState(state => ({
        ...state,
        ...newState,
      }))
    }
  }
}