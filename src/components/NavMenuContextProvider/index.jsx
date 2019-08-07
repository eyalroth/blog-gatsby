class NavMenuContextProvider {
    constructor() {
        this.lastSliderLinkId = {}
    }

    getLastSliderLinkId(menuId) {
        return this.lastSliderLinkId[menuId]
    }

    setLastSliderLinkId(menuId, newId) {
        this.lastSliderLinkId[menuId] = newId
    }
}

export default NavMenuContextProvider