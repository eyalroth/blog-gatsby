class LayoutContextProvider {
    constructor(state) {
      this.state = state

      this.language = new SimpleProvider(state, "layout.language")
      this.sidebarLinkId = new SimpleProvider(state, "layout.sidebarLinkId")
    }

    set(language, sidebarLinkId) {
      const update = {}
      update[this.language.property] = language
      update[this.sidebarLinkId.property] = sidebarLinkId
      this.state.setBatch(update)
    }
}

export default LayoutContextProvider

class SimpleProvider {
    constructor(state, property, defaultValue = null) {
      this.state = state
      this.property = property
      this.defaultValue = defaultValue
    }
  
    get() {
      return this.state.get(this.property) || this.defaultValue
    }
}