import React from 'react'
import './style.scss'
import { isMobile, hasShareFeature } from '../../utils/deviceDetection';

class MobileShareButton extends React.Component {
    render() {
        const url = this.props.url

        if (isMobile() && hasShareFeature()) {
            return (
                <button className="share-mobile__button" onClick={share}>
                    <i title="Share" className="share-mobile__icon icon-share" />
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