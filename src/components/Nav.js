import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const LogoStyles = styled.h1`
  margin-bottom: 50px;
  margin-top: 0px;
  color: var(--color);
  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-bottom: 25px;
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    margin-bottom: 10px;
  }
`

function Logo({ title }) {
  return (
    <LogoStyles>
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to="/"
      >
        {title}
      </Link>
    </LogoStyles>
  )
}

function Nav({ title }) {
  return (
    <nav>
      <Logo title={title} />
    </nav>
  )
}

export default Nav
