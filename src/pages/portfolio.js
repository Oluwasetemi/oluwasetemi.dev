import React from 'react'

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
    <div>
      <h1>My Portfolio </h1>
      {portfolioList.map((each, i) => (
        <SinglePortfolio key={i} />
      ))}
    </div>
  )
}
