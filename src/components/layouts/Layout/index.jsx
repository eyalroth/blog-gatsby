import React from 'react'
import Context from '../../Context'
import DefaultLayout from '../DefaultLayout'
import StaticPageLayout from '../StaticPageLayout'
import { Languages } from '../../../consts/languages'

import '../../../assets/scss/init.scss'
import './style.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.divRef = React.createRef()
  }

  render() {
    const { children } = this.props
    const { page } = this.context

    if (!page.language.get()) {
      page.set(Languages.English, null)
    }

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

    return (
      <div ref={this.divRef} className={this.className()}>
        {childrenWithLayout}
      </div>
    )
  }

  componentDidMount() {
    this.divRef.current.className = this.className()
  }

  className() {
    const theme = this.context.theme.get()
    const language = this.context.page.language.get()

    return `global-container ${theme.cssClass} ${language.cssClass}`
  }
}
  
Layout.contextType = Context

export default Layout
  