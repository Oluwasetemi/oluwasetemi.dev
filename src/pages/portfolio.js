import React from 'react'
import styled from 'styled-components'

const PortfolioStyles = styled.div`
  color: var(--color);
`

const portfolioList = [
  {
    name: '',
    builtDate: '',
    technologies: ['tech1', 'tech2'],
    linkSourceCode: 'https://oluwasetemi.dev',
    liveUrl: 'https://oluwasetemi.dev',
  },
  {
    name: '',
    builtDate: '',
    technologies: ['tech1', 'tech2'],
    linkSourceCode: 'https://oluwasetemi.dev',
    liveUrl: 'https://oluwasetemi.dev',
  },
]

function SinglePortfolio() {
  return (
    <>
      <h2>Project One</h2>

      <p>Project One details</p>
    </>
  )
}

export default function PortfolioPage() {
  return (
    <PortfolioStyles>
      <h1>My Portfolio </h1>
      {portfolioList.map((each, i) => (
        <SinglePortfolio key={i} />
      ))}
    </PortfolioStyles>
  )
}
