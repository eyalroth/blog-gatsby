const _ = require('lodash')
const path = require('path')

const { findById } = require('../../consts/languages.jsx')
const { seriesLink } = require('../../consts/menuLinks.jsx')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "post" }, demo: { ne: true } } }
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

    const seriesItems = _.map(result.data.allMarkdownRemark.group, group => {
      const { series, language: languageId, category } = group.edges[0].node.frontmatter
      return {
        ...series,
        categoryId: category,
        language: findById(languageId),
      }
    })

    _.each(seriesItems, series => {
      createPage({
        path: seriesLink(series.path, series.language),
        component: path.join(__dirname, 'index.jsx'),
        context: { 
          seriesName: series.name,
          seriesPath: series.path,
          categoryId: series.categoryId,
        },
      })
    })
    resolve()
  })
}