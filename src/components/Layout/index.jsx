import React from 'react'
import ContextConsumer, { ContextProvider } from '../Context'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import ProgressBar from '../ProgressBar'
import '../../assets/scss/init.scss'
import './style.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialized: false
    }
  }

  render() {
    const { children } = this.props

    const surface0 = (
      <div className="surface0"/>
    )

    const surface1 = (
      <ContextConsumer>
          {({page}) => (page.isHome.get()) ? null : <div className="surface1"/>}
      </ContextConsumer>
    )

    const progressBar = (
      <ContextConsumer>
          {({page}) => (page.isHome.get()) ? null : <ProgressBar />}
      </ContextConsumer>
    )

    const sidebar = (
      <ContextConsumer>
          {({page}) => (page.isHome.get()) ? null : <Sidebar />}
      </ContextConsumer>
    )

    return (
      <ContextProvider>
        <ContextConsumer>
          {({theme, page}) => {
            if (this.state.initialized) {
              return (
                <div className={`page-container ${page.language.get().cssClass} ${theme.get().cssClass}`}>
                  {progressBar}
                  {surface0}
                  {surface1}
                  <div className="content-wrap">
                    {sidebar}  
                    <div className="content">
                      {children}
                    </div>
                  </div>
                  <Footer />
                </div>
              )
            } else {
              return children
            }
          }}
        </ContextConsumer>
      </ContextProvider>
    )
  }

  componentDidMount() {
    this.setState({
      initialized: true
    })
  }
}

export default Layout
