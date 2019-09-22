const _ = require('lodash')
const Promise = require('bluebird')
const moment = require('moment')
const readingTime = require("reading-time")

const { Languages, findById } = require('./src/consts/languages')
const { SidebarLinks } = require('./src/consts/menuLinks')
const { Feeds } = require('./src/consts/rss')

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
      toPath: SidebarLinks[Languages.English.id].Blog.path,
      redirectInBrowser: true,
    })

    createRedirect({
      fromPath: '/about',
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

  if (node.internal.type === 'Mdx') {
    const language = findById(node.frontmatter.language)
    let slug = node.frontmatter.path

    if (node.frontmatter.layout == 'post') {
      const postDate = moment(node.frontmatter.date) 
      const postYear = postDate.format('YYYY')
      const postMonth = postDate.format('MM')
      slug = `/blog/${postYear}/${postMonth}/${slug}/`
    }

    slug = `/${language.urlPart}${slug}`

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    const readingMinutes = Math.max(Math.round(readingTime(node.rawBody).minutes), 1)

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
