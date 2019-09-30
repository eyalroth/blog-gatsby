require('./src/assets/fonts/fontello/css/fontello.css')
require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const React = require("react")

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
const isInternetExplorer = /*@cc_on!@*/false || !!document.documentMode

export function wrapRootElement({ element }) {
  if (isInternetExplorer) {
    return (
      <span>This site doesn't support Internet Explorer :(</span>
    )
  }
  return element
}