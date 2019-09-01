import React from 'react'
import Context from '../Context'
import { Themes } from '../../consts/themes'
import './style.scss'

const src = 'https://utteranc.es/client.js'

class Utterances extends React.Component {
  constructor(props) {
    super(props)
    
    this.rootElm = React.createRef()
    this.themeStatus = {}
    this.state = {
      status: "loading",
      theme: null,
    }
  }

  render() {
    return (
      <div ref={this.rootElm} className={`utterances ${this.state.status}`}/>
    )
  }

  componentDidMount() {
    this.loadScript()
  }
  
  componentDidUpdate() {
    this.loadScript()
  }

  loadScript() {
    const theme = this.context.theme.get().id

    if (theme !== this.state.theme) {
      this.setState({
        status: "loading",
        theme,
      })
    } else {
      if (!(theme in this.themeStatus)) {
        const script = this.createScript(theme)
        const existingScript = Array.from(this.rootElm.current.children).find(elem => elem.id === script.id)
        if (existingScript) {
          this.rootElm.current.removeChild(existingScript)
        }
        this.rootElm.current.appendChild(script)
      } else if (this.state.status !== this.themeStatus[theme]) {
        this.setState({
          status: this.themeStatus[theme],
        })
      }

      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }
  }

  createScript(theme) {
    const githubTheme  = (function(theme) {
      // eslint-disable-next-line
      switch(theme) {
        case Themes.Light.id:
          return 'github-light'
        case Themes.Dark.id:
          return 'photon-dark'
      }
    })(theme)

    const div = document.createElement('div')
    div.id = theme

    const script = document.createElement('script')

    script.setAttribute('src', src)
    script.setAttribute('repo', this.props.repo)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', githubTheme)

    script.addEventListener("load", () => this.scriptLoaded(theme, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme, false), {once: true})

    div.appendChild(script)

    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({status})
  }
}

Utterances.contextType = Context

export default Utterances