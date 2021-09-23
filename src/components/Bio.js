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
  color: var(--color);
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
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

function Bio({ footer }) {
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
        {footer ? "I ' m" : 'Written by'}{' '}
        <strong>
          <a
            className="link"
            href={`https://github.com/${siteMetadata?.socials?.github}`}
            target="_blank"
            rel="noreferrer"
          >
            {siteMetadata?.author}
          </a>{' '}
          {siteMetadata?.title},
        </strong>{' '}
        A FullStack Developer (Reactjs, Nodejs, Typescript), currently lives in Osogbo,
        Osun State Nigeria with my lovely and priceless Wife{' '}
        <a
          className="link"
          href="https://twitter.com/BeagloOfficial"
          target="_blank"
          rel="noreferrer"
        >
          Temidayo
        </a>{' '}
        .🎈
        <br />
        <a
          className="link"
          href={`https://mobile.twitter.com/${siteMetadata?.socials?.twitter}`}
          target="_blank"
          rel="noreferrer"
        >
          Say Hi to Him on Twitter. <br />
        </a>
        <Link to="/tags">
          You can search through my blog using custom created tags• 🏷{' '}
        </Link>
        .<br /> <Link to="/about">Click here to read more about me.</Link>{' '}
        <a className="link" href="/rss.xml" target="_blank">
          For RSS feed.🌍
        </a>
      </p>
    </BioStyles>
  )
}

export default Bio
