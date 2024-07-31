import Bio from '../components/Bio'
import SEO from '../components/seo'
import React from 'react'
import styled from 'styled-components'

const AboutPageStyles = styled.div`
  color: var(--color, black);
`

function UsesPage() {
  return (
    <AboutPageStyles>
      <Bio footer />
      <h2>Uses WIP</h2>
      <p>Please check back later</p>
    </AboutPageStyles>
  )
}

export default UsesPage

export const Head = () => <SEO title="Uses" location />
