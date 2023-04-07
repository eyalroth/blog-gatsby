import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import 'moment/locale/he'
import Context from '../../components/Context'
import './style.scss'
import { parseReadingTimeText } from '../../utils/readtimeTime'

class PostListItem extends React.Component {
  render() {
    const { showYear } = this.props
    const { title, date, tags } = this.props.data.node.frontmatter
    const { slug } = this.props.data.node.fields
    const language = this.context.page.language.get()
    const readingTimeText = parseReadingTimeText(this.props.data.node.rawMarkdownBody, language)


    const itemDate = moment(date).locale(language.locale)

    const time = (
      <time
        className="post-item__time"
        dateTime={itemDate.format('MM DD, YYYY')}
        pubdate=""
      >
        <span className="year nonmobile">
          {(showYear) ? itemDate.format('YYYY') : "    "}
        </span>
        <span className="day mobile">{itemDate.format('DD')}</span>
        <span className="month mobile">{itemDate.format('MMM')}</span>
        <span className="year mobile">{itemDate.format(' YYYY')}</span>
        <span className="month nonmobile">{itemDate.format('MMM')}</span>
        <span className="day nonmobile">{itemDate.format('DD')}</span>
      </time>
    )

    const titleHtml = (
      <div className="post-item__details-title">
        <Link to={slug}>
          {title}
        </Link>
      </div>
    )

    const readingTimeMobile =(
      <span className="post-item__details-meta-reading-time mobile">
        {readingTimeText}
      </span>
    )

    const readingTimeNonMobile = (
      <li className="post-item__details-meta-reading-time nonmobile" key="readingTime">
        {readingTimeText}
      </li>
    )

    const meta = (
      <ul className="post-item__details-meta">
        {readingTimeNonMobile}
        {tags && <li className="post-item__details-meta-tags-divider" key="divider"/>}
        {tags && tags.map(tag => (
          <li className="post-item__details-meta-tags-item" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    )

    const details = (
      <div className="post-item__details">
        {titleHtml}
        {meta}
      </div>
    )

    return (
      <article className="post-item">
        {time}
        {readingTimeMobile}
        {details}
      </article>
    )
  }
}

PostListItem.contextType = Context

export default PostListItem
