import React from 'react'
import Layout from '../Layout'
import Post from '../Post'
import './style.scss'

class PostList extends React.Component {
  render() {
    const items = []
    const { pageTitle, listTitle } = this.props
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <Layout subtitle={pageTitle}>
        <div>
          <div className="posts">
            <h1 className="posts__title">{listTitle}</h1>
            {items}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostList