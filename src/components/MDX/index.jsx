import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'


class MDX extends React.Component {
  render() {
    const shortcodes = {LocalLink}
    return (
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{this.props.body}</MDXRenderer>
      </MDXProvider>
    )
  }
}

export default MDX

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
