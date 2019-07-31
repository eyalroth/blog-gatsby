import React from 'react'
import { graphql } from 'gatsby'
import PostList from '../../components/PostList'
import NavMenu from '../../components/NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class PostCategoryTemplate extends React.Component {
  render() {
    const { languageId, categoryId, categoryLabel } = this.props.pageContext
    const categories = CategoryLinks[languageId]

    function categoryHeader(){
      if (Object.keys(categories).length > 1) {
        return (
            <div className="category-header">
                <NavMenu
                    id="blog-category"
                    languageId={languageId}
                    linkDescriptions={categories}
                    classNamePrefix="category-header__menu"
                    currentLinkId={categoryId}
                />
            </div>
        )
      } else {
          return null
      }
    }

    return (
      <PostList languageId={languageId} subtitle={categoryLabel} data={this.props.data}>
        {categoryHeader()}
      </PostList>
    )
  }
}
  
export default PostCategoryTemplate

export const pageQuery = graphql`
  query PostCategoryTemplateQuery($categoryId: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $categoryId }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
              minutes
            }
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
`
