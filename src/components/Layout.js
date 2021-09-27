import {graphql, useStaticQuery} from 'gatsby'
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
  margin: 0 auto 3em auto;
  /* margin-top: clamp(2em, 8vw, 2em); */
  /* padding: 5px; */
  /* padding: clamp(5px, 1vw, 15px); */
  /* background-size: 1500px; */
  /* box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044); */
  /* border: 5px solid white; */

  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`

function Layout({children}) {
  const {site} = useStaticQuery(graphql`
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
      <ReactTooltip place="top" type="dark" effect="float" />
      {/* <div className="info">
        <b>
          Some blog post have its title missing. Fixing that! So Sorry for the
          Inconvenience.{' '}
        </b>
      </div> */}
      <SiteBorderStyles>
        <>
          <Nav title={site.siteMetadata?.title} />
          {children}
          <Footer />
        </>
      </SiteBorderStyles>
    </>
  )
}

export default Layout
