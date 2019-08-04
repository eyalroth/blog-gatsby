import React from 'react'
import ContextConsumer from '../../Context'
import Footer from '../../Footer'
import './style.scss'

class StaticPageLayout extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        initialized: false
      }
    }
  
    render() {
      const { children } = this.props

      return (
        <ContextConsumer>
          {({page}) => {
            if (this.state.initialized) {
              return (
                <div className={`page-container ${page.language.get().cssClass}`}>
                  {children}
                  <Footer />
                </div>
              )
            } else {
              return children
            }
          }}
        </ContextConsumer>
      )
    }
  
    componentDidMount() {
      this.setState({
        initialized: true
      })
    }
  }
  
  export default StaticPageLayout
  