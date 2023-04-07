import React from 'react'
import { graphql } from 'gatsby'
import Page from '../../components/Page'
import './style.scss'
import head from '../../components/Head'

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.markdownRemark
    const { title, sidebarLinkId, language: languageId } = page.frontmatter

    return (
      <Page languageId={languageId} subtitle={title} sidebarLinkId={sidebarLinkId}>
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

export const Head = head({
  getLanguageId: ({ data }) => data.markdownRemark.frontmatter.language,
  getSubtitle: ({ data }) => data.markdownRemark.frontmatter.title,
})

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
        language
      }
    }
  }
`
