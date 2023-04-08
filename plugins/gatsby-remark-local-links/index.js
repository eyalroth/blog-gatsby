'use strict'

const visit = require('unist-util-visit')
const localLinkPrefix = 'local::'

module.exports = ({ markdownAST, getNodes }) => {
  visit(markdownAST, 'link', node => {
    const [_, localLink] = node.url.split(localLinkPrefix)
    if (localLink) {
      const nodes = getNodes()
      const referencedNode = nodes.find(n => n?.fields?.localLink === localLink)
      const slug = referencedNode?.fields?.slug
      if (!slug) {
        throw new Error(`Can't resolve local link: ${localLink}`)
      }
      node.url = slug
    }
  })

  return markdownAST
}
