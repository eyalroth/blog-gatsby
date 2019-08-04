class PageContextProvider {
    constructor(state) {
      this.state = state

      this.isHome = new SimpleProvider(state, "page.isHome")
      this.language = new SimpleProvider(state, "page.language")
      this.sidebarLinkId = new SimpleProvider(state, "page.sidebarLinkId")
    }

    set(isHome, language, sidebarLinkId) {
      const update = {}
      update[this.isHome.property] = isHome
      update[this.language.property] = language
      update[this.sidebarLinkId.property] = sidebarLinkId
      this.state.setBatch(update)
    }
}

export default PageContextProvider

class SimpleProvider {
    constructor(state, property) {
      this.state = state
      this.property = property
    }
  
    get() {
      return this.state.get(this.property)
    }
}