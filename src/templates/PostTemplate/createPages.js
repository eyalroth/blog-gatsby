const _ = require('lodash')
const path = require('path')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { layout: { eq: "post" }, demo: { ne: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
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
      const slug = edge.node.fields.slug
      createPage({
        path: slug,
        component: path.join(__dirname, 'index.jsx'),
        context: { 
          slug,
          categoryId: edge.node.frontmatter.category
        },
      })
    })
    resolve()
  })
}