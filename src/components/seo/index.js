import {graphql, StaticQuery} from 'gatsby'
import React from 'react'
import {Helmet} from 'react-helmet'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        socials {
          twitter
          codepen
          github
          linkedIn
          hackerrank
          codesandbox
          stackoverflow
        }
      }
    }
  }
`

export default function SEO({children, location, description, title, image}) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const {siteMetadata} = data.site
        const metaDescription = description || siteMetadata.description
        const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null

        return (
          <Helmet Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
            <html lang="en" />
            <title>{title}</title>

            {/* Fav Icons */}
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            {/* <link rel="manifest" href="/site.webmanifest" /> */}
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#880088"
            />
            <meta name="apple-mobile-web-app-title" content="oluwasetemi.dev" />
            <meta name="application-name" content="oluwasetemi.dev" />
            <meta name="msapplication-TileColor" content="#800080" />
            <meta
              name="msapplication-TileImage"
              content="/mstile-150x150.png"
            />

            {/* Meta Tags */}
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
            />
            <meta charSet="utf-8" />
            <meta name="description" content={siteMetadata.description} />
            <meta
              name="keywords"
              content="oluwasetemi, oos, oosblog, setemiojo, javascript, reactjs, nodejs, all things javascript"
            />

            {/* Open Graph */}
            {location && (
              <meta
                property="og:url"
                content={typeof window !== 'undefined' && window.location.href}
              />
            )}
            <meta
              property="og:image"
              content={
                metaImage ||
                'https://avatars0.githubusercontent.com/u/10030028?v=3'
              }
            />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta
              propery="og:site_name"
              content={siteMetadata.title}
              key="ogsitename"
            />
            <meta
              property="og:description"
              content={siteMetadata.description}
              key="ogdesc"
            />

            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:creator"
              content={siteMetadata?.socials.twitter}
            />
            <meta name="twitter:title" content={title || siteMetadata?.title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta
              name="twitter:image:src"
              content={
                metaImage ||
                'https://avatars0.githubusercontent.com/u/10030028?v=3'
              }
            />
            {children}
          </Helmet>
        )
      }}
    />
  )
}
