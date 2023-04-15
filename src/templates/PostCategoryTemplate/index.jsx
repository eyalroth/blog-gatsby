import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import createHead from '../../components/Head'

class PostCategoryTemplate extends React.Component {
  render() {
    return (
      <PostList data={this.props.data} />
    )
  }
}

export default PostCategoryTemplate

export const Head = createHead()

export const pageQuery = graphql`
  query PostCategoryTemplateQuery($categoryId: String) {
    site {
      siteMetadata {
        demo
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {category: {eq: $categoryId}, layout: {eq: "post"}}}
      sort: {frontmatter: {date: DESC}}
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
