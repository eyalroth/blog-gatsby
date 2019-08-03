import React from 'react'
import Helmet from 'react-helmet'
import ContextConsumer from '../../components/Context'
import { Languages } from '../../consts/languages'
import { Author } from '../../consts/author'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.context = null
    }

    render() {
        const title = Author.name[this.props.languageId]

        let { subtitle } = this.props
        if (subtitle) {
            subtitle = `${subtitle} | `
        } else {
            subtitle = ""
        }

        const helmet = (
            <Helmet key="helmet" title={`${subtitle}${title}`} defer={false} />
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
        const language = Object.values(Languages).find(lang => lang.id ==  this.props.languageId)

        this.context.language.set(language)
        this.context.sidebar.isRendered.set(this.props.renderSidebar != false)
        this.context.sidebar.linkId.set(this.props.sidebarLinkId)
    }
}

export default Page