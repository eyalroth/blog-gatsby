import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList';

class Blog extends React.Component {
  render() {
    return (
      <PostList 
        pageTitle="Blog"
        listTitle="Articles"
        {...this.props} 
      />
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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
