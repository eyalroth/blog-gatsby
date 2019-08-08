import React from 'react'
import ContextConsumer from '../Context'
import { Themes } from '../../consts/themes'
import './style.scss'

const src = 'https://utteranc.es/client.js'
const branch = 'master'

class Utterances extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: null,
      loadingScript: true,
    }

    this.rootElm = React.createRef()
    this.scripts = {}
  }

  render() {
    let status = "loading"
    if (!this.state.loadingScript) {
      status = (this.scripts[this.state.theme.id]) ? "success" : "fail"
    }

    return (
      <ContextConsumer>
        {context => {
          const _this = this
          const theme = context.theme.get()
          if(this.state.theme != theme) {
            setTimeout(() => _this.setState({theme}), 0)
          }
          return (
            <div className="utterances" ref={this.rootElm}>
              <div className={`utterances-status ${status}`}/>
            </div>
          )
        }}
      </ContextConsumer>
    )
  }

  componentDidMount() {
    this.loadScript()
  }
  
  componentDidUpdate() {
    this.loadScript()
  }

  loadScript() {
    const { repo } = this.props
    const theme = this.state.theme

    if (theme) {
      if (!(theme.id in this.scripts)) {
        if (!this.state.loadingScript) {
          this.setState({loadingScript: true})
        } else {
          const script = this.createScript(repo, theme)
          const existingScript = Array.from(this.rootElm.current.children).find(elem => elem.id == script.id)
          if (existingScript) {
            this.rootElm.current.removeChild(existingScript)
          }
          this.rootElm.current.appendChild(script)
        }
      }

      Array.from(this.rootElm.current.children).forEach(elem => {
        if (elem.id in this.scripts) {
          elem.style.display = (elem.id == theme.id) ? 'block' : 'none'
        }
      });
    }
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

    script.addEventListener("load", () => this.scriptLoaded(theme.id, true), {once: true})
    script.addEventListener("error", () => this.scriptLoaded(theme.id, false), {once: true})

    div.appendChild(script)

    return div
  }

  scriptLoaded(themeId, success) {
    this.scripts[themeId] = success
    this.setState({
      loadingScript: false,
    })
  }
}

export default Utterances