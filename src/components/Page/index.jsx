import React from 'react'
import Helmet from 'react-helmet'
import Context from '../../components/Context'
import { Languages } from '../../consts/languages'
import { Author } from '../../consts/author'

class Page extends React.Component {
    render() {
        const title = Author.name[this.props.languageId]

        let { subtitle, description } = this.props
        if (subtitle) {
            subtitle = `${subtitle} | `
        } else {
            subtitle = ""
        }

        const finalTitle = `${subtitle}${title}`
        const finalDescription = description || subtitle

        const language = Object.values(Languages).find(lang => lang.id ==  this.props.languageId)

        const helmet = (
            <Helmet 
                key="helmet"
                defer={false}
                htmlAttributes={{
                    lang: language.htmlLang
                }}
            >
                <title>{finalTitle}</title>
                <meta name="description" content={finalDescription}/>
            </Helmet>
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