import {graphql, Link, useStaticQuery} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const TagsStyles = styled.div`
  color: var(--color);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: 2rem;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    /* &.active {
      background: var(--yellow);
    } */
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`

export default function Tags({activeTag}) {
  const {posts} = useStaticQuery(graphql`
    query {
      posts: allMdx(
        sort: {frontmatter: {date: DESC}}
        filter: {
          frontmatter: {isPublished: {eq: true}}
          internal: {contentFilePath: {regex: "//content/blog//"}}
        }
      ) {
        edges {
          node {
            excerpt
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
  `)

  // loop thru the post and count the tags
  const tagsArrays = []
  for (const each of posts.edges) {
    const {tags} = each.node.frontmatter
    tagsArrays.push(...tags)
  }

  const tagsWithCount = tagsArrays.reduce((curr, prev) => {
    if (curr[prev]) {
      curr[prev] += 1
    } else {
      curr[prev] = 1
    }
    return curr
  }, {})

  return (
    <TagsStyles>
      <Link to="/tags">
        <span className="name">#All</span>
        <span className="count">#{tagsArrays.length}</span>
      </Link>
      {Object.entries(tagsWithCount).map(([tag, count], index) => (
        <Link
          key={index}
          to={`/tags/${tag}`}
          className={tag === activeTag ? 'active' : ''}
        >
          <span className="name">#{tag}</span>
          <span className="count">#{count}</span>
        </Link>
      ))}
    </TagsStyles>
  )
}
