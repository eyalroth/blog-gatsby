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

        const scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        )
        const ratio = scrollY / (scrollHeight - innerHeight)
        const width = ratio * 100

        this.setState({width})
    }
}

export default ProgressBar