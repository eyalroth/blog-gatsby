import React from 'react'
import Helmet from 'react-helmet'
import ContextConsumer from '../../components/Context'
import { Languages } from '../../consts/languages'
import { Author } from '../../consts/author'

class Page extends React.Component {
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

        const language = Object.values(Languages).find(lang => lang.id ==  this.props.languageId)

        
        return ([
            helmet,
            <ContextConsumer key="content">
                {({page}) => {
                    page.set(language, this.props.sidebarLinkId)
                    return this.props.children
                }}
            </ContextConsumer>
        ])
    }
}

export default Page