const _ = require('lodash')
const path = require('path')

const { SidebarLinks, CategoryLinks } = require('../../consts/menuLinks')

module.exports = (graphql, createPage) => (resolve, reject) => {
    _.forOwn(CategoryLinks, function(links, languageId) {
      _.each(links, categoryLink => {
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
      })
    })
  
    resolve()
}