import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

class ProfileImg extends React.Component {
    render() {
        const { id, className, author } = this.props
        return (
        <StaticQuery
            query={graphql`
                query ProfileImgQuery {
                    file(relativePath: { eq: "icon2.png" }) {
                        childImageSharp {
                            fluid(maxWidth: 145, maxHeight: 145, quality: 100) {
                            ...GatsbyImageSharpFluid_noBase64
                            }
                        }
                    }
                }
            `}
            render={data => (
                <div id={id} className={className}>
                    <Img 
                        fluid={data.file.childImageSharp.fluid}
                        title={author}
                        alt={author}
                    />
                </div>
            )}
        />)
    }
}

export default ProfileImg