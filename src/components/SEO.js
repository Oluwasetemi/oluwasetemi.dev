import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

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
        }
      }
    }
  }
`

export default function SEO({ children, location, description, title, image }) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site
        const metaDescription = description || siteMetadata.description
        const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null

        return (
          <Helmet Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
            <html lang="en" />
            <title>{title}</title>

            {/* Fav Icons */}
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="alternate icon" href="/favicon.ico" />

            {/* Meta Tags */}
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
            />
            <meta charSet="utf-8" />
            <meta name="description" content={siteMetadata.description} />

            {/* Open Graph */}
            {location && (
              <meta
                property="og:url"
                content={typeof window !== 'undefined' && window.location.href}
              />
            )}
            <meta
              property="og:image"
              content="https://avatars0.githubusercontent.com/u/10030028?v=3"
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
              content="https://avatars0.githubusercontent.com/u/10030028?v=3"
            />
            {children}
          </Helmet>
        )
      }}
    />
  )
}
