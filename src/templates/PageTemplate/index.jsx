import React from 'react'
import { graphql } from 'gatsby'
import PageHelmet from '../../components/PageHelmet'
import MDX from '../../components/MDX'
import LittleFoot from '../../components/Littlefoot'
import './style.scss'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.mdx
    const { title } = page.frontmatter

    return (
      <div className="page">
        <PageHelmet subtitle={title} />
        <h1 className="page__title">{title}</h1>
        <LittleFoot>
          <div className="page__body">
            <MDX body={page.body}/>
          </div>
        </LittleFoot>
      </div>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
        description
      }
    }
  }
`
