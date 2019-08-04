import React from 'react'
import Helmet from 'react-helmet'
import ContextConsumer from '../../components/Context'
import { Languages } from '../../consts/languages'
import { Author } from '../../consts/author'

class Page extends React.Component {
    constructor(props) {
        super(props)

        this.context = null
        this.state = {
            initialized: false,
        }
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
                    if (this.state.initialized) {
                        return this.props.children
                    } else {
                        return null
                    }
                }}
            </ContextConsumer>
        ])
    }

    componentDidMount() {
        const language = Object.values(Languages).find(lang => lang.id ==  this.props.languageId)

        this.context.page.set(language, this.props.sidebarLinkId)
        
        this.setState({
            initialized: true    
        })
    }
}

export default Page