class Language {
    constructor(id, urlPart, locale, htmlLang, ltr, cssClass, timeToRead) {
        this.id = id
        this.urlPart = urlPart
        this.locale = locale
        this.htmlLang = htmlLang
        this.ltr = ltr
        this.cssClass = `${cssClass} ${(ltr) ? "ltr" : "rtl"}`
        this.timeToRead = timeToRead
    }
}

const Languages = Object.freeze({
    English: new Language("english", 'en', 'en', 'en', true, "english", (minutes) => `${minutes} min read`),
    Hebrew: new Language("hebrew", 'he', 'he', 'he', false, "hebrew", (minutes) => {
        if (minutes < 2) {
            return "דקת קריאה אחת"
        } else {
            return `${minutes} דקות קריאה`
        }
    }),
})

module.exports.Languages = Languages

module.exports.findById = (id) => {
    return Object.values(Languages).find(lang => lang.id === id)
}