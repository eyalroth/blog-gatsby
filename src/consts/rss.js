const { Languages } = require('./languages')
const { SiteLinks } = require('./menuLinks')
const { parseDemoType } = require('./demo')

class RssFeed {
  constructor(title, outputPath, homePath, languageId, languageShort) {
    this.title = title
    this.outputPath = outputPath
    this.homePath = homePath
    this.languageId = languageId
    this.languageShort = languageShort
  }

  toPluginOptions(siteUrl, demoMode) {
    return {
      output: this.outputPath,
      title: this.title,
      query: this.query(),
      language: this.languageShort,
      site_url: `${siteUrl}${this.homePath}`,
      serialize: this.serialize(demoMode),
    }
  }

  query() {
    return `
          {
            allMarkdownRemark(
              filter: {frontmatter: {language: {eq: "${this.languageId}"}, layout: {eq: "post"}}}
              sort: {frontmatter: {date: DESC}}
            ) {
              edges {
                node {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    demo
                    title
                    date
                  }
                }
              }
            }
          }
        `
  }

  serialize(demoMode) {
    return ({ query: { site, allMarkdownRemark } }) => {
      const filtered = allMarkdownRemark.edges.filter(edge =>
        parseDemoType(edge.node.frontmatter.demo).matchDemoMode(demoMode)
      )

      return filtered.map(edge => ({
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          custom_elements: [{ 'content:encoded': edge.node.html }],
      }))
    }
  }
}

const feeds = {}
feeds[Languages.English.id] = new RssFeed(
  'Eyal Roth',
  `/${Languages.English.urlPart}/rss.xml`,
  SiteLinks[Languages.English.id].Home.path,
  Languages.English.id,
  'en'
)
feeds[Languages.Hebrew.id] = new RssFeed(
  'אייל רוט',
  `/${Languages.Hebrew.urlPart}/rss.xml`,
  SiteLinks[Languages.Hebrew.id].Home.path,
  Languages.Hebrew.id,
  'he'
)
const Feeds = Object.freeze(feeds)
module.exports.Feeds = Feeds
