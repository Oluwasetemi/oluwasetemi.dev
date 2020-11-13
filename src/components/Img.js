/* eslint react/jsx-props-no-spreading: 0 */
/* eslint jsx-a11y/alt-text: 0 */
import Img from 'gatsby-image'
import React from 'react'

export default function Image({ image, ...theRest }) {
  if (!image) {
    return null
  }
  if (image.extension === 'gif') {
    return <img src={image.publicURL} {...theRest} />
  }
  return <Img fluid={image.childImageSharp.fluid} {...theRest} />
}
