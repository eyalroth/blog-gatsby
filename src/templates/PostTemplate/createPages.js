const _ = require('lodash')
const path = require('path')

const { SidebarLinks } = require('../../consts/menuLinks')
const { parseDemoType } = require('../../consts/demo')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      site {
        siteMetadata {
          demo
        }
      }
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { layout: { eq: "post" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              demo
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

    const demoMode = result.data.site.siteMetadata.demo

    _.each(result.data.allMarkdownRemark.edges, edge => {
      const { slug } = edge.node.fields
      const { demo, language: languageId , category: categoryId } = edge.node.frontmatter
      const sidebarLinkId = SidebarLinks[languageId].Blog.id

      if (parseDemoType(demo).matchDemoMode(demoMode)) {
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
      }
    })
    resolve()
  })
}