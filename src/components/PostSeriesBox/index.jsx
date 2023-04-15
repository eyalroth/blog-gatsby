import React, { useContext } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Languages } from '../../consts/languages'
import { seriesLink } from '../../consts/menuLinks'
import './style.scss'
import Context from '../Context'

function PostSeriesBox(props) {
  if (!props.series) {
    return null
  }

  const data = useStaticQuery(allSeriesPostsQuery)
  const context = useContext(Context)

  const { series } = props
  const language = context.layout.language.get()
  const { path: seriesPath, order: postOrder, name: seriesName } = series

  const seriesEdges = data.allMarkdownRemark.edges.filter(edge =>
    edge.node.frontmatter.series.path === seriesPath,
  )

  const orderToSlug = new Map(seriesEdges.map(edge =>
    [edge.node.frontmatter.series.order, edge.node.fields.slug],
  ))

  const maxOrder = Math.max(...Array.from(orderToSlug.keys()))

  function switchLanguage(english, hebrew) {
    // eslint-disable-next-line
    switch (language) {
      case Languages.English:
        return english
      case Languages.Hebrew:
        return hebrew
    }
  }

  const title = (
    <span className='post-series-box__title'>
      <Link
        className='post-series-box__series-link'
        to={seriesLink(seriesPath, language)}
        title={seriesName}
      >
        {seriesName}
      </Link>
    </span>
  )

  const subtitle = (
      <span className="post-series-box__subtitle">
          {postOrder}
      </span>
  )

  const rightArrow = String.fromCharCode("0xe80a")

  const firstLink = createLink(postOrder > 1, orderToSlug, 1,
    switchLanguage('First', 'ראשון'),
    "backwards",
    `${rightArrow}${rightArrow}`)
  const previousLink = createLink(postOrder > 1, orderToSlug, postOrder - 1,
    switchLanguage('Previous', 'קודם'),
    "backwards",
    rightArrow)
  const nextLink = createLink(postOrder < maxOrder, orderToSlug, postOrder + 1,
    switchLanguage('Next', 'הבא'),
    "forwards",
    rightArrow)
  const lastLink = createLink(postOrder < maxOrder, orderToSlug, maxOrder,
    switchLanguage('Last', 'אחרון'),
    "forwards",
    `${rightArrow}${rightArrow}`)

  return (
    <div className="post-series-box">
      <ul className="post-series-box__list">
        {firstLink}
        {previousLink}
        <li className="post-series-box__list-item middle">
          {title}
          <br/>
          {subtitle}
        </li>
        {nextLink}
        {lastLink}
      </ul>
    </div>
  )
}

function createLink(shouldDisplay, orderToSlug, order, title, cssClass, content) {
  return (
    <li className="post-series-box__list-item">
      {
        (shouldDisplay) ? (
          <Link
            className='post-series-box__link'
            to={orderToSlug.get(order)}
            title={title}
          >
            <span title={title}
                  className={`post-series-box__link-icon ${cssClass}`}
                  style={{fontFamily: "fontello"}}
            >
                {content}
            </span>
          </Link>
        ) : null
      }
    </li>
  )
}

export default PostSeriesBox

const allSeriesPostsQuery = graphql`
    query PostSeriesBoxQuery {
        allMarkdownRemark(
            filter: { frontmatter: { 
                series: { path: { ne: null }}
            }}
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        series {
                            path
                            order
                        }
                    }
                }
            }
        }
    }
`
