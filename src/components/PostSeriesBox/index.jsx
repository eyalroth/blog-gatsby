import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Context from '../Context'
import { Languages } from '../../consts/languages'
import { seriesLink } from '../../consts/menuLinks'
import './style.scss'

class PostSeriesBox extends React.Component {
    render() {
        if (this.props.series) {
            return (
                <StaticQuery
                    query={allSeriesPostsQuery}
                    render={data => this.renderWithQueryData(data)}
                />
            )
        } else {
            return null
        }
    }
            
    renderWithQueryData(data) {
        const { series } = this.props
        const language = this.context.layout.language.get()
        const { path: seriesPath, order: postOrder, name: seriesName } = series

        const seriesEdges = data.allMarkdownRemark.edges.filter ( edge =>
            edge.node.frontmatter.series.path === seriesPath
        )

        const orderToSlug = new Map(seriesEdges.map(edge =>
            [edge.node.frontmatter.series.order, edge.node.fields.slug]
        ))

        const maxOrder = Math.max(...Array.from(orderToSlug.keys()))

        function switchLanguage(english, hebrew) {
            // eslint-disable-next-line
            switch(language) {
                case Languages.English:
                    return english
                case Languages.Hebrew:
                    return hebrew
            }
        }

        const title = (
            <span className="post-series-box__title">
                <Link
                    className="post-series-box__series-link" 
                    to={seriesLink(seriesPath, language)}
                    title={seriesName}
                >
                    {seriesName}
                </Link>
            </span>
        )

        const subtitle = (
            <span className="post-series-box__subtitle">
                {postOrder}
            </span>
        )

        const rightArrow = String.fromCharCode("0xe80a")

        const firstLink = this.createLink(postOrder > 1, orderToSlug, 1, 
            switchLanguage("First", "ראשון"),
            "backwards",
            `${rightArrow}${rightArrow}`)
        const previousLink = this.createLink(postOrder > 1, orderToSlug, postOrder - 1,
            switchLanguage("Previous", "קודם"),
            "backwards",
            rightArrow)
        const nextLink = this.createLink(postOrder < maxOrder, orderToSlug, postOrder + 1, 
            switchLanguage("Next", "הבא"),
            "forwards",
            rightArrow)
        const lastLink = this.createLink(postOrder < maxOrder, orderToSlug, maxOrder, 
            switchLanguage("Last", "אחרון"),
            "forwards",
            `${rightArrow}${rightArrow}`)

        return (
            <div className="post-series-box">
                <ul className="post-series-box__list">
                    {firstLink}
                    {previousLink}
                    <li className="post-series-box__list-item middle">
                        {title}
                        <br/>
                        {subtitle}
                    </li>
                    {nextLink}
                    {lastLink}
                </ul>
            </div>
        )
    }

    createLink(shouldDisplay, orderToSlug, order, title, cssClass, content) {
        return (
            <li className="post-series-box__list-item">
                {
                    (shouldDisplay) ? (
                        <Link
                            className="post-series-box__link" 
                            to={orderToSlug.get(order)}
                            title={title}
                        >
                            <span title={title}
                                className={`post-series-box__link-icon ${cssClass}`}
                                style={{fontFamily: "fontello"}}
                            >
                                {content}
                            </span>
                        </Link>
                    ) : null
                }
            </li>
        )
    }
}

PostSeriesBox.contextType = Context

export default PostSeriesBox

const allSeriesPostsQuery = graphql`
    query PostSeriesBoxQuery {
        allMarkdownRemark(
            filter: { frontmatter: { 
                demo: { ne: true }
                series: { path: { ne: null }}
            }}
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        series {
                            path
                            order
                        }
                    }
                }
            }
        }
    }
`