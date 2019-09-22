const _ = require('lodash')
const path = require('path')

const { findById } = require('../../consts/languages')
const { SidebarLinks, seriesLink } = require('../../consts/menuLinks')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMdx(
        filter: { frontmatter: { layout: { eq: "post" }, demo: { ne: false } } }
      ) {
        group(field: frontmatter___series___path) {
          edges {
            node {
              frontmatter {
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

    const seriesItems = _.map(result.data.allMdx.group, group => {
      const { series, language, category } = group.edges[0].node.frontmatter
      return {
        ...series,
        categoryId: category,
        languageId: language,
      }
    })

    _.each(seriesItems, series => {
      createPage({
        path: seriesLink(series.path, findById(series.languageId)),
        component: path.join(__dirname, 'index.jsx'),
        context: { 
          seriesName: series.name,
          seriesPath: series.path,
          languageId: series.languageId,
          categoryId: series.categoryId,
          sidebarLinkId: SidebarLinks[series.languageId].Blog.id,
        },
      })
    })
    resolve()
  })
}