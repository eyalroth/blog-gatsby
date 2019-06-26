import React from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from '../../../components/Layout'
import './style.scss'

class TagsRoute extends React.Component {
  render() {
    const tags = this.props.data.allMarkdownRemark.group

    return (
      <Layout subtitle="Tags">
        <div className="tags">
          <h1 className="tags__title">Tags</h1>
          <ul className="tags__list">
            {tags.map(tag => (
              <li key={tag.fieldValue} className="tags__list-item">
                <Link
                  to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}
                  className="tags__list-item-link"
                >
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default TagsRoute

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
