import React from 'react'
import { instanceOf } from 'prop-types'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie'
import { Themes } from '../../consts/themes'

const { Provider, Consumer } = React.createContext({})

const defaultTheme = Themes.Light
const cookieName = 'theme'

class ThemeProvider extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor() {
        super()

        this.state = {
            theme: null
        }

        this.get = this.get.bind(this)
        this.set = this.set.bind(this)
    }

    render() {
        const provided = {
            get: this.get,
            set: this.set,
        }

        return (
            <CookiesProvider>
                <Provider value={provided}>{this.props.children}</Provider>
            </CookiesProvider>
        )
    }

    get() {
        let theme = this.state.theme
        if (!theme) {
            const cookieThemeId = this.props.cookies.get(cookieName)
            theme = Object.values(Themes).find(theme => theme.id == cookieThemeId)
            if (!theme) {
                theme = defaultTheme
            }
        }

        return theme   
    }

    set(newTheme) {
        this.props.cookies.set(cookieName, newTheme.id, { path: '/' })
        this.setState({theme: newTheme})
    }
}

const provider = withCookies(ThemeProvider)
export {Consumer as default, provider as ThemeProvider}
