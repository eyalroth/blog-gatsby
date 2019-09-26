import React from 'react'
import { graphql } from 'gatsby'
import PageHelmet from '../../components/PageHelmet'
import LittleFoot from '../../components/Littlefoot'
import './style.scss'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title } = page.frontmatter

    return (
      <div className="page">
        <PageHelmet subtitle={title} />
        <h1 className="page__title">{title}</h1>
        <LittleFoot>
          <div 
            className="page__body"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </LittleFoot>
      </div>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`
