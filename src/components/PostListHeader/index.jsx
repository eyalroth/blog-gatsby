import React from 'react'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'


class PostListHeader extends React.Component {
    render() {
        if (Object.keys(CategoryLinks).length > 1) {
            return (
                <div className="posts-header">
                    <NavMenu
                        id="blog-category"
                        linkDescriptions={CategoryLinks}
                        classNamePrefix="posts-header__menu"
                        currentLinkId={this.props.categoryId}
                    />
                </div>
            )
        } else {
            return null
        }
    }
}

export default PostListHeader