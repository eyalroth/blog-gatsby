"use strict"

const visit = require("unist-util-visit")

const titlePrefix = "title="

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "code", (node, index) => {
    if (!node.codeHeader) {
      const language = node.lang
      
      const splitted = (node.meta || "").split(titlePrefix)
      node.meta = splitted[0]
      const title = splitted[1]

      const languageJsx = (language) ? `language="${language}"` : ""
      const titleJsx = (title) ? `title="${title}"` : ""

      const jsx = `<CodeHeader ${languageJsx} ${titleJsx}/>`

      const codeHeaderNode = {
        type: "jsx",
        value: jsx,
      }

      markdownAST.children.splice(index, 0, codeHeaderNode)
      node.codeHeader = true
    }
  })
  
  return markdownAST
}