import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import './style.scss'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title } = page.frontmatter

    return (
      <Layout subtitle={title}>
        <div className="page">
            <h1 className="page__title">{title}</h1>
            <div
              className="page__body"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
        </div>
      </Layout>
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
