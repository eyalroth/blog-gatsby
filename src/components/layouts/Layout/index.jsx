import React from 'react'
import ContextConsumer, { ContextProvider } from '../../Context'
import DefaultLayout from '../DefaultLayout'
import StaticPageLayout from '../StaticPageLayout'
import { Languages } from '../../../consts/languages'

import '../../../assets/scss/init.scss'
import './style.scss'

class Layout extends React.Component {
    render() {
      const { children } = this.props

      return (
        <ContextProvider>
            <ContextConsumer>
              {({page, theme}) => {
                let childrenWithLayout = (
                  <DefaultLayout>
                    {children}
                  </DefaultLayout>
                )
                if (this.props.isStaticPage) {
                  childrenWithLayout = (
                    <StaticPageLayout>
                      {children}
                    </StaticPageLayout>
                  )
                }

                if (!page.language.get()) {
                  page.set(Languages.English, null)
                }

                return (
                  <div className={`global-container ${theme.get().cssClass} ${page.language.get().cssClass}`}>
                    {childrenWithLayout}
                  </div>
                )
              }}
            </ContextConsumer>
        </ContextProvider>
      )
    }
}
  
export default Layout
  