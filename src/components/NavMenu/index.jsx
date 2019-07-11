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
                <Stylized ref={underline} className={`${classNamePrefix}-underline`}/>
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
                  shiftUnderline({from: lastLink, to: currentLink})
                } else {
                  if (menu.getBoundingClientRect().width > 0) {
                    setUnderline(currentLink)
                  } else {
                    menu.addEventListener('transitionend', () => {
                      setUnderline(currentLink)
                    }, {once: true})
                  }
                }
              }

              _this.setLastUnderlineLinkId(null)
            }
          }

          function setUnderline(link) {
            if (underline.current) {
              const { left, width } = link.getBoundingClientRect()
              underline.current.setStyle({
                left,
                width,
                transition: "none"
              })
            }
          }

          function shiftUnderline({from, to}) {
            if (underline.current) {
              const { left: fromX  } = from.getBoundingClientRect()
              const { left: toX, width } = to.getBoundingClientRect()
              underline.current.setStyle({
                left: fromX,
                transform: `translateX(${toX - fromX}px)`,
                width
              })
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

class Stylized extends React.Component {
    constructor(props) {
      super(props);
      this.state = {style: {}};
    }
  
    setStyle(style) {
      this.setState({style})
    }
  
    render() {
      return (
        <div className={this.props.className} style={this.state.style}/>
      )
    }
}