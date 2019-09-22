import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import './style.scss'

class PostSeriesTemplate extends React.Component {
    render() {
      const { seriesName } = this.props.pageContext

      const title = (
        <div className="series-title">
          <span className="series-title__text">{seriesName}</span>
        </div>
      )

      return (
        <PostList subtitle={seriesName} data={this.props.data}>
          {title}
        </PostList>
      )
    }
}
  
export default PostSeriesTemplate

export const pageQuery = graphql`
  query PostSeriesTemplateQuery($seriesPath: String) {
      allMdx(
          filter: { frontmatter: { 
              demo: { ne: false }
              series: { path: { eq: $seriesPath }}
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
            }
          }
        }
      }
  }
`