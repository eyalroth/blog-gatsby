import React from 'react'
import ContextConsumer, { ContextProvider } from '../../Context'
import DefaultLayout from '../DefaultLayout'
import StaticPageLayout from '../StaticPageLayout'
import '../../../assets/scss/init.scss'
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

      return (
        <ContextProvider>
            <ContextConsumer>
            {({page, theme}) => {
                if (this.state.initialized) {
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
                        <div className={`global-container ${theme.get().cssClass} ${page.language.get().cssClass}`}>
                            {childrenWithLayout}
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
  