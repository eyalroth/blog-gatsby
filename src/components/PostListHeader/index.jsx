import React from 'react'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'


class PostListHeader extends React.Component {
    render() {
        const { languageId, categoryId } = this.props
        const categories = CategoryLinks[languageId]

        if (Object.keys(categories).length > 1) {
            return (
                <div className="posts-header">
                    <NavMenu
                        id="blog-category"
                        linkDescriptions={categories}
                        classNamePrefix="posts-header__menu"
                        currentLinkId={categoryId}
                    />
                </div>
            )
        } else {
            return null
        }
    }
}

export default PostListHeader