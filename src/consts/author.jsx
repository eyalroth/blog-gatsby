const { Languages } = require('./languages.jsx')

const name = {}
name[Languages.English.id] = "Eyal Roth"
name[Languages.Hebrew.id] = "אייל רוט"

const subtitle = {}
subtitle[Languages.English.id] = "Software Developer, Tel Aviv"
subtitle[Languages.Hebrew.id] = "מפתח תוכנה, תל אביב"

module.exports.Author = Object.freeze({
    name,
    subtitle,
    links: {
        linkedin: "https://linkedin.com/in/eyal-roth",
        github: 'https://github.com/eyalroth',
        email: 'contact@eyalroth.com',
    }
})