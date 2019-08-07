import React from 'react'
import ContextConsumer from '../Context'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryMenu extends React.Component {
  render() {
    const { categoryId } = this.props

    return (
        <ContextConsumer>
            {({page}) => (
                <div className="category-menu">
                    <NavMenu
                        id="category"
                        linkDescriptions={CategoryLinks[page.language.get().id]}
                        classNamePrefix="category-menu"
                        currentLinkId={categoryId}
                    />
                </div>
            )}
        </ContextConsumer>
    )
  }
}
  
export default CategoryMenu