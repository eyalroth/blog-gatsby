import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'


class MDX extends React.Component {
  render() {
    return (
      <MDXRenderer>{this.props.body}</MDXRenderer>
    )
  }
}

class LocalLink extends React.Component {
  render() {
    return (
      <StaticQuery
        query={allMdxQuery}
        render={data => this.renderWithQueryData(data)}
      />
    )
  }

  renderWithQueryData(data) {
    const linkEdge = data.allMdx.edges.find ( edge => {
        const { language, path } = edge.node.frontmatter
        return this.props.language === language && this.props.path === path
    })

    if (linkEdge) {
      return (
          <Link to={linkEdge.node.fields.slug}>
            {this.props.children}
          </Link>
      )
    } else {
      throw new Error(`Cannot find post {language: '${this.props.language}', path: '${this.props.path}'}`)
    }
  }
}

const allMdxQuery = graphql`
    query MdxLocalLinkQuery {
        allMdx {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        language
                        path
                    }
                }
            }
        }
    }
`

class CodeHeader extends React.Component {
  render() {
    const titleHtml = this.props.title && (
        <span className="gatsby-code-title">
          {this.props.title}
        </span>
    )
    
    const language = this.props.language || "txt"
    const languageHtml = (
      <span className="gatsby-code-language">
          {language}
        </span>
    )
    
    const withTitleOrNot = (titleHtml) ? "with-title" : "solo"
    return (
      <div className={`gatsby-code-header ${withTitleOrNot}`}>
        {titleHtml}
        {languageHtml}
      </div>
    )
  }
}

export { MDX as default, LocalLink, CodeHeader }