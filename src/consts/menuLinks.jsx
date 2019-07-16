class MenuLink {
    constructor(id, label, path, icon) {
        this.id = id
        this.label = label
        this.path = path
        this.icon = icon
    }
}

module.exports.GlobalLinks = Object.freeze({
    Home: new MenuLink("home", "Home", "/"),
    Blog: new MenuLink("blog", "Blog", "/blog"),
    About: new MenuLink("about", "About", "/about"),
})

module.exports.CategoryLinks = Object.freeze({
    Software: new MenuLink("software", "Software", "/blog/software", "icon-cd"),
    Entertainment: new MenuLink("entertainment", "Entertainment", "/blog/entertainment", "icon-gamepad"),
    Social: new MenuLink("social", "Social", "/blog/social", "icon-group"),
})