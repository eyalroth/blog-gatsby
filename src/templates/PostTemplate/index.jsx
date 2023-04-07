import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import 'moment/locale/he'
import Utterances from '../../components/Utterances'
import Page from '../../components/Page'
import { SidebarLinks } from '../../consts/menuLinks'
import CategoryMenu from '../../components/CategoryMenu'
import SharePanel from '../../components/SharePanel'
import MobileShareButton from '../../components/MobileShareButton'
import PostSeriesBox from '../../components/PostSeriesBox'
import Context from '../../components/Context'
import './style.scss'
import head from '../../components/Head'
import { parseReadingTimeText } from '../../utils/readtimeTime'

class PostTemplate extends React.Component {
  render() {
    const { utterances } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { category, title, tags, series, language: languageId } = post.frontmatter
    const url = this.props.location.href
    const language = this.context.page.language.get()
    const readingTimeText = parseReadingTimeText(this.props.data.markdownRemark.rawMarkdownBody, language)

    const categoryMenu = (
      <CategoryMenu categoryId={category} />
    )

    const titleBlock = (
      <h1 className='post-single__title'>{post.frontmatter.title}</h1>
    )

    const dateBlock = (
      <span className='post-single__date'>
          {moment(post.frontmatter.date).locale(language.locale).format('MMMM D, YYYY')}
      </span>
    )

    const readTimeBlock = (
      <span className='post-single__reading-time'>
        {readingTimeText}
      </span>
    )

    const tagsBlock = (
      <div className='post-single__tags'>
        <ul className='post-single__tags-list'>
          {tags &&
            tags.map(tag => (
              <li className='post-single__tags-list-item' key={tag}>
                {tag}
              </li>
            ))}
        </ul>
      </div>
    )

    const sharePanel = (
      <div className='post-single__share-panel'>
        <SharePanel url={url} />
      </div>
    )

    const header = (
      <div className='post-single__header'>
        {titleBlock}
        <div className='post-single__subtitle'>
          {dateBlock}
          <span id='subtitle-div'>&#183;</span>
          {readTimeBlock}
          <div className='post-single__header-bottom'>
            {tagsBlock}
            {sharePanel}
          </div>
        </div>
      </div>
    )

    const body = (
      <div
        className='post-single__body'
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    )

    const mobileShare = <MobileShareButton url={url} />

    const seriesBox = <PostSeriesBox series={series} />

    const commentsBlock = (
      <Utterances repo={utterances} />
    )

    const footer = (
      <div className='post-single__footer'>
        {commentsBlock}
      </div>
    )

    return (
      <Page
        languageId={languageId}
        sidebarLinkId={SidebarLinks[languageId].Blog.id}
      >
        <div className='post-single'>
          {categoryMenu}
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

PostTemplate.contextType = Context

export default PostTemplate

export const Head = head({
  getLanguageId: ({ data }) => data.markdownRemark.frontmatter.language,
  getSubtitle: ({ data }) => data.markdownRemark.frontmatter.title,
  getDescription: ({ data }) => data.markdownRemark.frontmatter.description,
  getFeaturedImage: ({ data }) => data.markdownRemark.frontmatter.featuredImage,
})

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
      rawMarkdownBody
      fields {
        slug
      }
      frontmatter {
        category
        title
        tags
        date
        description
        series {
          path
          order
        }
        language
        featuredImage {
          childImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
      }
    }
  }
`
