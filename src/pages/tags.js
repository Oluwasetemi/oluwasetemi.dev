/* eslint-disable react/no-danger */
import Bio from '../components/Bio'
import OnePostSummary from '../components/OnePostSummary'
import SEO from '../components/seo'
import Tags from '../components/Tags'
import {graphql} from 'gatsby'
import React from 'react'

function TagsPage({data: {allMdx}, pageContext}) {
  const posts = allMdx.edges

  return (
    <>
      <Bio footer={true} />
      <Tags />
      {posts.map(({node}) => {
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
  query ($tagsRegex: String) {
    allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {isPublished: {eq: true}, tags: {regex: $tagsRegex}}
        internal: {contentFilePath: {regex: "//content/blog//"}}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
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
export const Head = ({data, pageContext}) => {
  const count = data?.allMdx?.edges?.length
  const tag = pageContext?.tag
  return (
    <SEO
      title={
        tag
          ? `${count} Blog Post with ${tag} tag${count > 1 ? 's' : ''}`
          : 'All Blog Post'
      }
    />
  )
}
