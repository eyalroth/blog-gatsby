const _ = require('lodash')
const Promise = require('bluebird')
const readingTime = require("reading-time")

const { Languages, findById } = require('./src/consts/languages')
const { CategoryLinks, SidebarLinks } = require('./src/consts/menuLinks')
const { Feeds } = require('./src/consts/rss')
const { formatSlug } = require('./slug')

const createHomeTemplate = require('./src/templates/HomeTemplate/createPages')
const createCategoryTemplate = require('./src/templates/PostCategoryTemplate/createPages')
const createPageTemplate = require('./src/templates/PageTemplate/createPages')
const createPostTemplate = require('./src/templates/PostTemplate/createPages')
const createSeriesTemplate = require('./src/templates/PostSeriesTemplate/createPages')

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const redirects = new Promise((resolve, reject) => {
    createRedirect({
      fromPath: '/',
      toPath: SidebarLinks[Languages.English.id].Home.path,
      redirectInBrowser: true,
    })

    createRedirect({
      fromPath: '/blog',
      toPath: CategoryLinks[Languages.English.id].Software.path,
      redirectInBrowser: true,
    })
    createRedirect({
      fromPath: '/blog/',
      toPath: SidebarLinks[Languages.English.id].Blog.path,
      redirectInBrowser: true,
    })

    createRedirect({
      fromPath: '/about',
      toPath: `/${Languages.English.urlPart}/about`,
      redirectInBrowser: true,
    })
    createRedirect({
      fromPath: '/about/',
      toPath: `/${Languages.English.urlPart}/about`,
      redirectInBrowser: true,
    })
  
    createRedirect({
      fromPath: '/rss.xml',
      toPath: Feeds[Languages.English.id].outputPath,
      redirectInBrowser: true,
    })

    createRedirect({
      fromPath: SidebarLinks[Languages.English.id].Blog.path,
      toPath: CategoryLinks[Languages.English.id].Software.path,
      redirectInBrowser: true,
    })
  
    createRedirect({
      fromPath: SidebarLinks[Languages.Hebrew.id].Blog.path,
      toPath: CategoryLinks[Languages.Hebrew.id].Hebrew.path,
      redirectInBrowser: true,
    })
  
    resolve()
  })

  const homes = new Promise(createHomeTemplate(graphql, createPage))
  const categoryLists = new Promise(createCategoryTemplate(graphql, createPage))
  const pages = new Promise(createPageTemplate(graphql, createPage))
  const posts = new Promise(createPostTemplate(graphql, createPage))
  const seriesLists = new Promise(createSeriesTemplate(graphql, createPage))

  return Promise.all([redirects, homes, categoryLists, pages, posts, seriesLists])
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slug = formatSlug(node.frontmatter)

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    const language = findById(node.frontmatter.language)
    const readingMinutes = Math.max(Math.round(readingTime(node.rawMarkdownBody).minutes), 1)

    createNodeField({
      node,
      name: 'readingTime',
      value: {
        minutes: readingMinutes,
        text: readingMinutes && language.timeToRead(readingMinutes),
      }
    })
  }
}

exports.onCreatePage = ({ page }) => {
  page.context.isStaticPage = true
}
