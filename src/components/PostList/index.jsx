import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../Layout'
import Post from '../Post'
import Sidebar from '../Sidebar'
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
      <Layout>
        <div>
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
                <h1 className="page__title">{listTitle}</h1>
                {items}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PostList