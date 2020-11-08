/* eslint-disable react/no-danger */
import { graphql, Link } from 'gatsby'
import React from 'react'
import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Tags from '../components/Tags'
import { formatReadingTime } from '../utils/helpers'

function flattenArray(arr) {
  const flattened = [].concat(...arr)
  return flattened.some(item => Array.isArray(item))
    ? flattenArray(flattened)
    : flattened
}

function BlogIndex(
  { data: { site, allMarkdownRemark }, pageContext },
  location
) {
  const { siteTitle, siteDescription } = site
  const posts = allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <Bio />
      <Tags activeTag={pageContext.tag} />
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
      <Footer />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($tagsRegex: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { isPublished: { eq: true }, tags: { regex: $tagsRegex } }
      }
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
