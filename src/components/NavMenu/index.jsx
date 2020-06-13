import React from 'react'
import { Link } from 'gatsby'
import Context from '../Context'
import UpdatedOnResize from '../UpdatedOnResize'

class NavMenu extends React.Component {
    constructor(props) {
        super(props)

        this.sliderRef = React.createRef()
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
                ref={this.sliderRef}
                className={`${classNamePrefix}-slider`}
                language={this.context.layout.language.get()}
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
      const slider = this.sliderRef.current
      if (slider) {
        slider.moveTo(this.links[this.props.currentLinkId])
      }
    }
}

NavMenu.contextType = Context

export default NavMenu

class Slider extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        style: {},
      }
      this.sliderRef = React.createRef()
    }

    render() {
      return (
          <div ref={this.sliderRef} className={this.props.className} style={this.state.style}/>
      )
    }

    setStyle(style) {
      this.setState({
        style,
      })
    }

    moveTo(link) {
      const { left: parentX, width: parentWidth } = this.parentRect()
      const { left: toX, width } = link.getBoundingClientRect()

      const style = {}
      if (this.props.language.ltr) {
        style.left = this.pctOfParent(toX - parentX)
      } else {
        style.right = this.pctOfParent(parentX + parentWidth - (toX + width))
      }
      style.width = width

      this.setState({style})
    }

    parentRect() {
      return this.sliderRef.current.parentElement.getBoundingClientRect()
    }

    pctOfParent(x) {
      return `${x / this.parentRect().width * 100}%`
    }
}