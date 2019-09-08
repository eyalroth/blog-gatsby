import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Context from '../../components/Context'
import { Author } from '../../consts/author'

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
                        defaultImage: file(relativePath: { eq: "icon2.png" }) {
                            childImageSharp {
                                fluid(quality: 100, maxWidth: 1315, maxHeight: 690, fit: CONTAIN, background: "rgba(0,0,0,0)") {
                                    src
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

        const language = this.context.layout.language.get()
        const title = Author.name[language.id]

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
        const featuredImageType = featuredImageUrl.toString().endsWith("png") ? "png" : "jpeg"

        return (
            <Helmet 
                defer={false}
                htmlAttributes={{
                    lang: language.htmlLang
                }}
            >
                <title>{finalTitle}</title>
                <meta name="description" content={finalDescription}/>
                <meta name="image" content={featuredImageUrl}/>
                <meta property="og:title" content={finalTitle}/>
                <meta property="og:image" content={featuredImageUrl}/>
                <meta property="og:image:type" content={`image/${featuredImageType}`}/>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={featuredImageUrl}/>
                <meta name="twitter:title" content={finalTitle}/>
            </Helmet>
        )
    }
}

PageHelmet.contextType = Context

export default PageHelmet