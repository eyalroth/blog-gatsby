import React from 'react'
import Context from '../Context'
import './style.scss'

const src = 'https://utteranc.es/client.js'

class Utterances extends React.Component {
  constructor(props) {
    super(props)
    
    this.rootElm = React.createRef()
    this.themeStatus = {}
    this.state = {
      status: "",
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
    const theme = this.context.theme.get().utterances
    
    if (theme !== this.state.theme) {
      let status = "loading"

      if (theme in this.themeStatus) {
        status = this.themeStatus[theme]
      } else {
        this.themeStatus[theme] = status
        const script = this.createScript(theme)
        this.rootElm.current.appendChild(script)
      }

      this.setState({
        status,
        theme,
      })
      Array.from(this.rootElm.current.children).forEach(elem => {
        elem.style.display = (elem.id === theme) ? 'block' : 'none'
      })
    }

  }

  createScript(theme) {
    const div = document.createElement('div')
    div.id = theme

    const script = document.createElement('script')

    script.setAttribute('src', `${src}?v=${new Date().getTime()}`)
    script.setAttribute('repo', this.props.repo)
    script.setAttribute('async', true)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('crossOrigin', 'anonymous')
    script.setAttribute('theme', theme)

    script.addEventListener("load", () => this.scriptLoaded(theme, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme, false), {once: true})

    div.appendChild(script)

    return div
  }

  scriptLoaded(theme, success) {
    const status = success ? "success" : "fail"
    this.themeStatus[theme] = status
    this.setState({
      status,
      theme,
    })
  }
}

Utterances.contextType = Context

export default Utterances