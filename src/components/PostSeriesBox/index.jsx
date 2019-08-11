import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Context from '../Context'
import { Languages } from '../../consts/languages'
import './style.scss'

const _ = require('lodash')

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
        const language = this.context.page.language.get()
        const { name: seriesName, order: postOrder } = series

        const seriesEdges = data.allMarkdownRemark.edges.filter ( edge =>
            edge.node.frontmatter.series.name == seriesName
        )

        const orderToSlug = new Map(seriesEdges.map(edge =>
            [edge.node.frontmatter.series.order, edge.node.fields.slug]
        ))

        const maxOrder = Math.max(...Array.from(orderToSlug.keys()))

        function titlePrefix(lang) {
            switch(lang) {
                case Languages.English:
                    return "This post is part of a "
                case Languages.Hebrew:
                    return "פוסט זה הוא חלק מ"
            }
        }

        function linkLabel(lang) {
            switch(lang) {
                case Languages.English:
                    return "series"
                case Languages.Hebrew:
                    return "סדרה"
            }
        }

        const title = (
            <h2 className="post-series-box__title">
                {titlePrefix(language)}
                <Link
                    className="post-series-box__series-link" 
                    to={`/blog/series/${_.kebabCase(seriesName)}`}
                    title={linkLabel(language)}
                >
                    {linkLabel(language)}
                </Link>
            </h2>
        )

        const ltr = language.ltr

        const firstLink = this.createLink(postOrder > 1, orderToSlug, 1, 
            new Map([[Languages.English, "First"], [Languages.Hebrew, "ראשון"]]),
            (ltr) ? "<<" : ">>")
        const previousLink = this.createLink(postOrder > 1, orderToSlug, postOrder - 1,
            new Map([[Languages.English, "Previous"], [Languages.Hebrew, "קודם"]]),
            (ltr) ? "<" : ">")
        const nextLink = this.createLink(postOrder < maxOrder, orderToSlug, postOrder + 1, 
            new Map([[Languages.English, "Next"], [Languages.Hebrew, "הבא"]]),
            (ltr) ? ">" : "<")
        const lastLink = this.createLink(postOrder < maxOrder, orderToSlug, maxOrder, 
            new Map([[Languages.English, "Last"], [Languages.Hebrew, "אחרון"]]),
            (ltr) ? ">>" : "<<")

        const navMenu =  (
            <ul className="post-series-box__nav">
                {(ltr) ? firstLink : lastLink}
                {(ltr) ? previousLink : nextLink}
                <li className="post-series-box__nav-item current">{postOrder}</li>
                {(ltr) ? nextLink : previousLink}
                {(ltr) ? lastLink : firstLink}
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

    createLink(shouldDisplay, orderToSlug, order, title, symbol) {
        const { language } = this.props
        return (
            <li className="post-series-box__nav-item">
                {
                    (shouldDisplay) ? (
                        <Link
                            className="post-series-box__nav-link" 
                            to={orderToSlug.get(order)}
                            title={title.get(language)}
                        >
                            {symbol}
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
                draft: { ne: true }
                series: { name: { ne: null }}
            }}
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        series {
                            name
                            order
                        }
                    }
                }
            }
        }
    }
`