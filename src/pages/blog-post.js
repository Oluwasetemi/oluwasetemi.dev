/* eslint-disable react/no-danger */
import Bio from 'components/Bio'
import LinkSvg from 'components/LinkSvg'
import SEO from 'components/seo'
import {graphql, Link} from 'gatsby'
import * as React from 'react'
import Utterance from 'react-utterances'
import styled from 'styled-components'
import {formatReadingTime} from 'utils/helpers'

const BlogPostStyles = styled.div`
  color: var(--color);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 5px;
  }
  strong {
    text-decoration: underline;
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
    flex-direction: column;
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

function BlogPostTemplate({data, pageContext, children}) {
  const post = data.mdx
  const {previous, next} = pageContext
  const previousSlug = `/blog${previous?.fields.slug}`
  const nextSlug = `/blog${next?.fields.slug}`

  function getGitMarkdownUrl() {
    const GITHUB_USERNAME = 'Oluwasetemi'
    const GITHUB_REPO_NAME = 'oluwasetemi.dev'
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/main/content/blog/${post.fields.slug.replace(
      /\//g,
      '',
    )}/index.mdx`
    return editUrl
  }

  const gitMarkdownUrl = getGitMarkdownUrl()

  return (
    <BlogPostStyles>
      <Link to="/blog">
        <p>&larr; Back to Writings</p>
      </Link>
      <h1 style={{color: 'var(--color)'}}>{post.frontmatter.title}</h1>
      <div className="sub-header">
        <span>
          •{' '}
          <span role="img" aria-label="calender">
            📅
          </span>{' '}
          {post.frontmatter.date}
        </span>

        <span>{` • ${formatReadingTime(post.timeToRead)}`}</span>
        {post && post?.frontmatter && post?.frontmatter?.tags?.length > 0 && (
          <span>
            •
            {post.frontmatter.tags.map(tag => (
              <Link to={`/tags/${tag}`} key={tag}>
                🏷 <span>{`${tag}`}</span>
              </Link>
            ))}
          </span>
        )}
        <span className="github-edit-link">
          • {`✏️ `}
          <a href={gitMarkdownUrl} rel="noreferrer" target="_blank">
            Edit this post on GitHub
          </a>
          <LinkSvg />
        </span>
      </div>
      {/* {console.log(post.body)} */}
      <div className="main-content" style={{marginTop: '50px'}}>
        {children}
      </div>
      <hr
        style={{
          marginBottom: '50px',
        }}
      />
      <p>
        Comments Should Load Here {` `}
        <span role="img" aria-label="winks">
          😜
        </span>
      </p>
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
            <Link to={previousSlug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={nextSlug} rel="next">
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
  query BlogPostBySlug($slug: String) {
    mdx(fields: {slug: {eq: $slug}}) {
      id
      excerpt
      timeToRead
      wordCount
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
        timeToRead {
          minutes
          words
        }
      }
      internal {
        contentFilePath
      }
    }
  }
`

export const Head = ({data: {mdx}}) => (
  <SEO
    title={mdx?.frontmatter?.title}
    description={mdx.frontmatter.description}
  />
)
