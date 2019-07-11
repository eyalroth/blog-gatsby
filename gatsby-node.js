const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')
const moment = require('moment')

const menuLinks = require('./src/consts/menuLinks.jsx')

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const { CategoryLinks } = menuLinks

  createRedirect({
    fromPath: '/blog',
    toPath: '/blog/software',
    redirectInBrowser: true,
  })

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/PostTemplate/index.jsx')
    const pageTemplate = path.resolve('./src/templates/PageTemplate/index.jsx')
    const tagTemplate = path.resolve('./src/templates/TagTemplate/index.jsx')
    const categoryTemplate = path.resolve(
      './src/templates/CategoryTemplate/index.jsx'
    )
    const postListTemplate = path.resolve('./src/templates/PostListTemplate/index.jsx')

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
                tags
                layout
                category
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

          let tags = []
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          tags = _.uniq(tags)
          _.each(tags, tag => {
            const tagPath = `/blog/tags/${_.kebabCase(tag)}/`
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag },
            })
          })

          _.each(CategoryLinks, categoryLink => {
            createPage({
              path: `/blog/categories/${_.kebabCase(categoryLink.id)}/`,
              component: categoryTemplate,
              context: { category: categoryLink.id },
            })
            createPage({
              path: `/blog/${_.kebabCase(categoryLink.id)}`,
              component: postListTemplate,
              context: {
                categoryId: categoryLink.id,
                categoryLabel: categoryLink.label
              },
            })
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

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/blog/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/blog/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
