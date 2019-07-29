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

  createRedirect({
    fromPath: '/',
    toPath: SidebarLinks[Languages.English.id].Home.path,
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

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/PostTemplate/index.jsx')
    const pageTemplate = path.resolve('./src/templates/PageTemplate/index.jsx')
    const postListTemplate = path.resolve('./src/templates/PostListTemplate/index.jsx')

    _.forOwn(CategoryLinks, function(links, languageId) {
      _.each(links, categoryLink => {
        createPage({
          path: categoryLink.path,
          component: postListTemplate,
          context: {
            languageId,
            categoryId: categoryLink.id,
            categoryLabel: categoryLink.label
          },
        })
      })
    })

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                layout
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
        if (_.get(edge, 'node.frontmatter.layout') === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug },
          })
        }
      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    if (typeof node.frontmatter.path !== 'undefined') {
      if (node.frontmatter.layout == 'post') {
        const postDate = moment(node.frontmatter.date) 
        const postYear = postDate.format('YYYY')
        const postMonth = postDate.format('MM')
        slug = `/blog/${postYear}/${postMonth}/${node.frontmatter.path}/`
      } else {
        slug = node.frontmatter.path
      }
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}
