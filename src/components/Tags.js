import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: 2rem;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    /* &.active {
      background: var(--yellow);
    } */
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`

export default function Tags({ tags, all }) {
  return (
    <ToppingsStyles>
      <Link to="/tags">
        <span className="name">All</span>
        <span className="count">{all}</span>
      </Link>
      {Object.entries(tags).map(([tag, count], index) => (
        <Link key={index} to={`tags/${tag}`}>
          <span className="name">#{tag}</span>
          <span className="count">#{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  )
}
