import React, { useContext, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
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

function ProfileImg(props) {
  const { className } = props

  const [backWidth, setBackWith] = useState(0)
  const [isMouseUp, setMouseToggle] = useState(true)

  const context = useContext(Context)
  const { language } = context.page
  const authorName = Author.name[language.get().id]

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

  function setMouseUp(event) {
    toggleMouse(event, true)
  }

  function setMouseDown(event) {
    toggleMouse(event, false)
  }

  function toggleMouse(event, isMouseUp) {
    const isLeftClick = event.which === 1
    if (isLeftClick) {
      setMouseToggle(isMouseUp)
    }
  }

  function setupMove(div, eventType, extractCoordinates, params = {}) {
    if (div) {
      const controller = new AbortController()
      div.addEventListener(eventType, (event) => {
        const container = div.parentElement
        const { x } = extractCoordinates(event)
        const { left, width } = container.getBoundingClientRect()
        const newWidth = Math.min(Math.max(x - left, 0), width)
        if (newWidth !== backWidth) {
          controller.abort()
          setBackWith(newWidth)
        }
      }, { signal: controller.signal, ...params })
    }
  }

  function addToggleMouseListener(target, type, listener) {
    target.removeEventListener(type, listener)
    target.addEventListener(type, listener)
  }

  function setupMouseUp(div) {
    if (div && !isMouseUp) {
      addToggleMouseListener(div, 'mouseup', setMouseUp)
    }
  }

  function setupMouseMove(div) {
    if (div) {
      const toggleEvent = isMouseUp ? 'mousedown' : 'mouseup'
      const toggleAction = isMouseUp ? setMouseDown : setMouseUp
      addToggleMouseListener(div, toggleEvent, toggleAction)
    }

    if (!isMouseUp) {
      setupMove(div, 'mousemove', (event) => {
        const { clientX: x, clientY: y } = event
        return { x, y }
      })
    }
  }

  function setupTouchMove(div) {
    setupMove(div, 'touchmove', (event) => {
      const { clientX: x, clientY: y } = event.changedTouches[0]
      return { x, y }
    }, { passive: true })
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
          ref={setupMouseMove}
          className='profile-img-mousemove'
          style={{
            width: '130%',
            height: '100%',
            left: '-15%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 2,
          }}
        />
        <div
          ref={setupMouseUp}
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
            display: isMouseUp ? 'none' : 'inherit',
          }}
        />
        <div
          ref={setupTouchMove}
          className='profile-img-touchmove'
          style={{
            width: '130%',
            height: '100%',
            left: '-15%',
            position: 'absolute',
            background: 'transparent',
            zIndex: 1,
          }}
        />
        <GatsbyImage
          className='profile-img-front'
          image={data.front.childImageSharp.gatsbyImageData}
          title={authorName}
          alt={authorName}
        />
        <GatsbyImage
          className='profile-img-back'
          image={data.back.childImageSharp.gatsbyImageData}
          title={authorName}
          alt={authorName}
          style={{
            position: 'absolute',
            width: `${backWidth}px`,
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
