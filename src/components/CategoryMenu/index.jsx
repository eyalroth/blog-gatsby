import React from 'react'
import pickBy from 'lodash/pickBy'
import { StaticQuery, graphql } from 'gatsby'
import Context from '../Context'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryMenu extends React.Component {
  render() {
    return (
      <StaticQuery
          query={categoryMenuQuery}
          render={data => this.renderWithQueryData(data)}
      />
    )
  }

  renderWithQueryData(data) {
    const { categoryId } = this.props
    const languageId = this.context.layout.language.get().id
    
    const demoMode = data.site.siteMetadata.demo

    const links = pickBy(CategoryLinks[languageId], (link, id) => link.demoType.matchDemoMode(demoMode))

    return (
      <NavMenu
          linkDescriptions={links}
          classNamePrefix="category-menu"
          currentLinkId={categoryId}
      />
    )
  }
}

CategoryMenu.contextType = Context
  
export default CategoryMenu

const categoryMenuQuery = graphql`
  query CategoryMenuQuery {
    site {
      siteMetadata {
        demo
      }
    }
  }
`