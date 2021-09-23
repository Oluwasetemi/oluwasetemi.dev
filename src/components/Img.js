import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Image({ image, ...theRest }) {
  if (!image) {
    return null
  }
  if (image.extension === 'gif') {
    return <img src={image.publicURL} {...theRest} />
  }
  return (
    <GatsbyImage image={image.childImageSharp.gatsbyImageData} {...theRest} />
  )
}
