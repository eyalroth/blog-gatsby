import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { title } = post.frontmatter

    return (
      <Layout subtitle={title}>
        <PostTemplateDetails {...this.props} />
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
        readingTime {
          text
        }
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`
