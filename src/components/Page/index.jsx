import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Context from '../../components/Context'
import { Languages } from '../../consts/languages'
import { Author } from '../../consts/author'

class Page extends React.Component {
    render() {
        const language = Object.values(Languages).find(lang => lang.id === this.props.languageId)

        this.context.page.set(language, this.props.sidebarLinkId)

        const helmet = <PageHelmet key="helmet" language={language} {...this.props}/>
        
        return ([
            helmet,
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

class PageHelmet extends React.Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query PageQuery {
                        site {
                            siteMetadata {
                                deployUrl
                            }
                        }
                        defaultImage: file(relativePath: { eq: "default-featured-image.jpg" }) {
                            childImageSharp {
                                fluid(maxHeight: 630, quality: 100) {
                                    ...GatsbyImageSharpFluid_noBase64
                                }
                            }
                        }
                    }
                `}
                render={data => this.renderWithQueryData(data)}
            />
        )
    }

    renderWithQueryData(data) {

        const title = Author.name[this.props.languageId]

        let { subtitle, description } = this.props
        if (subtitle) {
            subtitle = `${subtitle} | `
        } else {
            subtitle = ""
        }

        const finalTitle = `${subtitle}${title}`
        const finalDescription = description || this.props.subtitle

        const featuredImage = (this.props.featuredImage || data.defaultImage)
        const featuredImageUrl = new URL(featuredImage.childImageSharp.fluid.src, data.site.siteMetadata.deployUrl)

        return (
            <Helmet 
                defer={false}
                htmlAttributes={{
                    lang: this.props.language.htmlLang
                }}
            >
                <title>{finalTitle}</title>
                <meta name="description" content={finalDescription}/>
                <meta name="image" content={featuredImageUrl}/>
                <meta property="og:title" content={finalTitle}/>
                <meta property="og:image" content={featuredImageUrl}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={featuredImageUrl}/>
                <meta name="twitter:title" content={finalTitle}/>
            </Helmet>
        )
    }
}
