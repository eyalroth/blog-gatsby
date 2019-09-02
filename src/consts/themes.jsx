class Theme {
    constructor(id, cssClass, utterances) {
        this.id = id
        this.cssClass = cssClass
        this.utterances = utterances
    }
}

const Themes = Object.freeze({
    Light: new Theme('light', 'theme-light', 'github-light'),
    Dark: new Theme('dark', 'theme-dark', 'photon-dark'),
})

module.exports.Themes = Themes