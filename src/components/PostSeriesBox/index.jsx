import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
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
        const { name: seriesName, order: postOrder } = this.props.series

        const seriesEdges = data.allMarkdownRemark.edges.filter ( edge =>
            edge.node.frontmatter.series.name == seriesName
        )

        const orderToSlug = new Map(seriesEdges.map(edge =>
            [edge.node.frontmatter.series.order, edge.node.fields.slug]
        ))

        const maxOrder = Math.max(...Array.from(orderToSlug.keys()))

        const title = <h2 className="post-series-box__title">
            This post is part of a series
        </h2>

        const firstLink = this.createLink(postOrder > 1, orderToSlug, 1, "First", "<<")
        const previousLink = this.createLink(postOrder > 1, orderToSlug, postOrder - 1, "Previous", "<")
        const nextLink = this.createLink(postOrder < maxOrder, orderToSlug, postOrder + 1, "Next", ">")
        const lastLink = this.createLink(postOrder < maxOrder, orderToSlug, maxOrder, "Last", ">>")

        const navMenu = <ul className="post-series-box__nav">
            {firstLink}
            {previousLink}
            <li className="post-series-box__nav-item current">{postOrder}</li>
            {nextLink}
            {lastLink}
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
        return (
            <li className="post-series-box__nav-item">
                {
                    (shouldDisplay) ? (
                        <Link
                            className="post-series-box__nav-link" 
                            to={orderToSlug.get(order)}
                            title={title}
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