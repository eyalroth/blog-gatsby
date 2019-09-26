const moment = require('moment')
const { findById } = require('./src/consts/languages')

module.exports.formatSlug = (frontmatter) => {
  const {language: languageId, path, layout, date } = frontmatter
  const language = findById(languageId)

  let slug = path
  if (layout == 'post') {
    const postDate = moment(date)
    const postYear = postDate.format('YYYY')
    const postMonth = postDate.format('MM')
    slug = `/blog/${postYear}/${postMonth}/${slug}/`
  }

  return `/${language.urlPart}${slug}`
}