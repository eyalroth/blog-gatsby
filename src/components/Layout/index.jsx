import React from 'react'
import ContextConsumer, { ContextProvider } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import ProgressBar from '../ProgressBar'
import { Languages } from '../../consts/languages'
import './style.scss'

class Layout extends React.Component {

  render() {
    const { children } = this.props

    const surface0 = (
      <div className="surface0"/>
    )

    const surface1 = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <div className="surface1"/> : null}
      </ContextConsumer>
    )

    const progressBar = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <ProgressBar /> : null}
      </ContextConsumer>
    )

    const sidebar = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <Sidebar /> : null}
      </ContextConsumer>
    )

    return (
      <ContextProvider>
        <ContextConsumer>
          {context => {
            const language = Object.values(Languages).find(lang => lang.id == context.data.languageId)
            const languageCss = (language) ? language.cssClass : ""

            return (
              <div className={`page-container ${languageCss} ${context.theme.get().cssClass}`}>
                {progressBar}
                {surface0}
                {surface1}
                <div className="content-wrap">
                  {sidebar}  
                  <div className="content">
                    {children}
                  </div>
                </div>
                <Footer languageId={context.data.languageId} />
              </div>
            )
          }}
        </ContextConsumer>
      </ContextProvider>
    )
  }
}

export default Layout
