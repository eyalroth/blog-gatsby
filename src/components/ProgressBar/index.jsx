import React from "react"
import './style.scss'

class ProgressBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {width: 0}

        this.handleScroll = this.handleScroll.bind(this)
    }

    render() {
        return (
            <div className="progress-bar" style={{width: `${this.state.width}%`}}/>
        )
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)        
    }

    handleScroll() {
        const { innerHeight, scrollY } = window

        // https://javascript.info/size-and-scroll-window#width-height-of-the-document
        const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        )
        const ratio = scrollY / (scrollHeight - innerHeight)
        const adjustedRatio = (ratio > 0.98) ? 1 : ratio 
        const width = adjustedRatio * 100

        this.setState({width})
    }
}

export default ProgressBar