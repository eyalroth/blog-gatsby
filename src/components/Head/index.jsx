import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Author } from '../../consts/author'
import { findById } from '../../consts/languages'
import { getSrc } from 'gatsby-plugin-image'

export default function head({
                               getLanguageId,
                               getSubtitle,
                               getDescription,
                               getFeaturedImage,
                             }) {
  return function Head(args) {
    const data = useStaticQuery(graphql`
                    query PageQuery {
                        site {
                            siteMetadata {
                                deployUrl
                            }
                        }
                        defaultImage: file(relativePath: { eq: "icon2.png" }) {
                            childImageSharp {
                                gatsbyImageData(layout: CONSTRAINED, width: 1315, height: 690, quality: 100,
                                    transformOptions: { fit: CONTAIN }, backgroundColor: "rgba(0,0,0,0)")
                            }
                        }
                    }
                `)

    const languageId = getLanguageId(args)
    const language = findById(languageId)

    const title = Author.name[languageId]

    const description = getDescription ? getDescription(args) : undefined
    const subtitle = getSubtitle ? getSubtitle(args) : undefined

    const finalSubtitle = subtitle ? `${subtitle} | ` : ''
    const finalTitle = `${finalSubtitle}${title}`
    const finalDescription = description || subtitle

    const featuredImage = getFeaturedImage ? (getFeaturedImage(args) ?? data.defaultImage) : data.defaultImage
    const featuredImageUrl = new URL(getSrc(featuredImage.childImageSharp.gatsbyImageData), data.site.siteMetadata.deployUrl)
    const featuredImageType = featuredImageUrl.toString().endsWith('png') ? 'png' : 'jpeg'

    return <>
      <html lang={language.htmlLang} />
      <title>{finalTitle}</title>
      <meta name='description' content={finalDescription} />
      <meta name='image' content={featuredImageUrl} />
      <meta property='og:title' content={finalTitle} />
      <meta property='og:image' content={featuredImageUrl} />
      <meta property='og:image:type' content={`image/${featuredImageType}`} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={featuredImageUrl} />
      <meta name='twitter:title' content={finalTitle} />
    </>
  }
}
