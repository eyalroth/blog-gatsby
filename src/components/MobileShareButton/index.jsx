import React from 'react'
import './style.scss'

class MobileShareButton extends React.Component {
    render() {
        const url = this.props.url

        if (typeof navigator !== 'undefined' && navigator.share) {
            return (
                <button className="share-mobile__button" onClick={share}>
                    <i title="Share" className="share-mobile__button icon-share" />
                </button>
            )
        } else {
            return null
        }

        function share() {
            navigator.share({
                url
            })
        }
    }
}

export default MobileShareButton