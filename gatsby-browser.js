require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

import littlefoot from 'littlefoot'
import './src/assets/scss/littlefoot.scss'
import './src/assets/fonts/fontello/css/fontello.css'

export function onRouteUpdate() {
  addLittlefoot()
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