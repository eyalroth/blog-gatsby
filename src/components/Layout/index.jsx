import React from 'react'
import ContextConsumer, { ContextProviderComponent } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Languages } from '../../consts/languages'
import './style.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    const sidebar = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <Sidebar /> : null}
      </ContextConsumer>
    )

    const background = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <div className="content-bg"/> : null}
      </ContextConsumer>
    )

    return (
      <ContextProviderComponent>
        <ContextConsumer>
          {context => {
            const language = Object.values(Languages).find(lang => lang.id == context.data.languageId)
            const languageCss = (language) ? language.cssClass : ""
            const darkModeCss = (context.data.darkMode) ? "dark-mode" : ""

            return (
              <div className={`page-container ${languageCss} ${darkModeCss}`}>
                {background}
                <div className="content-wrap">
                  {sidebar}  
                  {children}
                </div>
                <Footer languageId={context.data.languageId} />
              </div>
            )
          }}
        </ContextConsumer>
      </ContextProviderComponent>
    )
  }
}

export default Layout
