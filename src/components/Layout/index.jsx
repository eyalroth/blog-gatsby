import React from 'react'
import { instanceOf } from 'prop-types'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie'
import ContextConsumer, { ContextProviderComponent } from '../Context'
import '../../assets/scss/init.scss'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Languages } from '../../consts/languages'
import { Themes } from '../../consts/themes'
import './style.scss'

class Layout extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

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
      <CookiesProvider>
        <ContextProviderComponent>
          <ContextConsumer>
            {context => {
              const language = Object.values(Languages).find(lang => lang.id == context.data.languageId)
              const languageCss = (language) ? language.cssClass : ""

              const cookieThemeId = this.props.cookies.get('theme')
              let theme = Object.values(Themes).find(theme => theme.id == cookieThemeId)
              if (!theme) {
                theme = context.data.theme
              }

              return (
                <div className={`page-container ${languageCss} ${theme.cssClass}`}>
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
        </ContextProviderComponent>
      </CookiesProvider>
    )
  }
}

export default withCookies(Layout)
