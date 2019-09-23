const React = require("react")
const { MDXProvider } = require('@mdx-js/react')
const { LocalLink, CodeHeader } = require('./src/components/MDX')

export function withMdx(element) {
  const shortcodes = { LocalLink, CodeHeader }
  return (
    <MDXProvider components={shortcodes}>
      {element}
    </MDXProvider>
  )
}
