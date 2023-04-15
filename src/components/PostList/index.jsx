import React from 'react'
import moment from 'moment'
import PostListItem from '../../components/PostListItem'

import { parseDemoType } from '../../consts/demo'

class PostList extends React.Component {
    render() {
      const { subtitle, children } = this.props
      const demoMode = this.props.data.site.siteMetadata.demo 
      
      const posts = this.props.data.allMarkdownRemark.edges.filter(post => {
        const rawDemoType = post.node.frontmatter.demo
        return parseDemoType(rawDemoType).matchDemoMode(demoMode)
      })
  
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
        <div className="posts">
          {children}
          {items}
        </div>
      )
    }
}

export default PostList