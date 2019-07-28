import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import Page from '../../components/Page'
import PostListHeader from '../../components/PostListHeader'
import PostListItem from '../../components/PostListItem'
import { SidebarLinks } from '../../consts/menuLinks'
import './style.scss'

class PostListTemplate extends React.Component {
    render() {
      const { languageId, categoryId, categoryLabel } = this.props.pageContext
      const posts = this.props.data.allMarkdownRemark.edges
  
      const years = new Set()
      let isFirst = true

      const items = posts.map(post => {
        const year = moment(post.node.frontmatter.date).year()
        const showYear = !years.has(year)
        years.add(year)

        const item = (
          <PostListItem
            data={post}
            key={post.node.fields.slug} 
            showYear={showYear}
            isFirst={isFirst}
          />
        )
        isFirst = false

        return item
      })

      return (
        <Page languageId={languageId} subtitle={categoryLabel} sidebarLinkId={SidebarLinks[languageId].Blog.id}>
          <div className="posts">
            <PostListHeader languageId={languageId} categoryId={categoryId}/>
            {items}
          </div>
        </Page>
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
