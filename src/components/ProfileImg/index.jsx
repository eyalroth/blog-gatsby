import React, { useContext, useEffect, useRef } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Context from '../Context'
import { Author } from '../../consts/author'
import { SiteLinks } from '../../consts/menuLinks'
import { useRefState } from '../../utils/useRefState'

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 145, height: 145, quality: 100)
    }
  }
`

function ProfileImg(props) {
  const { className } = props

  const [getBackWidth, setBackWidth] = useRefState(0)
  const [getMouseToggle, setMouseToggle] = useRefState(true)

  const context = useContext(Context)
  const { language } = context.layout
  const languageId = language.get().id
  const authorName = Author.name[languageId]

  const data = useStaticQuery(graphql`
                query ProfileImgQuery {
                    front: file(relativePath: { eq: "icon2.png" }) {
                        ...squareImage
                    }
                    
                    back: file(relativePath: { eq: "icon.png" }) {
                        ...squareImage
                    }
                }
            `)

  const moveElementRef = useRef()
  const mouseUpElementRef = useRef()

  useEffect(() => {
    const element = moveElementRef?.current
    if (!element) {
      return
    }

    element.addEventListener('mousemove', mouseMove)
    element.addEventListener('touchmove', touchMove, { passive: true })
    element.addEventListener('mouseup', setMouseUp)
    element.addEventListener('mousedown', setMouseDown)
    element.addEventListener('click', mouseClick)

    return () => {
      element.removeEventListener('mousemove', mouseMove)
      element.removeEventListener('touchmove', touchMove, { passive: true })
      element.removeEventListener('mouseup', setMouseUp)
      element.removeEventListener('mousedown', setMouseDown)
      element.removeEventListener('click', mouseClick)
    }
  }, [])

  useEffect(() => {
    const element = mouseUpElementRef?.current
    if (!element) {
      return
    }

    element.addEventListener('mouseup', setMouseUp)

    return () => {
      element.removeEventListener('mouseup', setMouseUp)
    }
  }, [])

  function mouseMove(event) {
    if (!getMouseToggle()) {
      updateBackWidth(event.clientX)
    }
  }

  function touchMove(event) {
    updateBackWidth(event.changedTouches[0].clientX)
  }

  function updateBackWidth(x) {
    const container = mouseUpElementRef.current.parentElement
    const { left, width } = container.getBoundingClientRect()
    const newWidth = Math.min(Math.max(x - left, 0), width)

    if (newWidth !== getBackWidth()) {
      setBackWidth(newWidth)
    }
  }

  function setMouseUp(event) {
    toggleMouse(event, true)
  }

  function setMouseDown(event) {
    toggleMouse(event, false)
  }

  function toggleMouse(event, mouseToggle) {
    const isLeftClick = event.which === 1
    if (isLeftClick) {
      setMouseToggle(mouseToggle)
    }
  }

  async function mouseClick(event) {
    await navigate(SiteLinks[languageId].Home.path)
  }

  return <>
    <div className={className}>
      <div
        className='profile-img-container'
        style={{
          position: 'relative',
          height: 'inherit',
        }}
      >
        <div
          ref={moveElementRef}
          className='profile-img-pointermove'
          style={{
            width: '130%',
            height: '100%',
            left: '-15%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 1,
          }}
        />
        <div
          ref={mouseUpElementRef}
          className='profile-img-mouseup'
          style={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            padding: 0,
            margin: 0,
            top: 0,
            left: 0,
            background: 'transparent',
            display: getMouseToggle() ? 'none' : 'inherit',
          }}
        />
        <GatsbyImage
          className='profile-img-front'
          image={data.front.childImageSharp.gatsbyImageData}
          title={authorName}
          alt={authorName}
          draggable={false}
        />
        <GatsbyImage
          className='profile-img-back'
          image={data.back.childImageSharp.gatsbyImageData}
          title={authorName}
          alt={authorName}
          style={{
            position: 'absolute',
            width: `${getBackWidth()}px`,
            height: '100%',
            top: 0,
            left: 0,
          }}
          imgStyle={{
            transition: 'width 0.1s ease-out',
            objectPosition: 'left',
          }}
        />
      </div>
    </div>
  </>
}

export default ProfileImg
