import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Author } from '../../consts/author'
import { findById } from '../../consts/languages'
import { getSrc } from 'gatsby-plugin-image'

export default function createHead({
                                     overrideLanguageId,
                                     overrideSubtitle,
                                     overrideDescription,
                                     overrideFeaturedImage,
                                   } = {}) {
  return function Head({ pageContext }) {
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

    const headContext = pageContext?.head

    const languageId = overrideLanguageId ?? headContext?.languageId
    const language = findById(languageId)

    const title = Author.name[languageId]

    const description = overrideDescription ?? headContext?.description
    const subtitle = overrideSubtitle ?? headContext?.subtitle

    const finalSubtitle = subtitle ? `${subtitle} | ` : ''
    const finalTitle = `${finalSubtitle}${title}`
    const finalDescription = description || subtitle

    const featuredImage = overrideFeaturedImage ?? headContext?.featuredImage ?? data.defaultImage
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
