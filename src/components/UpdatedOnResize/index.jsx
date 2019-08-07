import React from 'react'
import scssBreakpoints from '../../assets/scss/_variables.scss'

const Breakpoints = Object.values(scssBreakpoints).map(bp => parseInt(bp)).reverse()

class UpdatedOnResize extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            reRender: false,
            breakpoint: null
        }

        this.onResize = this.onResize.bind(this)
    }

    render() {
        if (this.state.reRender) {
            const _this = this
            setTimeout(() => _this.setState({reRender: false}), 0)
            return null
        } else {
            return this.props.children
        }
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.onResize)
    }

    componentDidUpdate() {
        this.props.onRerender()
    }
    

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize() {
        this.props.onAnyResize()

        const screenWidth = Math.max(window.innerWidth, 0)
        const currentBreakpoint = Breakpoints.find(bp => screenWidth > bp)

        if (currentBreakpoint != this.state.breakpoint) {
            this.setState({
                reRender: true,
                breakpoint: currentBreakpoint,
            })
        }
    }

}

export default UpdatedOnResize