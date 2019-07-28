import React from 'react'
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton,
    EmailShareButton,
    PocketShareButton,
} from 'react-share'
import './style.scss'

class SharePanel extends React.Component {
    render() {
        const { url } = this.props

        if (typeof navigator !== 'undefined' && navigator.share) {
            return null
        }

        return (
            <div className="share-panel">
                <button className="share-panel__button clipboard" onClick={urlToClipboard}>
                    <i title="Copy to clipboard" className="share-panel__icon icon-link clipboard" />
                </button>
                <FacebookShareButton className="share-panel__button facebook" url={url} >
                    <i title="Share on Facebook" className="share-panel__icon icon-facebook-circled facebook" />
                </FacebookShareButton>
                <LinkedinShareButton className="share-panel__button linkedin" url={url} >
                    <i title="Share on Linkedin" className="share-panel__icon icon-linkedin-circled linkedin" />
                </LinkedinShareButton>
                <TwitterShareButton className="share-panel__button twitter" url={url} >
                    <i title="Share on Twitter" className="share-panel__icon icon-twitter-circled twitter" />
                </TwitterShareButton>
                <RedditShareButton className="share-panel__button reddit" url={url}>
                    <i title="Share on Reddit" className="share-panel__icon icon-reddit reddit" />
                </RedditShareButton>
                <PocketShareButton className="share-panel__button pocket" url={url}>
                    <i title="Save to Pocket" className="share-panel__icon icon-get-pocket pocket" />
                </PocketShareButton>
                <EmailShareButton className="share-panel__button email" url={url} >
                    <i title="Send as email" className="share-panel__icon icon-mail-circled email" />
                </EmailShareButton>
            </div>
        )

        // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
        function urlToClipboard() {
            const textArea = document.createElement("textarea")
            
            textArea.style.position = "fixed"
            textArea.style.top = 0
            textArea.style.left = 0
            textArea.style.width = "2em"
            textArea.style.height = "2em"
            textArea.style.padding = 0
            textArea.style.border = "none"
            textArea.style.outline = "none"
            textArea.style.boxShadow = "none"
            textArea.style.background = "transparent"

            textArea.value = url

            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            try {
                document.execCommand('copy')
            } catch (err) {
                console.log('Oops, unable to copy')
            }

            document.body.removeChild(textArea)
        }
    }
}

export default SharePanel