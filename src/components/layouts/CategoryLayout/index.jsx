import React from 'react'
import DefaultLayout from '../DefaultLayout'
import CategoryMenu from '../../CategoryMenu'

class CategoryLayout extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <CategoryMenu categoryId={this.props.categoryId}/>
        {this.props.children}
      </DefaultLayout>
    )
  }
}

export default CategoryLayout
