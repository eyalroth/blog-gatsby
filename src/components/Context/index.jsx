import React from "react"
import PageContextProvider from '../PageContextProvider'
import ThemeContextProvider from '../ThemeContextProvider'
import NavMenuContextProvider from '../NavMenuContextProvider'

const { Provider, Consumer } = React.createContext({})

class ContextProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)

    this.provided = {
      page: new PageContextProvider(this.get, this.set),
      theme: new ThemeContextProvider(this.get, this.set),
      navMenu: new NavMenuContextProvider(),
    }
  }

  render() {
    return <Provider value={{...this.provided}}>{this.props.children}</Provider>
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