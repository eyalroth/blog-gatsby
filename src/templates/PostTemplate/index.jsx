import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import 'moment/locale/he'
import LittleFoot from '../../components/Littlefoot'
import Utterances from '../../components/Utterances'
import PageHelmet from '../../components/PageHelmet'
import SharePanel from '../../components/SharePanel'
import MobileShareButton from '../../components/MobileShareButton'
import PostSeriesBox from '../../components/PostSeriesBox'
import Context from '../../components/Context'
import './style.scss'

class PostTemplate extends React.Component {
  render() {
    const { utterances } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title, tags, series } = post.frontmatter
    const readingTime = post.fields.readingTime
    const url = this.props.location.href
    const language = this.context.layout.language.get()

    let featuredImage = post.frontmatter.featuredImage

    const titleBlock = (
      <h1 className="post-single__title">{post.frontmatter.title}</h1>
    )

    const dateBlock = (
      <span className="post-single__date">
          {moment(post.frontmatter.date).locale(language.locale).format('MMMM D, YYYY')}
      </span>
    )
    
    const readTimeBlock = (
      <span className="post-single__reading-time">
        {readingTime.text}
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
      <LittleFoot>
        <div 
          className="post-single__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </LittleFoot>
    )

    const mobileShare = <MobileShareButton url={url}/>

    const seriesBox = <PostSeriesBox series={series}/>

    const commentsBlock = (
        <Utterances repo={utterances} />
    )

    const footer = (
      <div className="post-single__footer">
        {commentsBlock}
      </div>
    )

    return (
      <div className="post-single">
        <PageHelmet subtitle={title} featuredImage={featuredImage} />
        {header}
        {mobileShare}
        {seriesBox}
        {body}
        <hr />
        {footer}
      </div>
    )
  }
}

PostTemplate.contextType = Context

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
          minutes
        }
      }
      frontmatter {
        title
        tags
        date
        description
        series {
          path
          order
        }
        featuredImage {
          childImageSharp {
            fluid(quality: 100) {
              src
            }
          }
        }
      }
    }
  }
`
