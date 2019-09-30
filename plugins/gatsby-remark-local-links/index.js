'use strict'

const visit = require('unist-util-visit')
const { localLinksStore } = require('./store')
const localLinkPrefix = 'local::'

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    const [_, localLink] = node.url.split(localLinkPrefix)
    if (localLink) {
      const slug = localLinksStore[localLink]
      if (!slug) {
        throw new Error(`Can't resolve local link: ${localLink}`)
      }
      node.url = slug
    }
  })

  return markdownAST
}
