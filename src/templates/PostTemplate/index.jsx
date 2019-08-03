import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import 'moment/locale/he'
import Utterences from '../../components/Utterances'
import Page from '../../components/Page'
import { Languages } from '../../consts/languages'
import { SidebarLinks } from '../../consts/menuLinks'
import CategoryTab from '../../components/CategoryTab'
import SharePanel from '../../components/SharePanel'
import MobileShareButton from '../../components/MobileShareButton'
import PostSeriesBox from '../../components/PostSeriesBox'
import ContextConsumer from '../../components/Context'
import './style.scss'

class PostTemplate extends React.Component {
  render() {
    const { utterances } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { category, title, tags, series, language: languageId } = post.frontmatter
    const readingTime = post.fields.readingTime
    const url = this.props.location.href

    const categoryTab = (
      <CategoryTab categoryId={category}/>
    )

    const titleBlock = (
      <h2 className="post-single__title">{post.frontmatter.title}</h2>
    )

    const dateBlock = (
      <ContextConsumer>
        {({language}) => (
          <span className="post-single__date">
              {moment(post.frontmatter.date).locale(language.get().locale).format('MMMM D, YYYY')}
          </span>
        )}
      </ContextConsumer>
    )
    
    const readTimeBlock = (
      <ContextConsumer>
        {({language}) => (
          <span className="post-single__reading-time">
            {(function(lang) {
              switch(lang) {
                  case Languages.English:
                      return readingTime.text
                  case Languages.Hebrew:
                    const minutes = Math.round(readingTime.minutes)
                    if (minutes < 2) {
                      return "דקת קריאה אחת"
                    } else {
                      return `${minutes} דקות קריאה`
                    }
              }
            })(language.get())}
          </span>
        )}
      </ContextConsumer>
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

    const seriesBox = <PostSeriesBox series={series}/>

    const commentsBlock = (
        <Utterences repo={utterances} />
    )

    const footer = (
      <div className="post-single__footer">
        {commentsBlock}
      </div>
    )

    return (
      <Page languageId={languageId} subtitle={title} sidebarLinkId={SidebarLinks[languageId].Blog.id}>
        <div className="post-single">
          {categoryTab}
          {header}
          {mobileShare}
          {seriesBox}
          {body}
          <hr />
          {footer}
        </div>
      </Page>
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
          minutes
        }
      }
      frontmatter {
        category
        title
        tags
        date
        description
        series {
          name
          order
        }
        language
      }
    }
  }
`
