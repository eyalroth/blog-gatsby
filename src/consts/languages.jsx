class Language {
    constructor(id, label, locale, ltr, cssClass) {
        this.id = id
        this.label = label
        this.locale = locale
        this.ltr = ltr
        this.cssClass = cssClass
    }
}

module.exports.Languages = Object.freeze({
    English: new Language("english", "English", 'en', true, "ltr"),
    Hebrew: new Language("hebrew", "Hnglish", 'he', false, "rtl"),
})