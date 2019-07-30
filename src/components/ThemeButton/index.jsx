import React from 'react'
import ContextConsumer from '../Context'
import { Themes } from '../../consts/themes'

// TODO make it "stick" with a cookie?
class ThemeButton extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {context => (
                    <button className={this.props.className} onClick={() => toggleTheme(context)}>
                        <i title="Toggle theme" className="icon-moon-inv" />
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