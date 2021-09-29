/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import { animated, useSpring } from '@react-spring/web'
import Bio from 'components/Bio'
import SEO from 'components/seo'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { useDrag } from 'react-use-gesture'
import styled from 'styled-components'
import { formatReadingTime } from 'utils/helpers'

const OnePostSummaryStyles = styled(animated.article)`
  margin-top: 1.5rem;
  margin-bottom: 3.5rem;
  padding: 1.55rem 1.25em;
  cursor: grabbing;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  h2 {
    font-size: 2.25rem;
  }
  p.excerpt {
    margin-bottom: 2rem;
  }
`

function OnePostSummary({node, title}) {
  const [{x, y}, api] = useSpring(() => ({x: 0, y: 0}))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({down, movement: [mx, my]}) => {
    api.start({x: down ? mx : 0, y: down ? my : 0})
  })

  return (
    <OnePostSummaryStyles
      data-tip="Please Drag Me 👌"
      {...bind()}
      style={{x, y}}
      key={node.fields.slug}
    >
      <h2>
        <Link
          style={{boxShadow: 'none', color: '#800080'}}
          to={`/blog${node.fields.slug}`}
        >
          {title}
        </Link>
      </h2>
      <small>
        {node.frontmatter.date}
        {` • ${formatReadingTime(node.timeToRead)}`}
        {node.frontmatter.tags.map(tag => (
          <Link to={`/tags/${tag}`} key={tag}>
            • 🏷 <span>{`${tag}`}</span>
          </Link>
        ))}
      </small>
      <p className="excerpt" dangerouslySetInnerHTML={{__html: node.excerpt}} />
      <span>
        <Link
          style={{boxShadow: 'none', color: '#800080'}}
          to={`blog${node.fields.slug}`}
        >
          read more
        </Link>
      </span>
    </OnePostSummaryStyles>
  )
}

function BlogIndex({data: {allMdx}}) {
  const posts = allMdx.edges

  return (
    <>
      <SEO title="Home" />
      <Bio />
      {posts.map(({node}) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <OnePostSummary key={node.fields.slug} node={node} title={title} />
        )
      })}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {
        frontmatter: {isPublished: {eq: true}}
        fileAbsolutePath: {regex: "//content/blog//"}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "dddd DD MMMM YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
