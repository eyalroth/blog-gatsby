import React from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import ContextConsumer from '../Context'
import { Themes } from '../../consts/themes'

class ThemeButton extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    render() {
        const _this = this

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

            _this.props.cookies.set('theme', newTheme.id, { path: '/' })

            context.set({theme: newTheme})
        }
    }

}

export default withCookies(ThemeButton)