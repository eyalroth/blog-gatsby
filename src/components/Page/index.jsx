import React from 'react'
import Helmet from 'react-helmet'
import Context from '../../components/Context'
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

        const language = Object.values(Languages).find(lang => lang.id ==  this.props.languageId)

        const helmet = (
            <Helmet 
                key="helmet"
                title={`${subtitle}${title}`}
                defer={false}
                htmlAttributes={{
                    lang: language.htmlLang
                }}
            />
        )

        this.context.page.set(language, this.props.sidebarLinkId)
        
        return ([
            helmet,
            this.props.children
        ])
    }
}

Page.contextType = Context

export default Page