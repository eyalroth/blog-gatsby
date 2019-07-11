import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../../components/Layout'
import { GlobalLinks } from '../../../consts/menuLinks'
import './style.scss'

class CategoriesRoute extends React.Component {
  render() {
    const categories = this.props.data.allMarkdownRemark.group

    return (
      <Layout subtitle="Categories" globalLinkId={GlobalLinks.Blog.id}>
        <div className="categories">
          <h1 className="categories__title">Categories</h1>
          <ul className="categories__list">
            {categories.map(category => (
              <li
                key={category.fieldValue}
                className="categories__list-item"
              >
                <Link
                  to={`/blog/categories/${kebabCase(
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
      </Layout>
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
