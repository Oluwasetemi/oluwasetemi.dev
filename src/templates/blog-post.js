/* eslint-disable react/no-danger */
import { graphql, Link } from 'gatsby'
import React from 'react'
import Utterance from 'react-utterances'
import styled from 'styled-components'
import Bio from '../components/Bio'
import LinkSvg from '../components/LinkSvg'
import SEO from '../components/SEO'
import { formatReadingTime } from '../utils/helpers'

const BlogPostStyles = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 5px;
  }
  strong {
    text-text-decoration: underline;
  }
  ul > li,
  ol > li {
    margin-bottom: 25px;
  }
  main p {
    letter-spacing: 0.7px;
  }
  .sub-header {
    display: flex;
  }

  blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: '\201C''\201D''\2018''\2019';
  }

  blockquote::before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  blockquote p {
    display: inline;
  }

  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    h1 {
      font-size: 1.5em;
    }
    .sub-header {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .sub-header span {
      letter-spacing: normal;
    }
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    h1 {
      font-size: 1.2em;
    }
    .sub-header {
      display: grid;
    }
    .sub-header span {
      letter-spacing: normal;
    }
  }
`

function BlogPostTemplate({ data, pageContext }) {
  const post = data.markdownRemark
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
    <BlogPostStyles>
      <SEO title={post.frontmatter.title} description={siteDescription} />
      <h1 style={{ color: 'var(--color)' }}>{post.frontmatter.title}</h1>
      <div className="sub-header">
        <span>• 📅 {post.frontmatter.date}</span>

        <span>{` • ${formatReadingTime(post.timeToRead)}`}</span>
        <span>
          •
          {post.frontmatter.tags.map(tag => (
            <Link to={`/tags/${tag}`} key={tag}>
              🏷 <span className="mark">{`${tag}`}</span>
            </Link>
          ))}
        </span>
        <span className="github-edit-link">
          • {`✏️ `}
          <a href={gitMarkdownUrl} rel="noreferrer" target="_blank">
            Edit this post on GitHub
          </a>
          <LinkSvg />
        </span>
      </div>

      <main
        className="main-content"
        style={{ marginTop: '50px' }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr
        style={{
          marginBottom: '50px',
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
    </BlogPostStyles>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
