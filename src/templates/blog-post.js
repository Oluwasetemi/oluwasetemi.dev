/* eslint-disable react/no-danger */
import { graphql, Link } from 'gatsby'
import React from 'react'
import Utterance from 'react-utterances'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

function BlogPostTemplate({ data, location, pageContext }) {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = post.excerpt
  const { previous, next } = pageContext

  function getGitMarkdownUrl() {
    const GITHUB_USERNAME = 'Oluwasetemi'
    const GITHUB_REPO_NAME = 'oluwasetemi.dev'
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${post.fields.slug.replace(
      /\//g,
      ''
    )}/index.md`
    return editUrl
  }

  const gitMarkdownUrl = getGitMarkdownUrl()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        lang="en"
        title={post.frontmatter.title}
        description={siteDescription}
        slug={post.fields.slug}
      />
      <h1 style={{ color: 'var(--color)' }}>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1 / 4),
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date}
        {` • ${formatReadingTime(post.timeToRead)}`}
        {post.frontmatter.tags.map(tag => (
          <Link to={`/tags/${tag}`} key={tag}>
            <span className="mark">{` • 🏷 ${tag}`}</span>
          </Link>
        ))}
      </p>
      <p className="github-edit-link" style={{ marginBottom: rhythm(1 / 4) }}>
        {`✏️ `}
        <a href={gitMarkdownUrl} rel="noreferrer" target="_blank">
          Edit this post on GitHub
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          width="15"
          height="15"
        >
          <path
            fill="currentColor"
            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
          />
          <polygon
            fill="currentColor"
            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
          />
        </svg>
      </p>
      <div
        style={{ marginTop: rhythm(-1) }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <p>Comments Should Load Here😜</p>
      <Utterance repo="Oluwasetemi/oluwasetemi.dev" type="url" />
      <Bio />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      timeToRead
      fileAbsolutePath
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
      }
    }
  }
`
