import React from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment'
import { Utterences } from '../../components/Utterances'
import Layout from '../../components/Layout'
import './style.scss'

class PostTemplate extends React.Component {
  render() {
    const { utterances } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title } = post.frontmatter
    const tags = post.fields.tagSlugs
    const readingTime = post.fields.readingTime.text

    const titleBlock = (
      <h2 className="post-single__title">{post.frontmatter.title}</h2>
    )

    const dateBlock = (
      <span className="post-single__date">
          {moment(post.frontmatter.date).format('MMMM D, YYYY')}
      </span>
    )
    
    const readTimeBlock = (
      <span className="post-single__reading-time">
        {readingTime}
      </span>
    )
    
    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    const header = (
      <div className="post-single__header">
        {titleBlock}
        <div className="post-single__subtitle">
          {dateBlock}
          <span id="subtitle-div">&#183;</span>
          {readTimeBlock}
          {tagsBlock}
        </div>
      </div>
    )

    const body = (
      <div
        className="post-single__body"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    )

    const commentsBlock = (
      <div>
        {!!utterances && <Utterences repo={utterances} />}
      </div>
    )

    const footer = (
      <div className="post-single__footer">
        {commentsBlock}
      </div>
    )

    return (
      <Layout subtitle={title} currentPath={this.props.location.pathname}>
        <div className="post-single">
          {header}
          {body}
          <hr />
          {footer}
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        utterances
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
        readingTime {
          text
        }
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`
