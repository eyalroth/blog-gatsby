import React from 'react'
import ThemeConsumer from '../ThemeContext'
import { Themes } from '../../consts/themes'

class ThemeButton extends React.Component {

    render() {
        return (
            <ThemeConsumer>
                {theme => (
                    <button className={this.props.className} onClick={() => toggleTheme(theme)}>
                        <i title="Toggle theme" className="icon-moon-inv" />
                    </button>
                )}
            </ThemeConsumer>
        )

        function toggleTheme(theme) {
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

export default ThemeButton