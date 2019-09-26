const React = require("react")
const { MDXProvider } = require('@mdx-js/react')
const { CodeHeader } = require('./src/components/MDX')

export function withMdx(element) {
  const shortcodes = { CodeHeader }
  return (
    <MDXProvider components={shortcodes}>
      {element}
    </MDXProvider>
  )
}
