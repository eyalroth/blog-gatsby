const _ = require('lodash')
const path = require('path')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { layout: { eq: "page" }, demo: { ne: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }
    _.each(result.data.allMarkdownRemark.edges, edge => {
      createPage({
        path: edge.node.fields.slug,
        component: path.join(__dirname, 'index.jsx'),
        context: { slug: edge.node.fields.slug },
      })
    })
    resolve()
  })
}