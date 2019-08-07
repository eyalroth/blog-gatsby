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
                { ({page}) => {
                    const language = page.language.get()
                    const category = Object.values(CategoryLinks[language.id]).find(link => link.id == categoryId)

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
                }}
            </ContextConsumer>
        )
    }
}

export default CategoryTab