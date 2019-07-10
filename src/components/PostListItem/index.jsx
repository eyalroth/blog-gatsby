import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Toggle from '../Toggle'
import './style.scss'

class PostListItem extends React.Component {
  render() {
    const { showYear } = this.props
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter
    const { slug, tagSlugs } = this.props.data.node.fields
    
    const readingTime = <span key="readingTime">
      {this.props.data.node.fields.readingTime.text}
    </span>

    var tags =  this.props.data.node.frontmatter.tags
    if (tags != null) {
      let tagToSlug = tags.map(function(e, i) {
        return {
          label: e,
          slug: tagSlugs[i]
        }
      });

      tags = tagToSlug.map (tag => (
        [<span key={tag.label}>
          <Link to={tag.slug}>
            {tag.label}
          </Link>
        </span>,
        <span key={`${tag.label}-div`} className="tagDivider">&#183;</span>]
      ))
      
      tags = [].concat(...tags).slice(0, -1)

      tags = [
        <span key="tagsDivider" className="divider"/>,
        tags
      ]
    }

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

    const details = (
      <Toggle isEnabled={!this.props.isFirst}>
        <div className="post-item__details">
          <header>
            <Link to={slug}>
              {title}
            </Link>
          </header>
          
          <footer>
            {readingTime}
            {tags}
          </footer>
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
