class ColorTheme {
    constructor(id, cssClass) {
        this.id = id
        this.cssClass = cssClass
    }
}

const Themes = Object.freeze({
    Light: new ColorTheme("light", "theme-light"),
    Dark: new ColorTheme("dark", "theme-dark"),
})

module.exports.Themes = Themes