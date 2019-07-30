import React from "react"
import isMatch from 'lodash/isMatch'
import { Themes } from '../../consts/themes'

const defaultContextValue = {
  data: {
    languageId: null,
    sidebar: {
        isRendered: false,
        linkId: null,
    },
    theme: Themes.Light
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    }
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
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as default, ContextProviderComponent }