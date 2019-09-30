const { Languages } = require('./languages')
const { SiteLinks } = require('./menuLinks')

class RssFeed {
    constructor(title, outputPath, homePath, languageId, languageShort) {
        this.title = title
        this.outputPath = outputPath
        this.homePath = homePath
        this.languageId = languageId
        this.languageShort = languageShort
    }
}

const feeds = {}
feeds[Languages.English.id] = new RssFeed(
    "Eyal Roth",
    `/${Languages.English.urlPart}/rss.xml`,
    SiteLinks[Languages.English.id].Home.path,
    Languages.English.id,
    "en"
)
feeds[Languages.Hebrew.id] = new RssFeed(
    "אייל רוט",
    `/${Languages.Hebrew.urlPart}/rss.xml`,
    SiteLinks[Languages.Hebrew.id].Home.path,
    Languages.Hebrew.id,
    "he"
)
const Feeds = Object.freeze(feeds)
module.exports.Feeds = Feeds