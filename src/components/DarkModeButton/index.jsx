import React from 'react'
import ContextConsumer from '../Context'
import './style.scss'

class DarkModeButton extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {context => (
                    // TODO find icon
                    <button className="dark-mode-button" onClick={() => toggleDarkMode(context)}>
                        <i title="Toggle dark mode" className="icon-share" />
                    </button>
                )}
            </ContextConsumer>
        )

        function toggleDarkMode(context) {
            context.set({darkMode: !context.data.darkMode})
        }
    }

}

export default DarkModeButton