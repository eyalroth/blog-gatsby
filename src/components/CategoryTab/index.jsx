import React from 'react'
import { Link } from 'gatsby'
import ContextConsumer from '../Context'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'

class CategoryTab extends React.Component {
    render() {
        const { categoryId } = this.props

        return (
            <ContextConsumer>
                { ({language}) => {
                    const languageId = language.get().id
                    const category = Object.values(CategoryLinks[languageId]).find(link => link.id == categoryId)

                    if (category) {
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
                    } else {
                        return null
                    }
                }}
            </ContextConsumer>
        )
    }
}

export default CategoryTab