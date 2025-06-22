import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'

function Footer() {
  const {site} = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          socials {
            twitter
            codepen
            github
            linkedIn
            hackerrank
            codesandbox
            youtube
            stackoverflow
            stackblitz
          }
        }
      }
    }
  `)

  const {siteMetadata} = site
  return (
    <footer
      style={{
        color: 'var(--color)',
        marginTop: '50px',
        paddingTop: '10px',
      }}
    >
      <div style={{float: 'right'}}>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          rss
        </a>
      </div>
      <a
        href={`https://twitter.com/${siteMetadata?.socials?.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter
      </a>{' '}
      &bull;{' '}
      <a
        href={`https://github.com/${siteMetadata?.socials?.github}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>{' '}
      &bull;{' '}
      <a
        href={`https://codepen.io/${siteMetadata?.socials?.codepen}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        codepen
      </a>
      &bull;{' '}
      <a
        href={`https://www.hackerrank.com/${siteMetadata?.socials?.hackerrank}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        hackerrank
      </a>
      &bull;{' '}
      <a
        href={`https://www.linkedin.com/in/${siteMetadata?.socials?.linkedIn}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedIn
      </a>
      &bull;{' '}
      <a
        href="https://cv.oluwasetemi.dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        cv
      </a>
      &bull;{' '}
      <a
        href={`https://codesandbox.io/u/${siteMetadata?.socials?.codesandbox}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        codesandbox
      </a>
      &bull;{' '}
      <a
        href={`https://stackoverflow.com/${siteMetadata?.socials?.stackoverflow}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        stackoverflow
      </a>
      &bull;{' '}
      <a
        href={`https://www.youtube.com/${siteMetadata?.socials?.youtube}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        youtube
      </a>
      &bull;{' '}
      <a
        href={`https://stackblitz.com/${siteMetadata?.socials?.stackblitz}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        stackblitz
      </a>
    </footer>
  )
}

export default Footer
