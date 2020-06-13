---
language: english
layout: post
demo: "false"
date: "2019-08-29T06"
title: "Gatsby - Part VI: MDX (JSX in Markdown)"
path: "gatsby-mdx"
category: "articles-en"
tags:
    - Web Development
    - Gatsby
    - React
    - JavaScript
    - Markdown
series:
  path: "programming-with-gatsby"
  name: "Programming with Gatsby"
  order: 6
---

// TODO include in series intro
// TODO mention I learned this while writing the series?

MDX
- use INSTEAD of remark transformer
- incompatible with some remark plugins
  - despite what it says in the official documentation (https://www.gatsbyjs.org/docs/mdx/plugins)
  - "reading time"
  - "prismjs-title"
    https://github.com/otanu/gatsby-remark-prismjs-title/issues/2
- changes markdown queries
  - allMdx
  - body instead of html (+ MDXRenderer)
- change any `gatsby-node.js` code referring "MarkdownRemark" node type
- significantly slows down rendering
  - noticeable both in build and especially in develop mode (when editing markdown files) 
- feed
  - custom serialize needed
  - how to include "shortcodes"
    - MDXProvider
    - wrapRootElement (browser + SSR)
- might change presentation of HTML code in previous markdown files