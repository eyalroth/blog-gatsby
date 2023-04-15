import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import './style.scss'
import createHead from '../../components/Head'

class PostSeriesTemplate extends React.Component {
    render() {
      const { seriesName } = this.props.pageContext

      const title = (
        <div className="series-title">
          <span className="series-title__text">{seriesName}</span>
        </div>
      )

      return (
        <PostList data={this.props.data}>
          {title}
        </PostList>
      )
    }
}

export default PostSeriesTemplate

export const Head = createHead()

export const pageQuery = graphql`
  query PostSeriesTemplateQuery($seriesPath: String) {
    site {
      siteMetadata {
        demo
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {series: {path: {eq: $seriesPath}}}}
      sort: {frontmatter: {series: {order: ASC}}}
    ) {
      edges {
        node {
          rawMarkdownBody
          fields {
            slug
          }
          frontmatter {
            demo
            title
            date
            tags
          }
        }
      }
    }
  }
`
