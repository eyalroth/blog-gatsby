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
        <div className="category-menu">
            <NavMenu
                id="category"
                linkDescriptions={CategoryLinks[page.language.get().id]}
                classNamePrefix="category-menu"
                currentLinkId={categoryId}
            />
        </div>
    )
  }
}

CategoryMenu.contextType = Context
  
export default CategoryMenu