import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PageTemplateDetails from '../components/PageTemplateDetails'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title } = page.frontmatter

    return (
      <Layout subtitle={title}>
        <div>
          <PageTemplateDetails {...this.props} />
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
