import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import CategoryMenu from '../../components/CategoryMenu'
import head from '../../components/Head'

class PostCategoryTemplate extends React.Component {
  render() {
    const { languageId, categoryId } = this.props.pageContext

    return (
      <PostList languageId={languageId} data={this.props.data}>
        <CategoryMenu categoryId={categoryId} />
      </PostList>
    )
  }
}

export default PostCategoryTemplate

export const Head = head({
  getLanguageId: ({ pageContext }) => pageContext.languageId,
  getSubtitle: ({ pageContext }) => pageContext.categoryLabel,
})

export const pageQuery = graphql`
  query PostCategoryTemplateQuery($categoryId: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {category: {eq: $categoryId}, layout: {eq: "post"}, demo: {ne: true}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          rawMarkdownBody
          fields {
            slug
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
