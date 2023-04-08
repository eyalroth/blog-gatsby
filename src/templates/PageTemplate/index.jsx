import React from 'react'
import { graphql } from 'gatsby'
import LittleFoot from '../../components/Littlefoot'
import './style.scss'
import createHead from '../../components/Head'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title } = page.frontmatter

    return (
      <div className="page">
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

export const Head = createHead()

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
