import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import './style.scss'

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
        fluid(maxWidth: 145, maxHeight: 145, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
        }
    }
  }
`

class ProfileImg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {backWidth: 0}
    }

    setBackWidth(newWidth) {
        this.setState({backWidth: newWidth})
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
        const { className, author } = this.props
        const _this = this

        function setupMove(div, eventType, extractCoordinates) {
            if (div) {
                div.addEventListener(eventType, (event) => {
                    const container = div.parentElement
                    const { x } = extractCoordinates(event)
                    const { left } = container.getBoundingClientRect()
                    const newWidth = x - left
                    _this.setBackWidth(Math.max(newWidth, 0))
                }, {once: true})
            }
        }
        
        function setupMouseMove(div) {
            setupMove(div, 'mousemove', (event) => {
                const { clientX: x, clientY: y } = event
                return {x, y}
            })
        }

        function setupTouchMove(div) {
            setupMove(div, 'touchmove', (event) => {
                const { clientX: x, clientY: y } = event.changedTouches[0]
                return {x, y}
            })
        }

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
                                zIndex: 1
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
                                zIndex: 1
                            }}
                        />
                        <Img
                            className="profile-img-front"
                            fluid={data.front.childImageSharp.fluid}
                            title={author}
                            alt={author}
                        />
                        <Img 
                            className="profile-img-back"
                            fluid={data.back.childImageSharp.fluid}
                            title={author}
                            alt={author}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                            }}
                            imgStyle={{
                                width: `${this.state.backWidth}px`,
                                objectPosition: "left",
                            }}
                        />
                    </div>
                </div>
        )
    }
}

export default ProfileImg