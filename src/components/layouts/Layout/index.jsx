import React from 'react'
import ContextConsumer, { ContextProvider } from '../../Context'
import DefaultLayout from '../DefaultLayout'
import StaticPageLayout from '../StaticPageLayout'
import { Languages } from '../../../consts/languages'

import '../../../assets/scss/init.scss'
import './style.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.divRef = React.createRef()
    this.theme = null
    this.language = null
  }

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

              this.theme = theme.get()
              this.language = page.language.get()

              return (
                <div ref={this.divRef} className={this.className()}>
                  {childrenWithLayout}
                </div>
              )
            }}
          </ContextConsumer>
      </ContextProvider>
    )
  }

  componentDidMount() {
    this.divRef.current.className = this.className()
  }

  className() {
    return `global-container ${this.theme.cssClass} ${this.language.cssClass}`
  }
}
  
export default Layout
  