const React = require("react")
const { MDXProvider } = require('@mdx-js/react')
const { LocalLink } = require('./src/components/MDX')

export function withMdx(element) {
  const shortcodes = { LocalLink }
  return (
    <MDXProvider components={shortcodes}>
      {element}
    </MDXProvider>
  )
}
