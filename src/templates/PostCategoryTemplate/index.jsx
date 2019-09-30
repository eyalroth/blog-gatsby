import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'

class PostCategoryTemplate extends React.Component {
  render() {
    const { categoryLabel } = this.props.pageContext

    return (
      <PostList subtitle={categoryLabel} data={this.props.data} />
    )
  }
}
  
export default PostCategoryTemplate

export const pageQuery = graphql`
  query PostCategoryTemplateQuery($categoryId: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $categoryId }
          layout: { eq: "post" }
          demo: { ne: false }
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
              minutes
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
