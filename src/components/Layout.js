import {graphql, Link, useStaticQuery} from 'gatsby'
import 'normalize.css'
import * as React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import GlobalStyles from 'styles/GlobalStyles'
import Typography from 'styles/Typography'
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
    <React.Fragment>
      <GlobalStyles />
      <Typography />
      <ReactTooltip place="top" type="dark" effect="float" />
      <div className="info">
        <b>
          A new blog post just dropped{' '}
          <Link to="/blog/developer-experience-with-command-line-interface-cli-tools/">
            <span role="img" aria-label="speak loud">
              📣
            </span>{' '}
            Click here to read it.
          </Link>{' '}
        </b>
      </div>
      <SiteBorderStyles>
        <>
          <Nav title={site.siteMetadata?.title} />
          {children}
          <Footer />
        </>
      </SiteBorderStyles>
    </React.Fragment>
  )
}

export default Layout
