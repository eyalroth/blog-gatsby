import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList';

class PostListTemplate extends React.Component {
    render() {
      const { categoryId, categoryLabel } = this.props.pageContext
  
      return (
        <PostList
            categoryId={categoryId}
            pageTitle={categoryLabel}
            {...this.props}
        />
      )
    }
}
  
export default PostListTemplate

export const pageQuery = graphql`
  query PostListTemplateQuery($categoryId: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $categoryId }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`
