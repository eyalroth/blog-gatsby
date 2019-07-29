const { Languages } = require('./languages.jsx')
const { SidebarLinks } = require('./menuLinks.jsx')

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
    "/en/rss.xml",
    SidebarLinks[Languages.English.id].Home.path,
    Languages.English.id,
    "en"
)
feeds[Languages.Hebrew.id] = new RssFeed(
    "אייל רוט",
    "/he/rss.xml",
    SidebarLinks[Languages.Hebrew.id].Home.path,
    Languages.Hebrew.id,
    "he"
)
const Feeds = Object.freeze(feeds)
module.exports.Feeds = Feeds