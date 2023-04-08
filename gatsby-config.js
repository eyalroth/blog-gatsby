let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

const pxtorem = require('postcss-pxtorem')
const path = require(`path`)
const { Feeds } = require('./src/consts/rss')

function verifyEnvVar(variable) {
  if (activeEnv === "production" && !process.env[variable]) {
    throw new Error(`Missing environment variable ${variable}`)
  }
}
verifyEnvVar("URL")
verifyEnvVar("GOOGLE_ANALYTICS")
verifyEnvVar("UTTERANCES_REPO")

let deployUrl = process.env.DEPLOY_PRIME_URL
if (!deployUrl) {
  deployUrl = process.env.URL
}

const demoMode = "true" === String(process.env.DEMO).trim().toLowerCase()
console.log(`Running in demo mode? ${demoMode}`)

module.exports = {
  siteMetadata: {
    url: process.env.URL,
    siteUrl: process.env.URL,
    deployUrl,
    title: 'Eyal Roth',
    description: '',
    utterances: process.env.UTTERANCES_REPO,
    demo: demoMode,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(__dirname, `src`, `pages`),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, `src`, `posts`),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: Object.values(Feeds).map(feed => feed.toPluginOptions(process.env.URL, demoMode)),
      }
    },
    'gatsby-remark-local-links',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-prismjs-title-fork',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
          'gatsby-remark-local-links',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: '/gatsby-remark-external-links-fork',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
              content: {
                type: 'element',
                tagName: 'i',
                properties: {
                  title: 'Open in a new window',
                  className: 'icon-link-ext',
                },
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: process.env.GOOGLE_ANALYTICS },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eyal Roth`,
        short_name: `Eyal Roth`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/icon2.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.jsx`),
      },
    },
    {
      resolve: `gatsby-plugin-browser-reload`,
      options: {
        autoReload: process.env.AUTO_RELOAD,
      },
    },
  ],
}
