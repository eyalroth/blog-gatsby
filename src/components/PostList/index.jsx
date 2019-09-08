import React from 'react'
import moment from 'moment'
import PageHelmet from '../PageHelmet'
import PostListItem from '../../components/PostListItem'

class PostList extends React.Component {
    render() {
      const { subtitle, children } = this.props
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
        <div className="posts">
          <PageHelmet subtitle={subtitle}/>
          {children}
          {items}
        </div>
      )
    }
}

export default PostList