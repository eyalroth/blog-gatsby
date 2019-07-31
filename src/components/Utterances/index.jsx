import React from 'react'
import { Themes } from '../../consts/themes'

const src = 'https://utteranc.es/client.js'
const branch = 'master'

class Utterences extends React.Component {
  constructor(props) {
    super(props)

    this.rootElm = React.createRef()
    this.createdScripts = []
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

    if (!(this.createdScripts.includes(theme.id))) {
      this.rootElm.current.appendChild(this.createScript(repo, theme))
      this.createdScripts.push(theme.id)
    }

    Array.from(this.rootElm.current.children).forEach(script => {
      script.style.display = (script.id == theme.id) ? 'block' : 'none'
    });
  }

  createScript(repo, theme) {
    const githubTheme  = (function(theme) {
      switch(theme) {
        case Themes.Light:
          return 'github-light'
        case Themes.Dark:
          return 'github-dark'
      }
    })(theme)

    const div = document.createElement('div')
    div.id = theme.id

    const script = document.createElement('script')

    script.setAttribute('src', src)
    script.setAttribute('repo', repo)
    script.setAttribute('branch', branch)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', githubTheme)

    div.appendChild(script)

    return div
  }
}

export default Utterences