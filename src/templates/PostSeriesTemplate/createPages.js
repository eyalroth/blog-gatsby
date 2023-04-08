const _ = require('lodash')
const path = require('path')

const { findById } = require('../../consts/languages')
const { SidebarLinks, seriesLink } = require('../../consts/menuLinks')
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
      allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}) {
        group(field: {frontmatter: {series: {path: SELECT}}}) {
          edges {
            node {
              frontmatter {
                demo
                language
                series {
                  name
                  path
                }
                category
              }
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

    const seriesItems = _.map(result.data.allMarkdownRemark.group, group => {
      const { demo, series, language, category } = group.edges[0].node.frontmatter
      return {
        ...series,
        demoType: parseDemoType(demo),
        categoryId: category,
        languageId: language,
      }
    })

    _.each(seriesItems, series => {
      if (series.demoType.matchDemoMode(demoMode)) {
        createPage({
          path: seriesLink(series.path, findById(series.languageId)),
          component: path.join(__dirname, 'index.jsx'),
          context: {
            seriesName: series.name,
            seriesPath: series.path,
            languageId: series.languageId,
            categoryId: series.categoryId,
            sidebarLinkId: SidebarLinks[series.languageId].Blog.id,
            ...headContext({
              languageId: series.languageId,
              subtitle: series.name
            })
          },
        })
      }
    })
    resolve()
  })
}
