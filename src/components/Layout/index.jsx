import React from 'react'
import ContextConsumer, { ContextProvider } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import ProgressBar from '../ProgressBar'
import './style.scss'

class Layout extends React.Component {

  render() {
    const { children } = this.props

    const surface0 = (
      <div className="surface0"/>
    )

    const surface1 = (
      <ContextConsumer>
          {context => (context.sidebar.isRendered.get()) ? <div className="surface1"/> : null}
      </ContextConsumer>
    )

    const progressBar = (
      <ContextConsumer>
          {context => (context.sidebar.isRendered.get()) ? <ProgressBar /> : null}
      </ContextConsumer>
    )

    const sidebar = (
      <ContextConsumer>
          {context => (context.sidebar.isRendered.get()) ? <Sidebar /> : null}
      </ContextConsumer>
    )

    return (
      <ContextProvider>
        <ContextConsumer>
          {({theme, language}) => (
              <div className={`page-container ${language.get().cssClass} ${theme.get().cssClass}`}>
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
          )}
        </ContextConsumer>
      </ContextProvider>
    )
  }
}

export default Layout
