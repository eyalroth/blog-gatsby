let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const pxtorem = require('postcss-pxtorem')
const path = require(`path`)
const { Feeds } = require('./src/consts/rss')

function verifyEnvVar(variable) {
  if (activeEnv == "production" && !process.env[variable]) {
    throw new Error(`Missing envrionment variable ${variable}`)
  }
}
verifyEnvVar("URL")
verifyEnvVar("GOOGLE_ANALYTICS")
verifyEnvVar("UTTERANCES_REPO")

function rssQuery(languageId) {
  return `
    {
      allMarkdownRemark(
        filter: {frontmatter: {language: {eq: "${languageId}"}}}
        sort: { order: DESC, fields: [frontmatter___date] },
      ) {
        edges {
          node {
            excerpt
            html
            fields { slug }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `
}

const fontVariants = ['300', '300i', '400', '400i', '500', '700']

let deployUrl = process.env.DEPLOY_PRIME_URL
if (!deployUrl) {
  deployUrl = process.env.URL 
}

module.exports = {
  siteMetadata: {
    url: process.env.URL,
    siteUrl: process.env.URL,
    deployUrl,
    title: 'Eyal Roth',
    description: '',
    utterances: process.env.UTTERANCES_REPO,
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
        name: 'pages',
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
        feeds: Object.values(Feeds).map(feed => (
          {
            output: feed.outputPath,
            title: feed.title,
            query: rssQuery(feed.languageId),
            language: feed.languageShort,
            'site_url': `${process.env.URL}${feed.homePath}`,
          }
        )),
        setup: // see https://github.com/gatsbyjs/gatsby/issues/16177
          ({
            query: {
              site: { siteMetadata },
            },
            ...rest
          }) => {
            return {
              ...siteMetadata,
              ...rest,
            }
          }
        ,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
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
          'gatsby-remark-prismjs-title',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-remark-reading-time`,
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: process.env.GOOGLE_ANALYTICS },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: fontVariants,
          },
          {
            family: 'Lora',
            variants: fontVariants,
          },
          {
            family: 'Arimo',
            variants: fontVariants,
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
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
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eyal Roth`,
        short_name: `Eyal Roth`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/icon2.png`
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
          component: require.resolve(`./src/components/layouts/index.jsx`)
      }
    },
    {
      resolve: `gatsby-plugin-browser-reload`,
      options: {
          autoReload: process.env.AUTO_RELOAD
      }
    },
  ],
}
