import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'


class MDX extends React.Component {
  render() {
    return (
      <MDXRenderer>{this.props.body}</MDXRenderer>
    )
  }
}

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

export { MDX as default, CodeHeader }