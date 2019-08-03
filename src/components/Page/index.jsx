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
                    if (context.page.initialized.get()) {
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

        this.context.page.isHome.set(this.props.isHome == true)
        this.context.page.language.set(language)
        this.context.page.sidebarLinkId.set(this.props.sidebarLinkId)
        
        this.context.page.initialized.set(true)
    }
}

export default Page