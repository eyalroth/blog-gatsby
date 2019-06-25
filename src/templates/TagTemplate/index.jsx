import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList';

class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext

    return (
      <PostList 
        pageTitle={tag}
        listTitle={`Articles tagged as "${tag}"`}
        {...this.props}
      />
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
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