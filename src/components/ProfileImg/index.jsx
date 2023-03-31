import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Context from '../Context'
import { Author } from '../../consts/author'
import './style.scss'

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 145, height: 145, quality: 100)
    }
  }
`

class ProfileImg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backWidth: 0,
            isMouseUp: true
        }
        this.toggleMouse = this.toggleMouse.bind(this)
        this.setMouseUp = this.setMouseUp.bind(this)
        this.setMouseDown = this.setMouseDown.bind(this)
    }

    setBackWidth(newWidth) {
        this.setState({
            backWidth: newWidth
        })
    }

    setMouseUp(event) {
        this.toggleMouse(event, true)
    }

    setMouseDown(event) {
        this.toggleMouse(event, false)
    }
    
    toggleMouse(event, isMouseUp) {
        const isLeftClick = event.which === 1
        if (isLeftClick) {
            this.setState({isMouseUp})
        }
    }

    render() {
        return (
        <StaticQuery
            query={graphql`
                query ProfileImgQuery {
                    front: file(relativePath: { eq: "icon2.png" }) {
                        ...squareImage
                    }
                    
                    back: file(relativePath: { eq: "icon.png" }) {
                        ...squareImage
                    }
                }
            `}
            render={data => this.renderWithQueryData(data)}
        />)
    }

    renderWithQueryData(data) {
        const { className } = this.props
        const { language } = this.context.page
        const _this = this

        function setupMove(div, eventType, extractCoordinates, params = {}) {
            if (div) {
                div.addEventListener(eventType, (event) => {
                    const container = div.parentElement
                    const { x } = extractCoordinates(event)
                    const { left, width } = container.getBoundingClientRect()
                    const newWidth = x - left
                    _this.setBackWidth(Math.min(Math.max(newWidth, 0), width))
                }, {once: true, ...params})
            }
        }

        function addToggleMouseListener(target, type, listener) {
            target.removeEventListener(type, listener)
            target.addEventListener(type, listener)
        }
        
        function setupMouseUp(div) {
            if (div && !_this.state.isMouseUp) {
                addToggleMouseListener(div, 'mouseup', _this.setMouseUp)
            }
        }
        
        function setupMouseMove(div) {
            if (div) {
                const toggleEvent = (_this.state.isMouseUp) ? 'mousedown' : 'mouseup'
                const toggleAction = (_this.state.isMouseUp) ? _this.setMouseDown : _this.setMouseUp
                addToggleMouseListener(div, toggleEvent,toggleAction)
            }

            if (!_this.state.isMouseUp) {
                setupMove(div, 'mousemove', (event) => {
                    const { clientX: x, clientY: y } = event
                    return {x, y}
                })
            }
        }

        function setupTouchMove(div) {
            setupMove(div, 'touchmove', (event) => {
                const { clientX: x, clientY: y } = event.changedTouches[0]
                return {x, y}
            }, {passive: true})
        }

        const authorName = Author.name[language.get().id]
        return (
            <div className={className}>
                <div
                    className="profile-img-container"
                    style={{
                        position: "relative",
                        height: "inherit"
                    }}
                >
                    <div
                        ref={setupMouseMove}
                        className="profile-img-mousemove"
                        style={{
                            width: "130%",
                            height: "100%",
                            left: "-15%",
                            position: "absolute",
                            background: "transparent",
                            zIndex: 2
                        }}
                    />
                    <div
                        ref={setupMouseUp}
                        className="profile-img-mouseup"
                        style={{
                            position: "fixed",
                            height: "100vh",
                            width: "100vw",
                            padding: 0,
                            margin: 0,
                            top: 0,
                            left: 0,
                            background: "transparent",
                            display: (_this.state.isMouseUp) ? "none" : "inherit"
                        }}
                    />
                    <div
                        ref={setupTouchMove}
                        className="profile-img-touchmove"
                        style={{
                            width: "130%",
                            height: "100%",
                            left: "-15%",
                            position: "absolute",
                            background: "transparent",
                            zIndex: 1
                        }}
                    />
                    <GatsbyImage
                        className="profile-img-front"
                        image={data.front.childImageSharp.gatsbyImageData}
                        title={authorName}
                        alt={authorName}
                    />
                    <GatsbyImage
                        className="profile-img-back"
                        image={data.back.childImageSharp.gatsbyImageData}
                        title={authorName}
                        alt={authorName}
                        style={{
                            position: "absolute",
                            width: `${this.state.backWidth}px`,
                            height: "100%",
                            top: 0,
                            left: 0
                        }}
                        imgStyle={{
                            transition: "width 0.1s ease-out",
                            objectPosition: "left",
                        }}
                    />
                </div>
            </div>
        )
    }
}

ProfileImg.contextType = Context

export default ProfileImg
