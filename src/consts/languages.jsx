class Language {
    constructor(id, label, urlPart, locale, htmlLang, ltr, cssClass) {
        this.id = id
        this.label = label
        this.urlPart = urlPart
        this.locale = locale
        this.htmlLang = htmlLang
        this.ltr = ltr
        this.cssClass = cssClass
    }
}

const Languages = Object.freeze({
    English: new Language("english", "English", 'en', 'en', 'en', true, "english ltr"),
    Hebrew: new Language("hebrew", "Hnglish", 'he', 'he', 'he', false, "hebrew rtl"),
})

module.exports.Languages = Languages

module.exports.findById = (id) => {
    return Object.values(Languages).find(lang => lang.id === id)
}