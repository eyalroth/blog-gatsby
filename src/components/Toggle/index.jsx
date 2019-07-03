import React from 'react'

class Toggle extends React.Component {

    render() {
        return (
            <div className={(this.props.isEnabled) ? "enabled" : "disabled"}>
                {this.props.children}
            </div>
        )
    }
}

export default Toggle