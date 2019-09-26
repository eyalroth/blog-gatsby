class SlugDb {
  constructor() {
    this.db = {}
  }

  set(language, path, slug) {
    if (!this.db[language]) {
      this.db[language] = {}
    }
    this.db[language][path] = slug
  }

  get(language, path) {
    return this.db[language][path]
  }
}

const slugDb = new SlugDb()

module.exports = slugDb