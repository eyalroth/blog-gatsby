import React from 'react'
import Context from '../Context'
import { Themes } from '../../consts/themes'

class ThemeButton extends React.Component {

    render() {
        const { theme } = this.context

        return (
            <button className={this.props.className} onClick={toggleTheme}>
                <i title="Toggle theme" className="icon-moon-inv" />
            </button>
        )

        function toggleTheme() {
            const newTheme = (function(theme) {
                switch(theme) {
                    case Themes.Light:
                        return Themes.Dark
                    case Themes.Dark:
                        return Themes.Light
                }
            })(theme.get())

            theme.set(newTheme)
        }
    }
}

ThemeButton.contextType = Context

export default ThemeButton