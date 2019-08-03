import Cookies from 'js-cookie'
import { Themes } from '../../consts/themes'

const defaultTheme = Themes.Light
const contextProperty = 'theme'
const cookieName = 'theme'

class ThemeContextProvider {
    constructor(getContext, setContext) {
        this.getContext = getContext
        this.setContext = setContext
    }

    get() {
        let theme = this.getContext(contextProperty)
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
        this.setContext(contextProperty, newTheme)
    }
}

export default ThemeContextProvider