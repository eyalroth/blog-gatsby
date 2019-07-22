import React from 'react'
import { Link } from 'gatsby'

var lastUnderlineLinkId = {}

class NavMenu extends React.Component {
    constructor(props) {
        super(props)
        this.links = {}
    }

    render() {
        const underline = React.createRef()
        const { linkDescriptions, classNamePrefix, currentLinkId } = this.props
        const _this = this

        return (
            <nav ref={updateUnderline} className={classNamePrefix}>
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
                <Underline ref={underline} className={`${classNamePrefix}-underline`}/>
            </nav>
        )

        function createLink(linkDescription) {
            return (
              <Link
                ref={em => {
                  _this.links[linkDescription.id] = em
                }}
                to={linkDescription.path}
                className={`${classNamePrefix}-list-item-link`}
                onClick={() => _this.setLastUnderlineLinkId(currentLinkId)}
              >
                {(linkDescription.icon) ? <i className={linkDescription.icon} /> : null}
                {(linkDescription.icon) ? <span>{" "}</span> : null}
                {linkDescription.label}
              </Link>
            )
          }

          function updateUnderline(menu) {
            if (menu) {
              const currentLink = _this.links[currentLinkId]
              if (currentLink) {
                if (_this.getLastUnderlineLinkId() && _this.getLastUnderlineLinkId() != currentLinkId) {
                  const lastLink = _this.links[_this.getLastUnderlineLinkId()]
                  underline.current.shift({from: lastLink, to: currentLink})
                } else {
                  if (menu.getBoundingClientRect().width > 0) {
                    underline.current.moveTo(currentLink)
                  } else {
                    menu.addEventListener('transitionend', () => {
                      if (underline.current) {
                        underline.current.moveTo(currentLink)
                      }
                    }, {once: true})
                  }
                }
              }

              _this.setLastUnderlineLinkId(null)
            }
          }

          
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
      super(props);

      this.state = {
        style: {},
        callback: null
      };
      this.underline = null

      this.moveTo = this.moveTo.bind(this)
      this.shift = this.shift.bind(this)
      this.parentX = this.parentX.bind(this)
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
      const parentX = this.parentX()
      const { left: toX, width } = link.getBoundingClientRect()

      this.setStyle({
        left: toX - parentX,
        width,
        transition: "none"
      })
    }
    
    shift({from, to}) {
      const _this = this
      const parentX = this.parentX()
      const { left: fromX, width: fromWidth  } = from.getBoundingClientRect()
      const { left: toX, width: toWidth } = to.getBoundingClientRect()

      const initialStyle = {
        left: fromX - parentX,
        width: fromWidth,
      }
      
      const transitionedStyle = {
        left: toX - parentX,
        width: toWidth,
      }

      this.setStyle(initialStyle, () => {
        setTimeout(() => _this.setStyle(transitionedStyle), 0)
      })
    }

    parentX() {
      return this.underline.parentElement.getBoundingClientRect().left
    }
}