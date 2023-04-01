const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const moment = require('moment')

const { Languages, findById } = require('./src/consts/languages.jsx')
const { SidebarLinks, CategoryLinks, seriesLink } = require('./src/consts/menuLinks.jsx')
const { Feeds } = require('./src/consts/rss.jsx')

exports.createPages = async ({ graphql, actions }) => {
  const { default: slash } = await import('slash')
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
          filter: { frontmatter: { layout: { eq: "page" }, demo: { ne: true } } }
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
          filter: { frontmatter: { layout: { eq: "post" }, demo: { ne: true } } }
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
        allMarkdownRemark(
          filter: {frontmatter: {layout: {eq: "post"}, demo: {ne: true}}}
        ) {
          group(field: {frontmatter: {series: {path: SELECT}}}) {
            edges {
              node {
                frontmatter {
                  language
                  series {
                    path
                  }
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
        const { series, language: languageId } = group.edges[0].node.frontmatter
        return {
          path: series.path,
          language: findById(languageId),
        }
      })

      _.each(seriesItems, series => {
        createPage({
          path: seriesLink(series.path, series.language),
          component: template,
          context: {
            seriesName: series.name,
            seriesPath: series.path,
          },
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

    if (node.frontmatter.layout === 'post') {
      const postDate = moment(node.frontmatter.date)
      const postYear = postDate.format('YYYY')
      const postMonth = postDate.format('MM')
      slug = `/blog/${postYear}/${postMonth}/${slug}/`
    }

    slug = `/${findById(node.frontmatter.language).urlPart}${slug}`

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
