const contextProperty = 'navMenu.lastUnderlineLinkId'

class NavMenuContextProvider {
    constructor(getContext, setContext) {
        this.getContext = getContext
        this.setContext = setContext
    }

    getLastUnderlineLinkId(menuId) {
        return this.getContext(`${contextProperty}-${menuId}`)
    }

    setLastUnderlineLinkId(menuId, linkId) {
        this.setContext(`${contextProperty}-${menuId}`, linkId)
    }
}

export default NavMenuContextProvider