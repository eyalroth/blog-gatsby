import React from 'react'
import { Link } from 'gatsby'
import ContextConsumer from '../Context'
import UpdatedOnResize from '../UpdatedOnResize'

class NavMenu extends React.Component {
    constructor(props) {
        super(props)

        this.underline = React.createRef()
        this.links = {}

        this.updateUnderline = this.updateUnderline.bind(this)
        this.context = null
    }

    render() {
      return (
        <UpdatedOnResize onRerender={this.updateUnderline} onAnyResize={this.updateUnderline}>
          <ContextConsumer>
            {context => this.renderWithContext(context)}
          </ContextConsumer>
        </UpdatedOnResize>
      )
    }

    renderWithContext(context) {
      this.context = context

      const _this = this
      const { linkDescriptions, classNamePrefix } = this.props

      return (
        <nav className={classNamePrefix}>
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
              language={context.page.language.get()}
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
      const underline = this.underline.current

      if (currentLink) {
        if (this.getLastUnderlineLinkId() && this.getLastUnderlineLinkId() != currentLinkId) {
          const lastLink = this.links[this.getLastUnderlineLinkId()]
          underline.shift({from: lastLink, to: currentLink})
        } else {
          underline.moveTo(currentLink)
        }
      }

      this.setLastUnderlineLinkId(currentLinkId)
    }

    getLastUnderlineLinkId() {
      return this.context.navMenu.getLastUnderlineLinkId(this.props.id)
    }
    
    setLastUnderlineLinkId(id) {
      this.context.navMenu.setLastUnderlineLinkId(this.props.id, id)
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

      this.moveTo = this.moveTo.bind(this)
      this.shift = this.shift.bind(this)
      this.parentRect = this.parentRect.bind(this)
      this.pctOfParent = this.pctOfParent.bind(this)
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
      const { left: parentX, width: parentWidth } = this.parentRect()
      const { left: toX, width } = link.getBoundingClientRect()

      const position = {}
      if (this.props.language.ltr) {
        position.left = this.pctOfParent(toX - parentX)
      } else {
        position.right = this.pctOfParent(parentX + parentWidth - (toX + width))
      }

      this.setStyle({
        ...position,
        width,
      })
    }
    
    shift({from, to}) {
      const _this = this
      const { left: parentX, width: parentWidth } = this.parentRect()
      const { left: fromX, width: fromWidth  } = from.getBoundingClientRect()
      const { left: toX, width: toWidth } = to.getBoundingClientRect()

      const position = {}
      if (this.props.language.ltr) {
        position.initial = {
          left: this.pctOfParent(fromX - parentX),
        }
        position.transitioned = {
          left: this.pctOfParent(toX - parentX),
        }
      } else {
        position.initial = {
          right: this.pctOfParent(parentX + parentWidth - (fromX + fromWidth)),
        }
        position.transitioned = {
          right: this.pctOfParent(parentX + parentWidth - (toX + toWidth)),
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

    pctOfParent(x) {
      return `${x / this.parentRect().width * 100}%`
    }
}