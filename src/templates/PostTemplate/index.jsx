import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import { Utterences } from '../../components/Utterances'
import Layout from '../../components/Layout'
import { GlobalLinks } from '../../consts/menuLinks'
import SharePanel from '../../components/SharePanel'
import './style.scss'
import MobileShareButton from '../../components/MobileShareButton';

class PostTemplate extends React.Component {
  render() {
    const { utterances } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title, tags } = post.frontmatter
    const readingTime = post.fields.readingTime.text
    const url = this.props.location.href

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
            tags.map(tag => (
              <li className="post-single__tags-list-item" key={tag}>
                {tag}
              </li>
            ))}
        </ul>
      </div>
    )

    const sharePanel = (
      <div className="post-single__share-panel">
        <SharePanel url={url}/>
      </div>
    )

    const header = (
      <div className="post-single__header">
        {titleBlock}
        <div className="post-single__subtitle">
          {dateBlock}
          <span id="subtitle-div">&#183;</span>
          {readTimeBlock}
          <div className="post-single__header-bottom">
            {tagsBlock}
            {sharePanel}
          </div>
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

    const mobileShare = <MobileShareButton url={url}/>

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
      <Layout subtitle={title} globalLinkId={GlobalLinks.Blog.id}>
        <div className="post-single">
          {header}
          {mobileShare}
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
