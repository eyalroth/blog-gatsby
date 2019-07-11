import React from 'react'
import { Link } from 'gatsby'

var lastUnderlinePath = {}

class NavMenu extends React.Component {
    constructor(props) {
        super(props)
        this.menuLinks = {}
    }

    render() {
        const underline = React.createRef()
        const links = this.menuLinks
        const { menuList, classNamePrefix, currentPath } = this.props
        const _this = this

        return (
            <nav ref={updateUnderline} className={classNamePrefix}>
                <ul className={`${classNamePrefix}-list`}>
                    {menuList.map(item => (
                        <li 
                            className={`${classNamePrefix}-list-item`}
                            key={item.path}
                        >
                            {createLink(item)} 
                        </li>
                    ))}
                </ul>
                <Stylized ref={underline} className={`${classNamePrefix}-underline`}/>
            </nav>
        )

        function createLink(item) {
            return (
              <Link
                ref={em => {
                  links[noTrailingSlash(item.path)] = em
                }}
                to={item.path}
                className={`${classNamePrefix}-list-item-link`}
                onClick={() => _this.setLastUnderlinePath(currentPath)}
              >
                {item.label}
              </Link>
            )
          }

          function updateUnderline(menu) {
            if (menu) {
              const currentLink = links[currentPath]
              if (currentLink) {
                if (_this.getLastUnderlinePath() && _this.getLastUnderlinePath() != currentPath) {
                  const lastLink = links[_this.getLastUnderlinePath()]
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

              _this.setLastUnderlinePath(null)
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

          function noTrailingSlash(pathname) {     
            return pathname.replace(/\/$/, "")
          }
    }

    getLastUnderlinePath() {
      return lastUnderlinePath[this.props.id]
    }
    
    setLastUnderlinePath(path) {
      console.log("hey")
      lastUnderlinePath[this.props.id] = path
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