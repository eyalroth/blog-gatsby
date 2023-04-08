import React, { useContext } from 'react'
import pickBy from 'lodash/pickBy'
import { graphql, useStaticQuery } from 'gatsby'
import NavMenu from '../NavMenu'
import { CategoryLinks } from '../../consts/menuLinks'
import './style.scss'
import Context from '../Context'

export default function CategoryMenu(props) {
  const context = useContext(Context)
  const data = useStaticQuery(categoryMenuQuery)

  const { categoryId } = props
  const languageId = context.layout.language.get().id

  const demoMode = data.site.siteMetadata.demo

  const links = pickBy(CategoryLinks[languageId], (link, id) => link.demoType.matchDemoMode(demoMode))

  return (
    <NavMenu
      linkDescriptions={links}
      classNamePrefix='category-menu'
      currentLinkId={categoryId}
    />
  )
}


const categoryMenuQuery = graphql`
  query CategoryMenuQuery {
    site {
      siteMetadata {
        demo
      }
    }
  }
`
