import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import 'moment/locale/he'
import Context from '../../components/Context'
import Toggle from '../Toggle'
import { Languages } from '../../consts/languages'
import './style.scss'

class PostListItem extends React.Component {
  render() {
    const { showYear } = this.props
    const { title, date, tags, } = this.props.data.node.frontmatter
    const { slug, readingTime } = this.props.data.node.fields
    const language = this.context.page.language.get()
    
    const readingTimeText = (function(lang) {
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
    })(language)

    const itemDate = moment(date).locale(language.locale)

    const yearHeader = (
      <Toggle isEnabled={showYear}>
        <span className="post-item__year">
          {(showYear) ? itemDate.format('YYYY') : "    "}
        </span>
      </Toggle>
    )

    const time = (
      <time 
        className="post-item__time"
        dateTime={itemDate.format('MM DD, YYYY')}
        pubdate=""
      >
        <span className="day mobile">{itemDate.format('DD')}</span>
        <span className="month mobile">{itemDate.format('MMM')}</span>
        <span className="year mobile">{itemDate.format(' YYYY')}</span>
        <span className="month nonmobile">{itemDate.format('MMM')}</span>
        <span className="day nonmobile">{itemDate.format('DD')}</span>
        <span className="year nonmobile">{itemDate.format(', YYYY')}</span>
      </time>
    )

    const detailsHeader = (
      <div className="post-item__details-header">
        <Link to={slug}>
          {title}
        </Link>
      </div>
    )

    const readingTimeMobile =(
      <span className="post-item__reading-time mobile">
        {readingTimeText}
      </span>
    )

    const readingTimeNonMobile = (
      <li className="post-item__reading-time nonmobile" key="readingTime">
        {readingTimeText}
      </li>
    )

    const detailsFooter = (
      <ul className="post-item__details-footer">
        {readingTimeNonMobile}
        {tags && <li className="post-item__details-footer-tags-divider" key="divider"/>}
        {tags && tags.map(tag => (
          <li className="post-item__details-footer-tags-item" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    )

    const details = (
      <div className="post-item__details">
        {detailsHeader}
        {detailsFooter}
      </div>
    )

    return (
      <article className="post-item">
        {yearHeader}
        {time}
        {readingTimeMobile}
        {details}
      </article>
    )
  }
}

PostListItem.contextType = Context

export default PostListItem
