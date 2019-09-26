'use strict'

const visit = require('unist-util-visit')

const slugDb = require('./slug-db.js')
const localLinkPrefix = 'local::'
const localLinkSeparator = '/'

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    const [_, localLink] = node.url.split(localLinkPrefix)
    if (localLink) {
      const [language, path] = localLink.split(localLinkSeparator)
      const slug = slugDb.get(language, path)
      if (!slug) {
        throw new Error(`Can't resolve local link: ${localLink}`)
      }
      node.url = slug
    }
  })

  return markdownAST
}
