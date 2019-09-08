import React from 'react'
import Context from '../Context'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryMenu extends React.Component {
  render() {
    const { categoryId } = this.props
    const { page } = this.context

    return (
      <NavMenu
          linkDescriptions={CategoryLinks[page.language.get().id]}
          classNamePrefix="category-menu"
          currentLinkId={categoryId}
      />
    )
  }
}

CategoryMenu.contextType = Context
  
export default CategoryMenu