import React from 'react'
import './style.scss'

class Littlefoot extends React.Component {

    render() {
        return this.props.children
    }

    componentDidMount() {
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
        const littlefoot = require('littlefoot').default
        littlefoot({buttonTemplate: bt})
    }
}

export default Littlefoot