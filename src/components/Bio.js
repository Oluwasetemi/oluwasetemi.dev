import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
// Import typefaces
import profilePic from '../assets/profile-pic.jpg'

function Bio() {
  const { site } = useStaticQuery(graphql`
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
          }
        }
      }
    }
  `)

  const { siteMetadata } = site
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <img
        src={profilePic}
        alt="Ojo Oluwasetemi"
        style={{
          marginRight: '20px',
          marginBottom: 0,
          width: '100px',
          height: '100px',
          borderRadius: '50%',
        }}
      />
      <p>
        Written by{' '}
        <strong>
          <a
            className="link"
            href={`https://github.com/${siteMetadata?.socials?.github}`}
          >
            {siteMetadata?.author}
          </a>{' '}
          {siteMetadata?.title}
        </strong>{' '}
        Relocated to Osogbo, Osun State, Nigeria.🎈{' '}
        <a
          className="link"
          href={`https://mobile.twitter.com/${siteMetadata?.socials?.twitter}`}
        >
          Say Hi to Him on Twitter.
        </a>
        You can search through my blog using custom created
        <Link to="/tags"> tags</Link>.<br />{' '}
        <a className="link" href="/rss.xml">
          RSS feed
        </a>
      </p>
    </div>
  )
}

export default Bio
