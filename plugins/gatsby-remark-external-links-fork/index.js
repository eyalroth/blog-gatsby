const externalLinks = require('remark-external-links');

module.exports = ({ markdownAST }, pluginOptions) => {
  const transformer = externalLinks(pluginOptions);
  transformer(markdownAST, pluginOptions);
};