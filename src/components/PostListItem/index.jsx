import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class PostListItem extends React.Component {
  render() {
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

    return (
      <article className="post-item">
        <time dateTime={moment(date).format('MM DD, YYYY')}>
          {moment(date).format('DD MMM YYYY')}
        </time>

        <header>
          <Link to={slug}>
            {title}
          </Link>
        </header>
        
        <footer>
          {readingTime}
          {tags}
        </footer>
      </article>
    )
  }
}

export default PostListItem
