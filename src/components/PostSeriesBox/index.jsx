import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
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
        const { language, series } = this.props
        const { name: seriesName, order: postOrder } = series

        const seriesEdges = data.allMarkdownRemark.edges.filter ( edge =>
            edge.node.frontmatter.series.name == seriesName
        )

        const orderToSlug = new Map(seriesEdges.map(edge =>
            [edge.node.frontmatter.series.order, edge.node.fields.slug]
        ))

        const maxOrder = Math.max(...Array.from(orderToSlug.keys()))

        const titlePrefix = (function(lang) {
            switch(lang) {
                case Languages.English:
                    return "This post is part of a "
                case Languages.Hebrew:
                    return "פוסט זה הוא חלק מ"
            }
        })(language)

        const linkLabel = (function(lang) {
            switch(lang) {
                case Languages.English:
                    return "series"
                case Languages.Hebrew:
                    return "סדרה"
            }
        })(language)

        const title = <h2 className="post-series-box__title">
            {titlePrefix}
            <Link
                className="post-series-box__series-link" 
                to={`/blog/series/${_.kebabCase(seriesName)}`}
                title={linkLabel}
            >
                {linkLabel}    
            </Link>
        </h2>


        const firstLink = this.createLink(postOrder > 1, orderToSlug, 1, 
            new Map([[Languages.English, "First"], [Languages.Hebrew, "ראשון"]]),
            (language.ltr) ? "<<" : ">>")
        const previousLink = this.createLink(postOrder > 1, orderToSlug, postOrder - 1,
            new Map([[Languages.English, "Previous"], [Languages.Hebrew, "קודם"]]),
            (language.ltr) ? "<" : ">")
        const nextLink = this.createLink(postOrder < maxOrder, orderToSlug, postOrder + 1, 
            new Map([[Languages.English, "Next"], [Languages.Hebrew, "הבא"]]),
            (language.ltr) ? ">" : "<")
        const lastLink = this.createLink(postOrder < maxOrder, orderToSlug, maxOrder, 
            new Map([[Languages.English, "Last"], [Languages.Hebrew, "אחרון"]]),
            (language.ltr) ? ">>" : "<<")

        const navMenu = <ul className="post-series-box__nav">
            {(language.ltr) ? firstLink : lastLink}
            {(language.ltr) ? previousLink : nextLink}
            <li className="post-series-box__nav-item current">{postOrder}</li>
            {(language.ltr) ? nextLink : previousLink}
            {(language.ltr) ? lastLink : firstLink}
        </ul>
        
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