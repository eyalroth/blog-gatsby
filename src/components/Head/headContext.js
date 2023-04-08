module.exports = function headContext({ languageId, subtitle, description, featuredImage }) {
  return {
    head: {
      languageId,
      subtitle,
      description,
      featuredImage,
    },
  }
}
