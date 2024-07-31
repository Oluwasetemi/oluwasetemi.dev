import {graphql} from 'gatsby'

export const bannerImage = graphql`
  fragment bannerImage260 on File {
    childImageSharp {
      gatsbyImageData(
        width: 260
        traceSVG: {color: "#573ede"}
        quality: 50
        placeholder: TRACED_SVG
        layout: CONSTRAINED
      )
    }
  }

  fragment bannerImage640 on File {
    childImageSharp {
      gatsbyImageData(
        width: 640
        traceSVG: {color: "#573ede"}
        placeholder: TRACED_SVG
        layout: CONSTRAINED
      )
    }
  }

  fragment bannerImage720 on File {
    childImageSharp {
      gatsbyImageData(
        width: 720
        traceSVG: {color: "#573ede"}
        quality: 75
        placeholder: TRACED_SVG
        layout: CONSTRAINED
      )
    }
  }
`

export const ImageFields = graphql`
  fragment ImageFields on File {
    publicURL
    id
    extension
    childImageSharp {
      gatsbyImageData(width: 700, layout: CONSTRAINED)
    }
  }
`
