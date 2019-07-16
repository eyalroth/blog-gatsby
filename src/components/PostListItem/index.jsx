import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Toggle from '../Toggle'
import './style.scss'

class PostListItem extends React.Component {
  render() {
    const { showYear } = this.props
    const { title, date, tags } = this.props.data.node.frontmatter
    const { slug } = this.props.data.node.fields

    const itemDate = moment(date)

    const yearHeader = (
      <Toggle isEnabled={!this.props.isFirst && showYear}>
        <h2 className="post-item__year">
          {(showYear) ? itemDate.format('YYYY') : "    "}
        </h2>
      </Toggle>
    )

    const time = (
        <Toggle isEnabled={!this.props.isFirst}>
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
        </Toggle>
    )

    const detailsHeader = (
      <div className="post-item__details-header">
        <Link to={slug}>
          {title}
        </Link>
      </div>
    )

    const detailsFooter = (
      <ul className="post-item__details-footer">
        <li className="post-item__details-footer-reading-time" key="readingTime">
          {this.props.data.node.fields.readingTime.text}
        </li>
        {tags && <li className="post-item__details-footer-tags-divider" key="divider"/>}
        {tags && tags.map(tag => (
          <li className="post-item__details-footer-tags-item" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    )

    const details = (
      <Toggle isEnabled={!this.props.isFirst}>
        <div className="post-item__details">
          {detailsHeader}
          {detailsFooter}
        </div>
      </Toggle>
    )

    return (
      <article className="post-item">
        {yearHeader}
        {time}
        {details}
      </article>
    )
  }
}

export default PostListItem
