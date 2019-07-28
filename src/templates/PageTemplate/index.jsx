import React from 'react'
import { graphql } from 'gatsby'
import Page from '../../components/Page'
import './style.scss'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title, sidebarLinkId } = page.frontmatter

    return (
      <Page subtitle={title} sidebarLinkId={sidebarLinkId}>
        <div className="page">
            <h1 className="page__title">{title}</h1>
            <div
              className="page__body"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
        </div>
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
        sidebarLinkId
      }
    }
  }
`
