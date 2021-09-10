import { graphql, useStaticQuery } from 'gatsby'
import 'normalize.css'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import GlobalStyles from '../styles/GlobalStyles'
import Typography from '../styles/Typography'
import Footer from './Footer'
import Nav from './Nav'

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 2em auto 3em auto;
  margin-top: clamp(2em, 8vw, 2em);
  padding: 5px;
  padding: clamp(5px, 1vw, 15px);
  /* background-size: 1500px; */
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`

const ContentStyles = styled.div`
  /* color: red; */
  background: white;
  padding: 2rem;

  img {
    max-width: 100%;
  }
`

function Layout({ children }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ReactTooltip place="top" type="dark" effect="float" />
        <ContentStyles>
          <Nav title={site.siteMetadata?.title} />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  )
}

export default Layout
