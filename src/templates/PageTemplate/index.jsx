import React from 'react'
import { graphql } from 'gatsby'
import Page from '../../components/Page'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title } = page.frontmatter

    return (
      <Page title={title}>
        <div
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </Page>
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
