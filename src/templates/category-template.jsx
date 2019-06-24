import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../components/PostList';

class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext

    return (
      <PostList 
        pageTitle={category}
        listTitle={category}
        {...this.props} 
      />
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $category }
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
            tagSlugs
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date
            tags
            description
          }
        }
      }
    }
  }
`
