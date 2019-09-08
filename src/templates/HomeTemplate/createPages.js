const _ = require('lodash')
const path = require('path')

const { SidebarLinks } = require('../../consts/menuLinks')

module.exports = (graphql, createPage) => (resolve, reject) => {
    _.forOwn(SidebarLinks, function(links, languageId) {
      createPage({
        path: links.Home.path,
        component: path.join(__dirname, 'index.jsx'),
        context: {
          languageId,
          isStaticPage: true,
        },
      })
    })
  
    resolve()
}