/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import Bio from '../components/Bio'
import OnePostSummary from '../components/OnePostSummary'
import PortfolioCard from '../components/PortfolioCard'
import SEO from '../components/seo'
import {graphql, Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const HeroStyles = styled.div`
  width: 100%;
  height: 300px;
  padding: 50px 0;
  color: var(--color);
  h1 {
    font-size: 6rem;
  }
`

const TopProjectStyles = styled.div`
  color: var(--color);
  h1 a {
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid var(--red);
    }
  }
  span.count {
    color: var(--red);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-feature-settings: 'tnum';
    padding: 0 10px;
    border-color: var(--color-100);
    border-width: 2px;
    border-style: outset;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    h1 {
      margin-top: 30rem;
    }
  }
`

const LatestPostStyles = styled.div`
  .latest-writing {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
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
  /* Tablet */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding: 0;
    h1 {
      font-size: 1.5em;
    }
    .latest-writing {
      display: block;
    }
  }

  /* phones */
  @media screen and (min-device-width: 320px) and (max-device-width: 768px) {
    padding: 0;
    h1 {
      font-size: 1.2em;
    }
    .latest-writing {
      display: block;
    }
  }
`

function TopProject({portfolios}) {
  return (
    <TopProjectStyles>
      <h1>
        <Link to="/portfolio">
          My Portfolios <span className="count">{portfolios.length}</span>{' '}
        </Link>
      </h1>
      {portfolios.map((portfolio, index) => {
        return (
          <PortfolioCard
            size="small"
            post={portfolio}
            key={`${portfolio.slug}-${index}`}
          />
        )
      })}
    </TopProjectStyles>
  )
}

function LatestPost({posts}) {
  return (
    <LatestPostStyles>
      <h2 className="heading">Some of my Writings</h2>
      <div className="latest-writing">
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <OnePostSummary key={node.fields.slug} node={node} title={title} />
          )
        })}
      </div>
      <span className="more">
        <Link style={{boxShadow: 'none', color: '#800080'}} to="blog">
          To see all of my writings.
        </Link>
      </span>
    </LatestPostStyles>
  )
}

const Typing = ({text, delay = 550}) => {
  const to = React.useRef()
  const [charIndex, setCharIndex] = React.useState(0)

  React.useEffect(() => {
    if (charIndex === text.length) setCharIndex(0)
    if (charIndex < text.length) {
      to.current = setTimeout(() => setCharIndex(charIndex + 1), delay)
    }
    return () => clearTimeout(to.current) // cleanup on unmount
  }, [charIndex, delay, text.length, text])

  return text.substr(0, charIndex + 1)
}

function Hero({site}) {
  const {siteMetadata} = site
  const [name, setName] = React.useState('Oluwasetemi')
  const [jobTitle, setJobTitle] = React.useState('Fullstack Developer')
  const names = ['Oluwasetemi', 'Ojo', 'Temi', 'Setemi']
  const jobTitles = [
    'Fullstack Engineer @fluna.co and Frontend Engineering Instructor @AltSchoolAfrica',
    // 'Front-end Engineer',
    // 'Backend Engineer',
    // 'Software Engineer',
    // 'Developer Relations Lead',
    // 'Education Developer',
    // 'Fullstack Developer',
    // 'Front-end Developer',
    // 'Backend Developer',
    // 'Software Developer',
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
      <h1>
        I&apos;m <Typing text={name} />
      </h1>
      <p>
        I&apos;m a{' '}
        <mark className="ibm-plex-mono-regular-italic">{jobTitle}</mark>. I
        specialize in building web applications with TypeScript, JavaScript,
        React, and Node.js. You can explore my projects on{' '}
        <a
          href={`https://github.com/${siteMetadata?.socials?.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{' '}
        and{' '}
        <a
          href={`https://stackblitz.com/${siteMetadata?.socials?.stackblitz}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Stackblitz
        </a>
        . I have a passion for teaching and sharing insights about web
        development, helping others learn and grow in this field. Check out my{' '}
        <Link to="blog">writing</Link> for more tips and tutorials. .Recently I
        started a YouTube channel where I share my knowledge and experience in
        web development in a totally different way by live streaming my coding
        sessions. You can check it out{' '}
        <a
          href={`https://youtube.com/${siteMetadata?.socials?.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </HeroStyles>
  )
}

function BlogIndex({data: {blog, portfolio, site}}) {
  const posts = blog.edges
  const projects = portfolio.edges

  return (
    <>
      <Hero site={site} />
      <TopProject portfolios={projects} />
      <LatestPost posts={posts} />
      <Bio footer />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site: site {
      siteMetadata {
        title
        description
        author
        socials {
          twitter
          codepen
          github
          linkedIn
          hackerrank
          codesandbox
          stackblitz
          youtube
        }
      }
    }
    portfolio: allMdx(
      sort: {frontmatter: {publishedDate: DESC}}
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
            technology
            description
          }
        }
      }
    }
    blog: allMdx(
      limit: 6
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {isPublished: {eq: true}}
        internal: {contentFilePath: {regex: "//content/blog//"}}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          timeToRead
          fields {
            slug
          }
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

export const Head = () => <SEO title="Home" />
