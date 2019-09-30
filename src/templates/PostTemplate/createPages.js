const _ = require('lodash')
const path = require('path')

const { SidebarLinks } = require('../../consts/menuLinks')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { layout: { eq: "post" }, demo: { ne: false } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              language
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
      const { language: languageId , category: categoryId } = edge.node.frontmatter
      const sidebarLinkId = SidebarLinks[languageId].Blog.id

      createPage({
        path: slug,
        component: path.join(__dirname, 'index.jsx'),
        context: { 
          slug,
          languageId,
          categoryId,
          sidebarLinkId,
        },
      })
    })
    resolve()
  })
}