import Cookies from 'js-cookie'
import { Themes } from '../../consts/themes'

const defaultTheme = Themes.Light
const stateProperty = 'theme'
const cookieName = 'theme'

class ThemeContextProvider {
    constructor(state) {
        this.state = state
    }

    get() {
        let theme = this.state.get(stateProperty)
        if (!theme) {
            const cookieThemeId = Cookies.get(cookieName)
            theme = Object.values(Themes).find(theme => theme.id == cookieThemeId)
            if (!theme) {
                theme = defaultTheme
            }
        }

        return theme   
    }

    set(newTheme) {
        Cookies.set(cookieName, newTheme.id, { path: '/' })
        this.state.set(stateProperty, newTheme)
    }
}

export default ThemeContextProvider