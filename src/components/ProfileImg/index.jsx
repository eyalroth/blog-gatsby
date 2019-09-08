import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Context from '../Context'
import { Author } from '../../consts/author'

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
        fluid(maxWidth: 145, maxHeight: 145, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
        }
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

        this.moveElementRef = React.createRef()
        this.mouseUpElementRef = React.createRef()
        
        this.mouseMove = this.mouseMove.bind(this)
        this.touchMove = this.touchMove.bind(this)
        this.setMouseUp = this.setMouseUp.bind(this)
        this.setMouseDown = this.setMouseDown.bind(this)
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
            />
        )
    }

    renderWithQueryData(data) {
        const { className } = this.props
        const { language } = this.context.layout

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
                        ref={this.moveElementRef}
                        className="profile-img-pointermove"
                        style={{
                            width: "130%",
                            height: "100%",
                            left: "-15%",
                            position: "absolute",
                            background: "transparent",
                            zIndex: 1
                        }}
                    />
                    <div
                        ref={this.mouseUpElementRef}
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
                            display: (this.state.isMouseUp) ? "none" : "inherit"
                        }}
                    />
                    <Img
                        className="profile-img-front"
                        fluid={data.front.childImageSharp.fluid}
                        title={authorName}
                        alt={authorName}
                    />
                    <Img 
                        className="profile-img-back"
                        fluid={data.back.childImageSharp.fluid}
                        title={authorName}
                        alt={authorName}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                        }}
                        imgStyle={{
                            transition: "width 0.1s ease-out",
                            width: `${this.state.backWidth}px`,
                            objectPosition: "left",
                        }}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.moveElementRef.current.addEventListener('mousemove', this.mouseMove)
        this.moveElementRef.current.addEventListener('touchmove', this.touchMove, {passive: true})
        this.moveElementRef.current.addEventListener('mouseup', this.setMouseUp)
        this.moveElementRef.current.addEventListener('mousedown', this.setMouseDown)
        this.mouseUpElementRef.current.addEventListener('mouseup', this.setMouseUp)
    }
    
    componentWillUnmount() {
        this.moveElementRef.current.removeEventListener('mousemove', this.mouseMove)
        this.moveElementRef.current.removeEventListener('touchmove', this.touchMove)
        this.moveElementRef.current.removeEventListener('mouseup', this.setMouseUp)
        this.moveElementRef.current.removeEventListener('mousedown', this.setMouseDown)
        this.mouseUpElementRef.current.removeEventListener('mouseup', this.setMouseUp)
    }

    mouseMove(event) {
        if (!this.state.isMouseUp) {
            this.setBackWidth(event.clientX)
        }
    }

    touchMove(event) {
        this.setBackWidth(event.changedTouches[0].clientX)
    }

    setBackWidth(x) {
        const container = this.mouseUpElementRef.current.parentElement
        const { left } = container.getBoundingClientRect()
        const newWidth = x - left

        this.setState({
            backWidth: Math.max(newWidth, 0)
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
}

ProfileImg.contextType = Context

export default ProfileImg