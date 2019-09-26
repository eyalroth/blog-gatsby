"use strict"

const visit = require("unist-util-visit")

const slugDb = require("./slug-db.js")
const { formatSlug } = require('../../slug.js')

const frontmatterStartSymbol = "{"

module.exports = ({ markdownAST }) => {
    visit(markdownAST, "export", node => {
        const frontmatter = parseFrontmatter(node)
        const slug = formatSlug(frontmatter)
        slugDb.set(frontmatter.language, frontmatter.path, slug)
    })

    return markdownAST
}

function parseFrontmatter(node) {
    const frontmatterStart = node.value.indexOf(frontmatterStartSymbol)
    const rawFrontmatter = node.value.substring(frontmatterStart)
    return JSON.parse(rawFrontmatter)
}