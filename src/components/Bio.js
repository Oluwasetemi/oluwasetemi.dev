import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import profilePic from '../assets/images/profile-pic.jpg'

const ImageStyle = styled.img`
  margin-right: 20px;
  margin-bottom: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const BioStyles = styled.div`
  display: flex;
  align-items: center;
  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

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
    <BioStyles>
      <ImageStyle src={profilePic} alt="Ojo Oluwasetemi" />
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
        Full Stack Developer who recently relocated to Osogbo, Osun State,
        Nigeria.🎈{' '}
        <a
          className="link"
          href={`https://mobile.twitter.com/${siteMetadata?.socials?.twitter}`}
        >
          Say Hi to Him on Twitter.
        </a>
        You can search through my blog using custom created
        <Link to="/tags"> tags</Link>.<br />{' '}
        <Link to="/about">Click here to read more about me.</Link>{' '}
        <a className="link" href="/rss.xml">
          RSS feed
        </a>
      </p>
    </BioStyles>
  )
}

export default Bio
