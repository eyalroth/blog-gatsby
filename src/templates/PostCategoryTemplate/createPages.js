const _ = require('lodash')
const path = require('path')

const { SidebarLinks, CategoryLinks } = require('../../consts/menuLinks')

module.exports = (graphql, createPage) => (resolve, reject) => {
  graphql(`
    {
      site {
        siteMetadata {
          demo
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const demoMode = result.data.site.siteMetadata.demo

    _.forOwn(CategoryLinks, function(links, languageId) {
      _.each(links, categoryLink => {
        if (categoryLink.demoType.matchDemoMode(demoMode)) {
          createPage({
            path: categoryLink.path,
            component: path.join(__dirname, 'index.jsx'),
            context: {
              languageId,
              categoryId: categoryLink.id,
              categoryLabel: categoryLink.label,
              sidebarLinkId: SidebarLinks[languageId].Blog.id,
            },
          })
        }
      })
    })

    resolve()
  })
}
