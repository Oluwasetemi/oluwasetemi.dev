import {graphql, useStaticQuery} from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
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
            stackblitz
            youtube
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
