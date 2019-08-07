require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
const React = require("react")

import littlefoot from 'littlefoot'
import './src/assets/scss/littlefoot.scss'
import './src/assets/fonts/fontello/css/fontello.css'

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
const isInternetExplorer = /*@cc_on!@*/false || !!document.documentMode;

export function wrapRootElement({ element }) {
  if (isInternetExplorer) {
    return (
      <span>This site doesn't support Internet Explorer :(</span>
    )
  }
  
  return element
}


export function onRouteUpdate() {
  if (!isInternetExplorer) {
    addLittlefoot()
  }
}

function addLittlefoot() {
  const bt = `
    <button
        aria-controls="fncontent:<%= id %>"
        aria-expanded="false"
        aria-label="Footnote <%= number %>"
        class="littlefoot-footnote__button"
        id="<%= reference %>"
        rel="footnote"
        title="See Footnote <%= number %>"
    />
        <%= number %>
    </button>
  `
  littlefoot({buttonTemplate: bt})
}