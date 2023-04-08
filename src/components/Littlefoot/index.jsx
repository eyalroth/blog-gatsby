import React from 'react'
import littlefoot from 'littlefoot'
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
                class="littlefoot__button"
                id="<%= reference %>"
                rel="footnote"
                title="See Footnote <%= number %>"
            />
                <%= number %>
            </button>
        `
        littlefoot({buttonTemplate: bt})
    }
}

export default Littlefoot
