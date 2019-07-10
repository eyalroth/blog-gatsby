import React from 'react'
import NavMenu from '../NavMenu'
import { categories } from '../../consts/constants'
import './style.scss'


class PostListHeader extends React.Component {
    render() {
        return (
            <div className="posts-header">
                <NavMenu id="blog-category" menuList={categories} classNamePrefix="posts-header__menu"/>
            </div>
        )
    }
}

export default PostListHeader