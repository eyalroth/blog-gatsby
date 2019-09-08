import React from 'react'
import Context, { ContextProvider } from '../Context'
import DefaultLayout from './DefaultLayout'
import StaticPageLayout from './StaticPageLayout'
import { Languages, findById } from '../../consts/languages'

import '../../assets/scss/init.scss'
import './style.scss'

export default ({ children, pageContext }) => {
  return (
    <ContextProvider>
        <Layout {...pageContext}>
            {children}
        </Layout>
    </ContextProvider>
  )
}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  render() {
    const { children } = this.props

    const language = (this.props.languageId) ? findById(this.props.languageId) : Languages.English
    this.context.layout.set(language, this.props.sidebarLinkId)

    let childrenWithLayout = null

    if (this.props.isStaticPage) {
      childrenWithLayout = (
        <StaticPageLayout>
          {children}
        </StaticPageLayout>
      )
    } else  {
      childrenWithLayout = (
        <DefaultLayout {...this.props}>
          {children}
        </DefaultLayout>
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
    const language = this.context.layout.language.get()

    return `global-container ${theme.cssClass} ${language.cssClass}`
  }
}
  
Layout.contextType = Context