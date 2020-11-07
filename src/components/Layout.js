import { Link } from 'gatsby'
import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typography'

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 10rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  background-size: 1500px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`

function Layout(props) {
  const { location, title, children } = props
  /* eslint-disable */
  const rootPath = `${__PATH_PREFIX__}/`
  /* eslint-enable */
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          marginBottom: '100px',
          marginTop: 0,
          color: '#800080',
        }}
      >
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
      </h1>
    )
  } else {
    header = (
      <h3>
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
      </h3>
    )
  }
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        {header}
        {children}
      </SiteBorderStyles>
    </>
  )
}

export default Layout
