import React from 'react'
import { Link } from 'gatsby'
import Context from '../Context'
import UpdatedOnResize from '../UpdatedOnResize'

class NavMenu extends React.Component {
    constructor(props) {
        super(props)

        this.slider = React.createRef()
        this.links = {}

        this.updateSlider = this.updateSlider.bind(this)
    }

    render() {
      const _this = this
      const { currentLinkId, linkDescriptions, classNamePrefix } = this.props

      return (
        <UpdatedOnResize onRerender={this.updateSlider} onAnyResize={this.updateSlider}>
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
              <Slider
                ref={this.slider}
                className={`${classNamePrefix}-slider`}
                language={this.context.page.language.get()}
              />
          </nav>
        </UpdatedOnResize>
      )

      function createLink(linkDescription) {
        const selectClass = (linkDescription.id === currentLinkId) ? "selected" : "unselected"

        return (
          <Link
            id={`${classNamePrefix}-${linkDescription.id}`}
            ref={em => {
              _this.links[linkDescription.id] = em
            }}
            to={linkDescription.path}
            className={`${classNamePrefix}-list-item-link ${selectClass}`}
          >
            {(linkDescription.icon) ? <i className={linkDescription.icon} /> : null}
            {(linkDescription.icon) ? <span>{" "}</span> : null}
            {linkDescription.label}
          </Link>
        )
      }
    }

    componentDidMount() {
      this.updateSlider()
    }
    
    componentDidUpdate() {
      this.updateSlider()
    }

    
    updateSlider() {
      const { currentLinkId } = this.props
      const currentLink = this.links[currentLinkId]
      const slider = this.slider.current

      if (currentLink) {
        const lastLink = this.links[this.getLastSliderLinkId()]
        if (lastLink && lastLink.id !== currentLinkId) {
          slider.shift({from: lastLink, to: currentLink})
        } else {
          slider.moveTo(currentLink)
        }
      }

      this.setLastSliderLinkId(currentLinkId)
    }

    getLastSliderLinkId() {
      return this.context.navMenu.getLastSliderLinkId(this.props.id)
    }
    
    setLastSliderLinkId(id) {
      this.context.navMenu.setLastSliderLinkId(this.props.id, id)
    }
}

NavMenu.contextType = Context

export default NavMenu

class Slider extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        style: {},
        callback: null
      }
      this.slider = null

      this.moveTo = this.moveTo.bind(this)
      this.shift = this.shift.bind(this)
      this.parentRect = this.parentRect.bind(this)
      this.pctOfParent = this.pctOfParent.bind(this)
    }

    render() {
      const _this = this
      function sliderRendered(slider) {
        if (slider) {
          _this.slider = slider
          if (_this.state.callback) {
            _this.state.callback()
          }
        }
      }

      return (
          <div ref={sliderRendered} className={this.props.className} style={this.state.style}/>
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
      return this.slider.parentElement.getBoundingClientRect()
    }

    pctOfParent(x) {
      return `${x / this.parentRect().width * 100}%`
    }
}