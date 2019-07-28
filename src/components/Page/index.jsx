import React from 'react'
import Helmet from 'react-helmet'
import ContextConsumer from '../../components/Context'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.context = null
    }

    render() {
        let { subtitle } = this.props
        if (subtitle) {
            subtitle = `${subtitle} | `
        } else {
            subtitle = ""
        }

        const helmet = (
            <Helmet key="helmet" title={`${subtitle}Eyal Roth`} defer={false} />
        )

        return ([
            helmet,
            <ContextConsumer key="content">
                {context => {
                    this.context = context
                    return this.props.children
                }}
            </ContextConsumer>
        ])
    }

    componentDidMount() {
        this.updateContext()
    }
    
    componentDidUpdate() {
        this.updateContext()
    }

    updateContext() {
        const isSidebarRendered = this.props.renderSidebar != false

        this.context.set({
            sidebar: {
                isRendered: isSidebarRendered,
                linkId: this.props.sidebarLinkId,
            },
        })
    }
}

export default Page