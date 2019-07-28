import React from 'react'
import ContextConsumer from '../../components/Context'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.context = null
    }

    render() {
        return (
            <ContextConsumer>
                {context => {
                    this.context = context
                    return this.props.children
                }}
            </ContextConsumer>
        )
    }

    componentDidMount() {
        this.updateContext()
    }
    
    componentDidUpdate() {
        this.updateContext()
    }

    updateContext() {
        let { subtitle } = this.props
        if (subtitle) {
            subtitle = `${subtitle} | `
        } else {
            subtitle = ""
        }

        const isSidebarRendered = this.props.renderSidebar != false

        this.context.set({
            pageSubtitle: subtitle,
            sidebar: {
                ...this.context.data.sidebar,
                isRendered: isSidebarRendered,
                linkId: this.props.sidebarLinkId,
            },
        })
    }
}

export default Page