class DemoType {
  constructor(id, matchDemoMode) {
    this.id = id
    this.matchDemoMode = matchDemoMode
  }
}

const DemoTypes = Object.freeze({
  DemoOnly: new DemoType('demo-only', mode => mode === true),
  NonDemoOnly: new DemoType('non-demo-only', mode => mode === false),
  Both: new DemoType('both', mode => true),
})
module.exports.DemoTypes = DemoTypes

module.exports.parseDemoType = (rawType) => {
  // eslint-disable-next-line
  switch (String(rawType).trim().toLowerCase()) {
    case 'true':
      return DemoTypes.DemoOnly
    case 'false':
      return DemoTypes.NonDemoOnly
    case 'both':
      return DemoTypes.Both
  }
}
