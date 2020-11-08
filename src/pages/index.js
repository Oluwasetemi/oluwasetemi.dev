/* eslint-disable react/no-danger */
import { graphql, Link } from 'gatsby'
import React from 'react'
import Bio from '../components/Bio'
import SEO from '../components/SEO'
import { formatReadingTime } from '../utils/helpers'

function BlogIndex({ data: { allMarkdownRemark } }) {
  const posts = allMarkdownRemark.edges

  return (
    <>
      <SEO />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link
                style={{ boxShadow: 'none', color: '#800080' }}
                to={node.fields.slug}
              >
                {title}
              </Link>
            </h3>
            <small>
              {node.frontmatter.date}
              {` • ${formatReadingTime(node.timeToRead)}`}
              {node.frontmatter.tags.map(tag => (
                <Link to={`/tags/${tag}`} key={tag}>
                  • 🏷 <span className="mark">{`${tag}`}</span>
                </Link>
              ))}
            </small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isPublished: { eq: true } } }
    ) {
      edges {
        node {
          excerpt
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
