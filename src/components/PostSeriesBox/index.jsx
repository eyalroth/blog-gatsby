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
        const { path: seriesPath, order: postOrder } = series

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

        function linkLabel() {
            return switchLanguage("series", "סדרה")
        }

        const title = (
            <h2 className="post-series-box__title">
                {switchLanguage("This post is part of a ", "פוסט זה הוא חלק מ")}
                <Link
                    className="post-series-box__series-link" 
                    to={seriesLink(seriesPath, language)}
                    title={linkLabel()}
                >
                    {linkLabel()}
                </Link>
            </h2>
        )

        const firstLink = this.createLink(postOrder > 1, orderToSlug, 1, 
            switchLanguage("First", "ראשון"),
            "icon-fast-fw backwards")
        const previousLink = this.createLink(postOrder > 1, orderToSlug, postOrder - 1,
            switchLanguage("Previous", "קודם"),
            "icon-play backwards")
        const nextLink = this.createLink(postOrder < maxOrder, orderToSlug, postOrder + 1, 
            switchLanguage("Next", "הבא"),
            "icon-play forwards")
        const lastLink = this.createLink(postOrder < maxOrder, orderToSlug, maxOrder, 
            switchLanguage("Last", "אחרון"),
            "icon-fast-fw forwards")

        const navMenu =  (
            <ul className="post-series-box__nav">
                {firstLink}
                {previousLink}
                <li className="post-series-box__nav-item current">{postOrder}</li>
                {nextLink}
                {lastLink}
            </ul>
        )

        return (
            <div className="post-series-box">
                <div className="post-series-box__content">
                    {title}
                    {navMenu}
                </div>
            </div>
        )
    }

    createLink(shouldDisplay, orderToSlug, order, title, iconClass) {
        return (
            <li className="post-series-box__nav-item">
                {
                    (shouldDisplay) ? (
                        <Link
                            className="post-series-box__nav-link" 
                            to={orderToSlug.get(order)}
                            title={title}
                        >
                            <i title={title} className={iconClass} />
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