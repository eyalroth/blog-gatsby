class MenuLink {
    constructor(id, label, path) {
        this.id = id
        this.label = label
        this.path = path 
    }
}

module.exports.GlobalLinks = Object.freeze({
    Home: new MenuLink("home", "Home", "/"),
    Blog: new MenuLink("blog", "Blog", "/blog"),
    About: new MenuLink("about", "About", "/about"),
})

module.exports.CategoryLinks = Object.freeze({
    Software: new MenuLink("software", "Software", "/blog/software"),
    Entertainment: new MenuLink("entertainment", "Entertainment", "/blog/entertainment"),
    Social: new MenuLink("social", "Social", "/blog/social"),
})