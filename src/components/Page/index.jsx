import React from 'react'
import Context from '../../components/Context'
import { findById } from '../../consts/languages'

class Page extends React.Component {
    render() {
        const language = findById(this.props.languageId)

        this.context.page.set(language, this.props.sidebarLinkId)

        return ([
            this.props.children
        ])
    }

    componentDidMount() {
        this.addLittlefoot()
    }

    addLittlefoot() {
        if (typeof window !== 'undefined') {
            const bt = `
            <button
                aria-controls="fncontent:<%= id %>"
                aria-expanded="false"
                aria-label="Footnote <%= number %>"
                class="littlefoot-footnote__button"
                id="<%= reference %>"
                rel="footnote"
                title="See Footnote <%= number %>"
            />
                <%= number %>
            </button>
            `
            const littlefoot = require('littlefoot').default
            littlefoot({buttonTemplate: bt})
        }
    }
}

Page.contextType = Context

export default Page
