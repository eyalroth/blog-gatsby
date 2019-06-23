import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class ProfileImg extends React.Component {
    render() {
        const { author } = this.props
        return (
        <StaticQuery
            query={graphql`
                query ProfileImgQuery {
                    file(relativePath: { eq: "icon.png" }) {
                        childImageSharp {
                            fixed(width: 75, height: 75) {
                            ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            `}
            render={data => (
                <Img 
                    fixed={data.file.childImageSharp.fixed}
                    title={author}
                    alt={author}
                    className="profile-img"
                />
            )}
        />)
    }
}

export default ProfileImg