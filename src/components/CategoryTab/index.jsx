import React from 'react'
import { Link } from 'gatsby'
import { Languages } from '../../consts/languages'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryTab extends React.Component {
    render() {
        const { categoryId, languageId } = this.props

        const language = Object.values(Languages).find(lang => lang.id == languageId)
        const category = Object.values(CategoryLinks[languageId]).find(link => link.id == categoryId)

        return (
            <div className="category-tab">
                <div className="category-tab-box">
                    <Link className="category-tab-link" to={category.path}>
                        {(category.icon && language.ltr) ? <i className={category.icon} /> : null}
                        {(category.icon && language.ltr) ? <span>{" "}</span> : null}
                        {category.label}
                        {(category.icon && !language.ltr) ? <span>{" "}</span> : null}
                        {(category.icon && !language.ltr) ? <i className={category.icon} /> : null}
                    </Link>
                </div>
            </div>
        )
    }
}

export default CategoryTab