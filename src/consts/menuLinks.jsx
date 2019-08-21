const { Languages } = require('./languages.jsx')
const _ = require('lodash')

class MenuLink {
    constructor(id, label, path, icon) {
        this.id = id
        this.label = label
        this.path = path
        this.icon = icon
    }
}

const sidebarLinks = {}
sidebarLinks[Languages.English.id] = {
    Home: new MenuLink("home", "Home", `/${Languages.English.urlPart}`),
    Blog: new MenuLink("blog", "Blog", `/${Languages.English.urlPart}/blog`),
    About: new MenuLink("about", "About", `/${Languages.English.urlPart}/about`),
    Hebrew: new MenuLink("hebrew", "עברית", `/${Languages.Hebrew.urlPart}`),
}
sidebarLinks[Languages.Hebrew.id] = {
    Home: new MenuLink("home", "בית", `/${Languages.Hebrew.urlPart}`),
    Blog: new MenuLink("blog", "בלוג", `/${Languages.Hebrew.urlPart}/blog`),
    About: new MenuLink("about", "אודות", `/${Languages.Hebrew.urlPart}/about`),
    English: new MenuLink("english", "English", `/${Languages.English.urlPart}`),
}
const SidebarLinks = Object.freeze(sidebarLinks)
module.exports.SidebarLinks = SidebarLinks

const categoryLinks = {}
categoryLinks[Languages.English.id] = {
    Articles: new MenuLink("articles-en", "Articles", sidebarLinks[Languages.English.id].Blog.path),
}
categoryLinks[Languages.Hebrew.id] = {
    Articles: new MenuLink("articles-he", "מאמרים", sidebarLinks[Languages.Hebrew.id].Blog.path),
}
const CategoryLinks = Object.freeze(categoryLinks)
module.exports.CategoryLinks = CategoryLinks

module.exports.seriesLink = (name, language) => {
    return `/${language.urlPart}/blog/series/${_.kebabCase(name)}`
}