"use strict"

const visit = require("unist-util-visit")

const titlePrefix = "title="

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "code", (node, index) => {
    if (!node.codeHeader) {
      const language = node.lang || "txt"
      
      const [metaWithoutTitle, title] = (node.meta || "").split(titlePrefix)
      node.meta = metaWithoutTitle

      const titleHtml = (title) ? `<span class="gatsby-code-title">${title}</span>` : ""
      const languageHtml = `<span class="gatsby-code-language">${language}</span>`
      const globalCss = (title) ? "with-title" : "solo"
      const html = `<div class="gatsby-code-header ${globalCss}">${titleHtml}${languageHtml}</div>`
      
      const codeHeaderNode = {
        type: "html",
        value: html,
      }

      markdownAST.children.splice(index, 0, codeHeaderNode)
      node.codeHeader = true
    }
  })
  
  return markdownAST
}