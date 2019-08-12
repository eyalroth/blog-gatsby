class Language {
    constructor(id, label, locale, htmlLang, ltr, cssClass) {
        this.id = id
        this.label = label
        this.locale = locale
        this.htmlLang = htmlLang
        this.ltr = ltr
        this.cssClass = cssClass
    }
}

module.exports.Languages = Object.freeze({
    English: new Language("english", "English", 'en', 'en', true, "english ltr"),
    Hebrew: new Language("hebrew", "Hnglish", 'he', 'he', false, "hebrew rtl"),
})