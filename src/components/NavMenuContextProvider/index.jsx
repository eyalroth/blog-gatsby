class NavMenuContextProvider {
    constructor() {
        this.lastUnderlineLinkId = {}
    }

    getLastUnderlineLinkId(menuId) {
        return this.lastUnderlineLinkId[menuId]
    }

    setLastUnderlineLinkId(menuId, newId) {
        this.lastUnderlineLinkId[menuId] = newId
    }
}

export default NavMenuContextProvider