import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const LogoStyles = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
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

const NavItemsStyles = styled.div`
  margin-top: 0px;
  display: flex;
  width: 250px;
  justify-content: space-around;

  & > * {
    text-decoration-color: var(--color-200);
  }
  & > *:hover {
    text-decoration-color: transparent;
    transition: text-decoration-color 20ms;
  }

  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-bottom: 25px;
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    margin-bottom: 10px;
  }
`
const NavStyles = styled.nav`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & a[aria-current='page'] {
    color: var(--color);
  }
`

function Logo({title}) {
  return (
    <LogoStyles>
      <Link
        className='ibm-plex-mono-bold-italic'
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

function NavItems() {
  return (
    <NavItemsStyles>
      {['About', 'Tags', 'Writing', 'Portfolio'].map((each, index) => (
        <Link
          key={index}
          to={`/${each === 'Writing' ? 'blog' : each.toLowerCase()}`}
        >
          <span className="item">{each}</span>
        </Link>
      ))}
    </NavItemsStyles>
  )
}

function Nav({title}) {
  return (
    <NavStyles>
      <Logo title={title} />
      <NavItems />
    </NavStyles>
  )
}

export default Nav
