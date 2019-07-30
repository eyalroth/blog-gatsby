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

    const surface0 = (
      <div className="surface0"/>
    )

    const surface1 = (
      <ContextConsumer>
          {context => (context.data.sidebar.isRendered) ? <div className="surface1"/> : null}
      </ContextConsumer>
    )

    return (
      <ContextProviderComponent>
        <ContextConsumer>
          {context => {
            const language = Object.values(Languages).find(lang => lang.id == context.data.languageId)
            const languageCss = (language) ? language.cssClass : ""
            const themeCss = context.data.theme.cssClass

            return (
              <div className={`page-container ${languageCss} ${themeCss}`}>
                {surface0}
                {surface1}
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
