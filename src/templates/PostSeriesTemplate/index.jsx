import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import CategoryMenu from '../../components/CategoryMenu'
import './style.scss'

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
        <PostList languageId={languageId} subtitle={seriesName} data={this.props.data}>
          <CategoryMenu categoryId={category}/>
          {title}
        </PostList>
      )
    }
}
  
export default PostSeriesTemplate

export const pageQuery = graphql`
  query PostSeriesTemplateQuery($seriesName: String) {
      allMarkdownRemark(
          filter: { frontmatter: { 
              demo: { ne: true }
              series: { name: { eq: $seriesName }}
          }}
          sort: { order: ASC, fields: [frontmatter___series___order] }
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
              language
              category
            }
          }
        }
      }
  }
`