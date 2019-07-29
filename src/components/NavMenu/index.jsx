import React from 'react'
import { Link } from 'gatsby'
import { Languages } from '../../consts/languages'

var lastUnderlineLinkId = {}

class NavMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {reRender: false}

        this.underline = React.createRef()
        this.menu = React.createRef()
        this.links = {}

        this.updateUnderline = this.updateUnderline.bind(this)
    }

    render() {
      const _this = this
      const { languageId, linkDescriptions, classNamePrefix } = this.props

      if (this.state.reRender) {
        setTimeout(() => _this.setState({reRender: false}), 0)
        return null
      }

      function reRender() {
        _this.setState({reRender: true})
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', reRender)
        window.addEventListener('resize', reRender, {once: true})
      }
      
      return (
          <nav ref={this.menu} className={classNamePrefix}>
              <ul className={`${classNamePrefix}-list`}>
                  {Object.values(linkDescriptions).map(description => (
                      <li 
                          className={`${classNamePrefix}-list-item`}
                          key={description.id}
                      >
                          {createLink(description)} 
                      </li>
                  ))}
              </ul>
              <Underline
                ref={this.underline}
                className={`${classNamePrefix}-underline`}
                languageId={languageId}
              />
          </nav>
      )

      function createLink(linkDescription) {
          return (
            <Link
              id={`${classNamePrefix}-${linkDescription.id}`}
              ref={em => {
                _this.links[linkDescription.id] = em
              }}
              to={linkDescription.path}
              className={`${classNamePrefix}-list-item-link`}
            >
              {(linkDescription.icon) ? <i className={linkDescription.icon} /> : null}
              {(linkDescription.icon) ? <span>{" "}</span> : null}
              {linkDescription.label}
            </Link>
          )
        }
    }

    componentDidMount() {
      this.updateUnderline()
    }
    
    componentDidUpdate() {
      this.updateUnderline()
    }

    updateUnderline() {
      const { currentLinkId } = this.props
      const currentLink = this.links[currentLinkId]
      const menu = this.menu.current
      const underline = this.underline.current

      if (currentLink) {
        if (this.getLastUnderlineLinkId() && this.getLastUnderlineLinkId() != currentLinkId) {
          const lastLink = this.links[this.getLastUnderlineLinkId()]
          underline.shift({from: lastLink, to: currentLink})
        } else {
          if (menu.getBoundingClientRect().width > 0) {
            underline.moveTo(currentLink)
          } else {
            menu.addEventListener('transitionend', () => {
              if (underline) {
                underline.moveTo(currentLink)
              }
            }, {once: true})
          }
        }
      }

      this.setLastUnderlineLinkId(currentLinkId)
    }

    getLastUnderlineLinkId() {
      return lastUnderlineLinkId[this.props.id]
    }
    
    setLastUnderlineLinkId(id) {
      lastUnderlineLinkId[this.props.id] = id
    }
}

export default NavMenu

class Underline extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        style: {},
        callback: null
      }
      this.underline = null
      const language = Object.values(Languages).find(lang => lang.id == this.props.languageId)
      this.ltr = language.ltr

      this.moveTo = this.moveTo.bind(this)
      this.shift = this.shift.bind(this)
      this.parentRect = this.parentRect.bind(this)
    }

    render() {
      const _this = this
      function underlineRendered(underline) {
        if (underline) {
          _this.underline = underline
          if (_this.state.callback) {
            _this.state.callback()
          }
        }
      }

      return (
        <div ref={underlineRendered} className={this.props.className} style={this.state.style}/>
      )
    }

    setStyle(style, callback) {
      this.setState({
        style,
        callback
      })
    }

    moveTo(link) {
      const {left: parentX, width: parentWidth} = this.parentRect()
      const { left: toX, width } = link.getBoundingClientRect()

      const position = {}
      if (this.ltr) {
        position.left = toX - parentX
      } else {
        position.right = parentX + parentWidth - (toX + width) 
      }

      this.setStyle({
        ...position,
        width,
        transition: "none"
      })
    }
    
    shift({from, to}) {
      const _this = this
      const { left: parentX, width: parentWidth } = this.parentRect()
      const { left: fromX, width: fromWidth  } = from.getBoundingClientRect()
      const { left: toX, width: toWidth } = to.getBoundingClientRect()

      const position = {}
      if (this.ltr) {
        position.initial = {
          left: fromX - parentX,
        }
        position.transitioned = {
          left: toX - parentX,
        }
      } else {
        position.initial = {
          right: parentX + parentWidth - (fromX + fromWidth),
        }
        position.transitioned = {
          right: parentX + parentWidth - (toX + toWidth),
        }
      }

      const initialStyle = {
        ...position.initial,
        width: fromWidth,
      }
      
      const transitionedStyle = {
        ...position.transitioned,
        width: toWidth,
      }

      this.setStyle(initialStyle, () => {
        setTimeout(() => _this.setStyle(transitionedStyle), 0)
      })
    }

    parentRect() {
      return this.underline.parentElement.getBoundingClientRect()
    }
}