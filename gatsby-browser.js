import './src/assets/fonts/fontello/css/fontello.css'
import littlefoot from 'littlefoot'
import './src/assets/scss/littlefoot.scss'

import '@fontsource/arimo/hebrew-400.css'
import '@fontsource/arimo/hebrew-500.css'
import '@fontsource/arimo/hebrew-700.css'
import '@fontsource/arimo/hebrew-400-italic.css'
import '@fontsource/arimo/hebrew-500-italic.css'
import '@fontsource/arimo/hebrew-700-italic.css'

import '@fontsource/lora/latin-400.css'
import '@fontsource/lora/latin-500.css'
import '@fontsource/lora/latin-700.css'
import '@fontsource/lora/latin-400-italic.css'
import '@fontsource/lora/latin-500-italic.css'
import '@fontsource/lora/latin-700-italic.css'

import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/roboto/latin-400-italic.css'
import '@fontsource/roboto/latin-500-italic.css'
import '@fontsource/roboto/latin-700-italic.css'

require('prismjs/themes/prism-okaidia.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const React = require('react')

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

export function onRouteUpdate() {
  const bt = `
            <button
                aria-controls='fncontent:<%= id %>'
                aria-expanded='false'
                aria-label='Footnote <%= number %>'
                class='littlefoot__button'
                id='<%= reference %>'
                rel='footnote'
                title='See Footnote <%= number %>'
            />
                <%= number %>
            </button>
        `
  littlefoot({ buttonTemplate: bt })
}
