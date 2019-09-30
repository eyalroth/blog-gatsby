const _ = require('lodash')
const { Languages } = require('./languages')

function normalizePath(path) {
    let normalized = path
    if (!normalized.startsWith('/')) {
        normalized = `/${normalized}`
    }
    if (!normalized.endsWith('/')) {
        normalized = `${normalized}/`
    }
    return normalized
}

class MenuLink {
    constructor(id, label, path, icon) {
        this.id = id
        this.label = label
        this.path = normalizePath(path)
        this.icon = icon
    }
}

// site links

const siteLinks = {}
siteLinks[Languages.English.id] = {
    Home: new MenuLink("home", "Home", `/${Languages.English.urlPart}`),
    Blog: new MenuLink("blog", "Blog", `/${Languages.English.urlPart}/blog`),
    About: new MenuLink("about", "About", `/${Languages.English.urlPart}/about`),
    ToHebrew: new MenuLink("to-hebrew", "עברית", `/${Languages.Hebrew.urlPart}`),
}
siteLinks[Languages.Hebrew.id] = {
    Home: new MenuLink("home", "בית", `/${Languages.Hebrew.urlPart}`),
    Blog: new MenuLink("blog", "בלוג", `/${Languages.Hebrew.urlPart}/blog`),
    About: new MenuLink("about", "אודות", `/${Languages.Hebrew.urlPart}/about`),
    ToEnglish: new MenuLink("to-english", "English", `/${Languages.English.urlPart}`),
}
const SiteLinks = Object.freeze(siteLinks)
module.exports.SiteLinks = SiteLinks

// sidebar links

const sidebarLinks = _.cloneDeep(SiteLinks)
delete sidebarLinks[Languages.English.id].Home
delete sidebarLinks[Languages.Hebrew.id].Home
const SidebarLinks = Object.freeze(sidebarLinks)
module.exports.SidebarLinks = SidebarLinks

// category links

const categoryLinks = {}
categoryLinks[Languages.English.id] = {
    Articles: new MenuLink("articles-en", "Articles", SiteLinks[Languages.English.id].Blog.path),
}
categoryLinks[Languages.Hebrew.id] = {
    Articles: new MenuLink("articles-he", "מאמרים", SiteLinks[Languages.Hebrew.id].Blog.path),
}
const CategoryLinks = Object.freeze(categoryLinks)
module.exports.CategoryLinks = CategoryLinks

// series links

module.exports.seriesLink = (path, language) => {
    return normalizePath(`/${language.urlPart}/blog/series/${path}`)
}