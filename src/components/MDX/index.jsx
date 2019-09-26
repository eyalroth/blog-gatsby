import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'


class MDX extends React.Component {
  render() {
    return (
      <MDXRenderer>{this.props.body}</MDXRenderer>
    )
  }
}

export default MDX