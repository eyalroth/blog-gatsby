const _ = require('lodash')
const path = require('path')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { layout: { eq: "page" }, demo: { ne: false } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              language
              sidebarLinkId
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
      const {language: languageId, sidebarLinkId} = edge.node.frontmatter
      createPage({
        path: slug,
        component: path.join(__dirname, 'index.jsx'),
        context: { 
          slug,
          languageId,
          sidebarLinkId,
         },
      })
    })
    resolve()
  })
}