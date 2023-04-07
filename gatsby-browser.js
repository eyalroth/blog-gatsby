import './src/assets/fonts/fontello/css/fontello.css'
import './src/assets/scss/littlefoot.scss'
import '@fontsource/arimo'
import '@fontsource/lora'
import '@fontsource/roboto'

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
