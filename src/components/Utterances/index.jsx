import React from 'react'
import Context from '../Context'
import { Themes } from '../../consts/themes'
import './style.scss'

const src = 'https://utteranc.es/client.js'
const branch = 'master'

class Utterances extends React.Component {
  constructor(props) {
    super(props)
    
    this.rootElm = React.createRef()
    this.theme = null
    this.scripts = {}
  }

  render() {
    const theme = this.context.theme.get()

    if (theme !== this.theme) {
      this.theme = theme
      setTimeout(() => this.forceUpdate(), 0)
    }

    return (
      <div ref={this.rootElm}/>
    )
  }

  componentDidMount() {
    this.loadScript()
  }
  
  componentDidUpdate() {
    this.loadScript()
  }

  updateClassName(status) {
    this.rootElm.current.className = `utterances ${status}`
  }

  loadScript() {
    const { repo } = this.props

    if (this.theme) {
      if (!(this.theme.id in this.scripts)) {
        this.updateClassName("loading")
        const script = this.createScript(repo, this.theme)
        const existingScript = Array.from(this.rootElm.current.children).find(elem => elem.id === script.id)
        if (existingScript) {
          this.rootElm.current.removeChild(existingScript)
        }
        this.rootElm.current.appendChild(script)
      }

      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === this.theme.id) ? 'block' : 'none'
      })
    }
  }

  createScript(repo, theme) {
    const githubTheme  = (function(theme) {
      // eslint-disable-next-line
      switch(theme) {
        case Themes.Light:
          return 'github-light'
        case Themes.Dark:
          return 'photon-dark'
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

    script.addEventListener("load", () => this.scriptLoaded(theme.id, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme.id, false), {once: true})

    div.appendChild(script)

    return div
  }

  scriptLoaded(themeId, success) {
    this.scripts[themeId] = success
    this.updateClassName(success ? "success" : "fail")
  }
}

Utterances.contextType = Context

export default Utterances