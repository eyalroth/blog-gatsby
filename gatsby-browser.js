require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

import littlefoot from 'littlefoot'
import 'littlefoot/dist/littlefoot.css'

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    )
  
    if (answer === true) {
      window.location.reload()
    }
}

export function onRouteUpdate() {
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