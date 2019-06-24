import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Page from '../components/Page'

class CategoriesRoute extends React.Component {
  render() {
    const categories = this.props.data.allMarkdownRemark.group

    return (
      <Page title="Categories">
        <div className="categories">
          <ul className="categories__list">
            {categories.map(category => (
              <li
                key={category.fieldValue}
                className="categories__list-item"
              >
                <Link
                  to={`/categories/${kebabCase(
                    category.fieldValue
                  )}/`}
                  className="categories__list-item-link"
                >
                  {category.fieldValue} ({category.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    )
  }
}

export default CategoriesRoute

export const pageQuery = graphql`
  query CategoryesQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
