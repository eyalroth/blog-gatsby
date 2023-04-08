const _ = require('lodash')
const Promise = require('bluebird')
const readingTime = require("reading-time")
const path = require('path')
const moment = require('moment')

const { Languages, findById } = require('./src/consts/languages')
const { SiteLinks } = require('./src/consts/menuLinks')
const { Feeds } = require('./src/consts/rss')
const { formatSlug } = require('./slug')

const createHomeTemplate = require('./src/templates/HomeTemplate/createPages')
const createCategoryTemplate = require('./src/templates/PostCategoryTemplate/createPages')
const createPageTemplate = require('./src/templates/PageTemplate/createPages')
const createPostTemplate = require('./src/templates/PostTemplate/createPages')
const createSeriesTemplate = require('./src/templates/PostSeriesTemplate/createPages')

exports.createPages = async ({ graphql, actions }) => {
  const { default: slash } = await import('slash')
  const { createPage, createRedirect } = actions

  const redirects = new Promise((resolve, reject) => {
    createRedirect({
      fromPath: '/',
      toPath: SiteLinks[Languages.English.id].Home.path,
      redirectInBrowser: true,
    })

    createRedirect({
      fromPath: '/blog',
      toPath: SiteLinks[Languages.English.id].Blog.path,
      redirectInBrowser: true,
    })
    createRedirect({
      fromPath: '/blog/',
      toPath: SiteLinks[Languages.English.id].Blog.path,
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

    if (typeof node.frontmatter.demo === "undefined") {
      throw new Error(`Markdown node has no 'demo' metadata property: ${slug}`)
    }

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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
      },
    },
  })
}
