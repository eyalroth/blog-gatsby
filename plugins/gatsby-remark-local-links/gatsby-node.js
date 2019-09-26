const grayMatter = require(`gray-matter`)
const _ = require(`lodash`)

const { localLinksStore } = require('./store')
const { formatSlug } = require('../../slug.js')

const cacheKey = 'local-link-to-slug'

// pretty much copied from gatsby-transformer-remark/src/on-node-create.js
exports.onCreateNode = async function onCreateNode(
  {
    node,
    loadNodeContent,
    cache,
    reporter,
  }
) {

  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return {}
  }

  const content = await loadNodeContent(node)

  try {
    let data = grayMatter(content)

    const frontmatter = _.mapValues(data.data, value => {
      if (_.isDate(value)) {
        return value.toJSON()
      }
      return value
    })

    const { language, path } = frontmatter
    const slug = formatSlug(frontmatter)

    const localLink = `${language}/${path}`.replace('//', '/')

    const cacheStore = await cache.get(cacheKey) || {}
    cacheStore[localLink] = slug
    await cache.set(cacheKey, cacheStore)
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Markdown ${
        node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
      }:\n
      ${err.message}`
    )

    return {} // eslint
  }
}

exports.onPostBootstrap = async function onCreateNode(
  {
    cache,
  }
) {
  const cacheStore = await cache.get(cacheKey) || {}
  for (let [localLink, slug] of Object.entries(cacheStore)) {
    localLinksStore[localLink] = slug
  }
}
