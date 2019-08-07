import React from 'react'
import moment from 'moment'
import Page from '../../components/Page'
import PostListItem from '../../components/PostListItem'
import { SidebarLinks } from '../../consts/menuLinks'

class PostList extends React.Component {
    render() {
      const { languageId, subtitle, children } = this.props
      const posts = this.props.data.allMarkdownRemark.edges
  
      const years = new Set()

      const items = posts.map(post => {
        const year = moment(post.node.frontmatter.date).year()
        const showYear = !years.has(year)
        years.add(year)

        const item = (
          <PostListItem
            key={post.node.fields.slug}
            data={post}
            showYear={showYear}
          />
        )

        return item
      })

      return (
        <Page languageId={languageId} subtitle={subtitle} sidebarLinkId={SidebarLinks[languageId].Blog.id}>
          <div className="posts">
            {children}
            {items}
          </div>
        </Page>
      )
    }
}
  
export default PostList