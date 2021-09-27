/* eslint-disable react/no-danger */
import {graphql, Link} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import LinkSvg from '../components/LinkSvg'
import SEO from '../components/SEO'
import {formatReadingTime} from '../utils/helpers'

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

function PortfolioTemplate({data, pageContext}) {
  const post = data.mdx
  const siteDescription = post.frontmatter.description
  const {previous, next} = pageContext

  function getGitMarkdownUrl() {
    const GITHUB_USERNAME = 'Oluwasetemi'
    const GITHUB_REPO_NAME = 'oluwasetemi.dev'
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/main/content/portfolio/${post.fields.slug.replace(
      /\//g,
      '',
    )}/index.mdx`
    return editUrl
  }

  const gitMarkdownUrl = getGitMarkdownUrl()

  return (
    <BlogPostStyles>
      <SEO title={post.frontmatter.title} description={siteDescription} />
      <Link to="/portfolio">
        <p>&larr; Back to Portfolio</p>
      </Link>
      <h1 style={{color: 'var(--color)'}}>{post.frontmatter.title}</h1>
      <div className="sub-header">
        <span>
          •{' '}
          <span role="img" aria-label="the world">
            📅
          </span>{' '}
          {post.frontmatter.publishedDate}
        </span>

        <span>{` • ${formatReadingTime(post.timeToRead)}`}</span>
        {post && post.frontmatter && post.frontmatter.technology.length > 0 && (
          <span>
            •
            {post.frontmatter.technology.map((tag, index) => (
              <React.Fragment key={`${tag}-${index}`}>
                🏷 <span key={tag - index}>{`${tag}`}</span>
              </React.Fragment>
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
      <MDXRenderer className="main-content" style={{marginTop: '50px'}}>
        {post.body}
      </MDXRenderer>
      <hr
        style={{
          marginBottom: '50px',
        }}
      />

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
            <Link to={`/portfolio/${previous.frontmatter.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/portfolio/${next.frontmatter.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </BlogPostStyles>
  )
}

export default PortfolioTemplate

export const pageQuery = graphql`
  query PortfolioBySlug($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      id
      body
      timeToRead
      fileAbsolutePath
      frontmatter {
        title
        publishedDate(formatString: "MMMM DD, YYYY")
        technology
        description
        slug
      }
      fields {
        slug
      }
    }
  }
`
