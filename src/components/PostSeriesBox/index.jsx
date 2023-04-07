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
  const language = context.page.language.get()
  const { path: seriesPath, order: postOrder } = series

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

  function linkLabel() {
    return switchLanguage('series', 'סדרה')
  }

  const title = (
    <h2 className='post-series-box__title'>
      {switchLanguage('This post is part of a ', 'פוסט זה הוא חלק מ')}
      <Link
        className='post-series-box__series-link'
        to={seriesLink(seriesPath, language)}
        title={linkLabel()}
      >
        {linkLabel()}
      </Link>
    </h2>
  )

  const firstLink = createLink(postOrder > 1, orderToSlug, 1,
    switchLanguage('First', 'ראשון'),
    '<<')
  const previousLink = createLink(postOrder > 1, orderToSlug, postOrder - 1,
    switchLanguage('Previous', 'קודם'),
    '<')
  const nextLink = createLink(postOrder < maxOrder, orderToSlug, postOrder + 1,
    switchLanguage('Next', 'הבא'),
    '>')
  const lastLink = createLink(postOrder < maxOrder, orderToSlug, maxOrder,
    switchLanguage('Last', 'אחרון'),
    '>>')

  const navMenu = (
    <ul className='post-series-box__nav'>
      {firstLink}
      {previousLink}
      <li className='post-series-box__nav-item current'>{postOrder}</li>
      {nextLink}
      {lastLink}
    </ul>
  )

  return <>
    <div className='post-series-box'>
      <div className='post-series-box__content'>
        {title}
        {navMenu}
      </div>
    </div>
  </>
}

function createLink(shouldDisplay, orderToSlug, order, title, symbol) {
  return (
    <li className='post-series-box__nav-item'>
      {
        (shouldDisplay) ? (
          <Link
            className='post-series-box__nav-link'
            to={orderToSlug.get(order)}
            title={title}
          >
            {symbol}
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
                demo: { ne: true }
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
