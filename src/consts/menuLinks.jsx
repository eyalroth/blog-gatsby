const { Languages } = require('./languages.jsx')

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
    Home: new MenuLink("home", "Home", "/en"),
    Blog: new MenuLink("blog", "Blog", "/en/blog"),
    About: new MenuLink("about", "About", "/en/about"),
    Hebrew: new MenuLink("hebrew", "עברית", "/he"),
}
sidebarLinks[Languages.Hebrew.id] = {
    Home: new MenuLink("home", "בית", "/he"),
    Blog: new MenuLink("blog", "בלוג", "/he/blog"),
    About: new MenuLink("about", "אודות", "/he/about"),
    English: new MenuLink("english", "English", "/en"),
}
const SidebarLinks = Object.freeze(sidebarLinks)
module.exports.SidebarLinks = SidebarLinks

const categoryLinks = {}
categoryLinks[Languages.English.id] = {
    Articles: new MenuLink("articles-en", "Articles", "/en/blog"),
}
categoryLinks[Languages.Hebrew.id] = {
    Articles: new MenuLink("articles-he", "מאמרים", "/he/blog"),
}
const CategoryLinks = Object.freeze(categoryLinks)
module.exports.CategoryLinks = CategoryLinks