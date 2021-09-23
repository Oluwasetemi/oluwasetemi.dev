import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import PortfolioCard from '../components/PortfolioCard'
import SEO from '../components/SEO'

const PortfolioStyles = styled.div`
  color: var(--color);
`

const AllPortfolioStyles = styled.div`
  color: var(--color);
`

function AllPortfolio({ posts }) {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <AllPortfolioStyles key={`${post.slug}-${index}`}>
            <PortfolioCard post={post} />
          </AllPortfolioStyles>
        )
      })}
    </div>
  )
}



function PortfolioIndex({ data: { allMdx } }) {
  const posts = allMdx.edges

  return (
    <PortfolioStyles>
      <SEO title="Portfolio" />
      <h1>Portfolio</h1>

        <p className="">
          This page details some of the project, side project, contributions to Open Source I have worked on and my role on the
          project. It shows a little overhead details of the technology stack
          used. You can click on individual project to read more details.
        </p>
      <AllPortfolio posts={posts} />
      <Bio footer />
    </PortfolioStyles>
  )
}

export default PortfolioIndex

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { isPublished: { eq: false } }
        fileAbsolutePath: { regex: "//content/portfolio//" }
      }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "dddd DD MMMM YYYY")
            title
            url
            slug
            imageUrl
            description
            technology
            publishedDate
            tags
          }
        }
      }
    }
  }
`
