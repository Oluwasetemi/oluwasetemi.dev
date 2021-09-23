import React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import SEO from '../components/SEO'

const AboutPageStyles = styled.div`
  color: var(--color);
`

function UsesPage({ data }) {
  return (
    <AboutPageStyles>
      <SEO title="Uses" location />
      <Bio footer />
      <h2>Uses WIP</h2>
      <p>Please check back later</p>
    </AboutPageStyles>
  )
}

export default UsesPage
