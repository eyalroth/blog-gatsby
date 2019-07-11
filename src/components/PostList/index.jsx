import React from 'react'
import moment from 'moment'
import Layout from '../Layout'
import PostListHeader from '../PostListHeader'
import PostListItem from '../PostListItem'
import './style.scss'

class PostList extends React.Component {
  render() {
    const items = []
    const { pageTitle } = this.props
    const posts = this.props.data.allMarkdownRemark.edges
    const years = new Set()

    let isFirst = true

    posts.forEach(post => {
      const year = moment(post.node.frontmatter.date).year()
      const showYear = !years.has(year)
      years.add(year)

      items.push(
        <PostListItem
          data={post}
          key={post.node.fields.slug} 
          showYear={showYear}
          isFirst={isFirst}
        />
      )
      
      isFirst = false
    })

    return (
      <Layout subtitle={pageTitle} currentPath={this.props.location.pathname}>
        <div className="posts">
          <PostListHeader currentPath={this.props.location.pathname}/>
          {items}
        </div>
      </Layout>
    )
  }
}

export default PostList