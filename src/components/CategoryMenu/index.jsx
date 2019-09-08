import React from 'react'
import Context from '../Context'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryMenu extends React.Component {
  render() {
    const { categoryId } = this.props
    const languageId = this.context.layout.language.get().id

    return (
      <NavMenu
          linkDescriptions={CategoryLinks[languageId]}
          classNamePrefix="category-menu"
          currentLinkId={categoryId}
      />
    )
  }
}

CategoryMenu.contextType = Context
  
export default CategoryMenu