"use strict";

const visit = require("unist-util-visit");

const titlePrefix = "title="

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const customClassName = pluginOptions.className;
  visit(markdownAST, "code", (node, index) => {
    const meta = node.meta || "";
    const separatorIndex = meta.lastIndexOf(titlePrefix);
    if (separatorIndex === -1) {
      return;
    }

    const newMeta = meta.slice(0, separatorIndex);
    const title = meta.slice(separatorIndex + titlePrefix.length);

    const className = ["gatsby-code-title"].concat(customClassName || []);
    const titleNode = {
      type: "html",
      value: `<div class="${className.join(" ").trim()}">
          <span>${title}</span>
        </div>`
    };

    markdownAST.children.splice(index, 0, titleNode);
    node.meta = newMeta
  });
  return markdownAST;
};