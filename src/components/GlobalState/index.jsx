class GlobalState {
    constructor() {
        this.reset()
    }
    
    reset() {
        this.sidebar = {
            mode: null
        }
    }
}

const globalState = new GlobalState()

export default globalState