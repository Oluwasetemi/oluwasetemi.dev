import Bio from '../components/Bio'
import PortfolioCard from '../components/PortfolioCard'
import SEO from '../components/seo'
import {graphql} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const PortfolioStyles = styled.div`
  color: var(--color);
`

const AllPortfolioStyles = styled.div`
  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    h1 {
      font-size: 1.5em;
    }

    .card-image img {
      width: 330px;
      height: auto;
    }
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    h1 {
      font-size: 1.2em;
    }
    .card-image img {
      min-width: 330px;
      height: auto;
    }
  }
`

function AllPortfolio({posts}) {
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

function PortfolioIndex({data: {allMdx}}) {
  const posts = allMdx.edges

  return (
    <PortfolioStyles>
      <h1>Portfolio</h1>

      <p className="">
        This page details some of the project, side project, contributions to
        Open Source I have worked on and my role on the project. It shows a
        little overhead details of the technology stack used. You can click on
        individual project to read more details.
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
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {isPublished: {eq: true}}
        internal: {contentFilePath: {regex: "//content/portfolio//"}}
      }
    ) {
      edges {
        node {
          frontmatter {
            publishedDate(formatString: "dddd DD MMMM YYYY")
            title
            url
            slug
            imageUrl
            description
            technology
          }
        }
      }
    }
  }
`

export const Head = () => <SEO title="Portfolio" />
