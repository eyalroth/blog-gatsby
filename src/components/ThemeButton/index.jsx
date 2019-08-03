import React from 'react'
import ContextConsumer from '../Context'
import { Themes } from '../../consts/themes'

class ThemeButton extends React.Component {

    render() {
        return (
            <ContextConsumer>
                {context => (
                    <button className={this.props.className} onClick={() => toggleTheme(context.theme)}>
                        <i title="Toggle theme" className="icon-moon-inv" />
                    </button>
                )}
            </ContextConsumer>
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