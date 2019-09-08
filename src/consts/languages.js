class Language {
    constructor(id, urlPart, locale, htmlLang, ltr, cssClass) {
        this.id = id
        this.urlPart = urlPart
        this.locale = locale
        this.htmlLang = htmlLang
        this.ltr = ltr
        this.cssClass = `${cssClass} ${(ltr) ? "ltr" : "rtl"}`
    }
}

const Languages = Object.freeze({
    English: new Language("english", 'en', 'en', 'en', true, "english"),
    Hebrew: new Language("hebrew", 'he', 'he', 'he', false, "hebrew"),
})

module.exports.Languages = Languages

module.exports.findById = (id) => {
    return Object.values(Languages).find(lang => lang.id === id)
}