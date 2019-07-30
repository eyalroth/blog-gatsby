import React from 'react'
import { Themes } from '../../consts/themes'

const src = 'https://utteranc.es/client.js'
const branch = 'master'

class Utterences extends React.Component {
  constructor(props) {
    super(props)

    this.rootElm = React.createRef()
  }

  render() {
    return <div className="utterences" ref={this.rootElm} />
  }

  componentDidMount() {
    this.loadScript()
  }
  
  componentDidUpdate() {
    this.loadScript()
  }

  loadScript() {
    const { repo, theme } = this.props

    const githubTheme  = (function(theme) {
      switch(theme) {
        case Themes.Light:
          return 'github-light'
        case Themes.Dark:
          return 'github-dark'
      }
    })(theme)

    const utterances = document.createElement('script')

    utterances.setAttribute('src', src)
    utterances.setAttribute('repo', repo)
    utterances.setAttribute('branch', branch)
    utterances.setAttribute('async', true)
    utterances.setAttribute('issue-term', 'pathname')
    utterances.setAttribute('crossOrigin', 'anonymous')
    utterances.setAttribute('theme', githubTheme)

    if (this.rootElm.current.childElementCount > 0) {
      this.rootElm.current.removeChild(this.rootElm.current.firstChild)
    }
    this.rootElm.current.appendChild(utterances)
  }
}

export default Utterences