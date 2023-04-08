const _ = require('lodash')
const path = require('path')
const { parseDemoType } = require('../../consts/demo')
const headContext  = require('../../components/Head/headContext')

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
        filter: { frontmatter: { layout: { eq: "page" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              demo
              language
              sidebarLinkId
              title
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
      const { demo, language: languageId, sidebarLinkId, title } = edge.node.frontmatter
      if (parseDemoType(demo).matchDemoMode(demoMode)) {
        createPage({
          path: slug,
          component: path.join(__dirname, 'index.jsx'),
          context: {
            slug,
            languageId,
            sidebarLinkId,
            ...headContext({
              languageId,
              subtitle: title
            })
          },
        })
      }
    })
    resolve()
  })
}
