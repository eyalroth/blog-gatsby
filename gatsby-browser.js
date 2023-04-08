import './src/assets/fonts/fontello/css/fontello.css'
import '@fontsource/arimo'
import '@fontsource/lora'
import '@fontsource/roboto'
import littlefoot from 'littlefoot'
import './src/assets/scss/littlefoot.scss'

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
