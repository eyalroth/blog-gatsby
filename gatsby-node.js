const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')
const moment = require('moment')

const { Languages } = require('./src/consts/languages.jsx')
const { SidebarLinks, CategoryLinks } = require('./src/consts/menuLinks.jsx')
const { Feeds } = require('./src/consts/rss.jsx')

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

  const categoryLists = new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/PostCategoryTemplate/index.jsx')

    _.forOwn(CategoryLinks, function(links, languageId) {
      _.each(links, categoryLink => {
        createPage({
          path: categoryLink.path,
          component: template,
          context: {
            languageId,
            categoryId: categoryLink.id,
            categoryLabel: categoryLink.label
          },
        })
      })
    })

    resolve()
  })

  const pages = new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/PageTemplate/index.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { layout: { eq: "page" }, draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
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
      _.each(result.data.allMarkdownRemark.edges, edge => {
        createPage({
          path: edge.node.fields.slug,
          component: slash(template),
          context: { slug: edge.node.fields.slug },
        })
      })
      resolve()
    })
  })

  const posts = new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/PostTemplate/index.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
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
      _.each(result.data.allMarkdownRemark.edges, edge => {
        createPage({
          path: edge.node.fields.slug,
          component: slash(template),
          context: { slug: edge.node.fields.slug },
        })
      })
      resolve()
    })
  })

  const seriesLists = new Promise((resolve, reject) => {
    const template = path.resolve('./src/templates/PostSeriesTemplate/index.jsx')

    graphql(`
      {
        allMarkdownRemark {
          distinct(field: frontmatter___series___name)
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }
      _.each(result.data.allMarkdownRemark.distinct, seriesName => {
        createPage({
          path: `/blog/series/${_.kebabCase(seriesName)}`,
          component: template,
          context: { seriesName },
        })
      })
      resolve()
    })
  })

  return Promise.all([redirects, categoryLists, pages, posts, seriesLists])
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    let slug = node.frontmatter.path

    if (node.frontmatter.layout == 'post') {
      const postDate = moment(node.frontmatter.date) 
      const postYear = postDate.format('YYYY')
      const postMonth = postDate.format('MM')
      slug = `/blog/${postYear}/${postMonth}/${node.frontmatter.path}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.onCreatePage = ({ page }) => {
  page.context.staticPage = true
}
