import React from "react"
import isMatch from 'lodash/isMatch'
import ThemeContextProvider from '../ThemeContextProvider'

const defaultContextValue = {
  data: {
    languageId: null,
    sidebar: {
        isRendered: false,
        linkId: null,
    },
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProvider extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    }

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
  }

  setData(newData) {
    if (!isMatch(this.state.data, newData)) {
        this.setState(state => ({
          data: {
              ...state.data,
              ...newData,
          },
        }))
    }
  }

  render() {
    const provided = {
      ...this.state,
      theme: new ThemeContextProvider(this.get, this.set)
    }


    return <Provider value={provided}>{this.props.children}</Provider>
  }

  get(property) {
    return this.state[property]
  }

  set(property, value) {
    const newState = {}
    newState[property] = value
    this.setState(newState)
  }
}

export { Consumer as default, ContextProvider }