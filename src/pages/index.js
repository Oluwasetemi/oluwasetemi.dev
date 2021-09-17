/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import OnePostSummary from '../components/OnePostSummary'
import SEO from '../components/SEO'

const HeroStyles = styled.div`
  width: 100%;
  height: 300px;
  padding: 50px 0;
  color: var(--color);
  h1 {
    font-size: 6rem;
  }
`

const LatestPostStyles = styled.div`
  padding: 40px 60px 70px;
  position: relative;
  background-color: var(--color-5000, #ffebff50);
  h2.heading {
    font-size: 3rem;
    margin-bottom: 50px;
    color: var(--color);
  }
  span.more {
    position: relative;
    padding-left: 689px;
  }
`

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`

function LatestPost({ posts }) {
  return (
    <LatestPostStyles>
      <h2 className="heading">Some of my Writings</h2>
      <GridStyles>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <OnePostSummary key={node.fields.slug} node={node} title={title} />
          )
        })}
      </GridStyles>
      <span className="more">
        <Link style={{ boxShadow: 'none', color: '#800080' }} to="blog">
          To see all of my writings.
        </Link>
      </span>
    </LatestPostStyles>
  )
}

function Hero() {
  const [name, setName] = React.useState('Oluwasetemi')
  const [jobTitle, setJobTitle] = React.useState('Fullstack Developer')
  const names = ['Oluwasetemi', 'Ojo', 'Temi', 'Setemi']
  const jobTitles = [
    'Fullstack Engineer',
    'Front-end Engineer',
    'Backend Engineer',
    'Software Engineer',
    'Developer Relations Lead',
    'Education Developer',
    'Fullstack Developer',
    'Front-end Developer',
    'Backend Developer',
    'Software Developer',
  ]
  const generateRandomValue = (value, action) =>
    action(value[Math.trunc(Math.random() * value.length)])

  React.useEffect(() => {
    const timer = setInterval(() => {
      generateRandomValue(names, setName)
      generateRandomValue(jobTitles, setJobTitle)
    }, 10000)

    return () => clearInterval(timer)
  }, [jobTitle, jobTitles, name, names])

  return (
    <HeroStyles>
      <h1>I'm {name}</h1>
      <p>
        I'm a <mark className="tilt">{jobTitle}</mark>. I make all sort of stuff
        with JavaScript, React, Nodejs. You can find my work on GitHub and
        CodeSandbox. I enjoy teaching and sharing about the things I build.
        Check out my <Link to="blog">writing</Link>.
      </p>
    </HeroStyles>
  )
}

function BlogIndex({ data: { allMdx } }) {
  const posts = allMdx.edges

  return (
    <>
      <SEO title="Home" />
      <Hero />
      <LatestPost posts={posts} />
      <Bio footer />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isPublished: { eq: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "dddd DD MMMM YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
