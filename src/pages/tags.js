/* eslint-disable react/no-danger */
import { graphql } from 'gatsby'
import React from 'react'
import Bio from '../components/Bio'
import OnePostSummary from '../components/OnePostSummary'
import SEO from '../components/SEO'
import Tags from '../components/Tags'

function TagsPage({ data: { allMdx }, pageContext }) {
  const posts = allMdx.edges

  return (
    <>
      <SEO
        title={
          pageContext.tag
            ? `Blog Post with ${pageContext.tag} tag`
            : 'All Blog Post'
        }
        location
      />
      <Bio footer />
      <Tags activeTag={pageContext.tag} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <OnePostSummary key={node.fields.slug} node={node} title={title} />
        )
      })}
    </>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query($tagsRegex: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { isPublished: { eq: true }, tags: { regex: $tagsRegex } }
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
