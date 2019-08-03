class PageContextProvider {
    constructor(getState, setState) {
        this.initialized = new SimpleProvider(getState, setState, "page.isInitialized")
        this.isHome = new SimpleProvider(getState, setState, "page.isHome")
        this.language = new SimpleProvider(getState, setState, "page.language")
        this.sidebarLinkId = new SimpleProvider(getState, setState, "page.sidebarLinkId")
    }
}

export default PageContextProvider

class SimpleProvider {
    constructor(getState, setState, property) {
      this.getState = getState
      this.setState = setState
      this.property = property
    }
  
    get() {
      return this.getState(this.property)
    }
  
    set(value) {
      this.setState(this.property, value)
    }
}