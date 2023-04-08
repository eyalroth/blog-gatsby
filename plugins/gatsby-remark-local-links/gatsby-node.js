const grayMatter = require(`gray-matter`)
const _ = require(`lodash`)

const { formatSlug } = require('../../slug.js')

// pretty much copied from gatsby-transformer-remark/src/on-node-create.js
exports.onCreateNode = async function onCreateNode(
  {
    node,
    loadNodeContent,
    reporter,
    actions,
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

    actions.createNodeField({ node, name: 'localLink', value: localLink })
    actions.createNodeField({ node, name: 'slug', value: slug })
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
