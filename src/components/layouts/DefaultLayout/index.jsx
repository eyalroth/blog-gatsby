import React from 'react'
import ContextConsumer from '../../Context'
import Sidebar from '../../Sidebar'
import Footer from '../../Footer'
import ProgressBar from '../../ProgressBar'
import './style.scss'

class DefaultLayout extends React.Component {
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
                <ProgressBar />
                <div className="surface0"/>
                <div className="surface1"/>
                <div className="content-wrap">
                  <Sidebar />
                  <div className="content">
                    {children}
                  </div>
                </div>
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

export default DefaultLayout
