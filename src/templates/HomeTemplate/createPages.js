const _ = require('lodash')
const path = require('path')

const { SiteLinks } = require('../../consts/menuLinks')
const headContext  = require('../../components/Head/headContext')

module.exports = (graphql, createPage) => (resolve, reject) => {
    _.forOwn(SiteLinks, function(links, languageId) {
      createPage({
        path: links.Home.path,
        component: path.join(__dirname, 'index.jsx'),
        context: {
          languageId,
          isStaticPage: true,
          ...headContext({
            languageId,
            description: `Home page - ${languageId}`
          })
        },
      })
    })

    resolve()
}
