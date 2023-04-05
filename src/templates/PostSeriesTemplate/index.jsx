import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import CategoryMenu from '../../components/CategoryMenu'
import './style.scss'
import head from '../../components/Head'

class PostSeriesTemplate extends React.Component {
    render() {
      const { seriesName } = this.props.pageContext
      const firstNode = this.props.data.allMarkdownRemark.edges[0].node
      const { language: languageId, category } = firstNode.frontmatter

      const title = (
        <div className="series-title">
          <span className="series-title__text">{seriesName}</span>
        </div>
      )

      return (
        <PostList languageId={languageId} data={this.props.data}>
          <CategoryMenu categoryId={category}/>
          {title}
        </PostList>
      )
    }
}

export default PostSeriesTemplate

export const Head = head({
  getLanguageId: ({ data }) => data.allMarkdownRemark.edges[0].node.frontmatter.language,
  getSubtitle: ({ pageContext }) => pageContext.seriesName,
})

export const pageQuery = graphql`
  query PostSeriesTemplateQuery($seriesPath: String) {
    allMarkdownRemark(
      filter: {frontmatter: {demo: {ne: true}, series: {path: {eq: $seriesPath}}}}
      sort: {frontmatter: {series: {order: ASC}}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            language
            category
          }
        }
      }
    }
  }
`
