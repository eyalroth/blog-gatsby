import React from 'react'
import ContextConsumer from '../Context'
import { Themes } from '../../consts/themes'
import './style.scss'

// TODO rename to "theme toggle"
// TODO make it "stick" with a cookie?
class ThemeButton extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {context => (
                    // TODO find icon
                    <button className="theme-button" onClick={() => toggleTheme(context)}>
                        <i title="Toggle theme" className="icon-share" />
                    </button>
                )}
            </ContextConsumer>
        )

        function toggleTheme(context) {
            const newTheme = (function(theme) {
                switch(theme) {
                    case Themes.Light:
                        return Themes.Dark
                    case Themes.Dark:
                        return Themes.Light
                }
            })(context.data.theme)

            context.set({theme: newTheme})
        }
    }

}

export default ThemeButton