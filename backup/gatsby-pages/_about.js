import Bio from '../components/Bio'
import Img from '../components/Img'
import SEO from '../components/seo'
import {graphql, Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const AboutPageStyles = styled.div`
  color: var(--color);
`

function AboutPage({data}) {
  const {setemi} = data
  return (
    <AboutPageStyles>
      <Bio footer />
      <h2>
        About Me{' '}
        <span role="img" aria-label="a man">
          👨
        </span>{' '}
      </h2>
      <p>
        I&apos;m Oluwasetemi{' '}
        <span role="img" aria-label="nigerian flag">
          🇳🇬
        </span>
        , my name is pronounced SHAY + TAY(Not TI) + ME. People often call me
        Ojo, Temi, Setemi or Stephen. I prefer to be addressed with anyone that
        is easy for you.
      </p>

      <p>
        I&apos;m a web developer, passionate about the stuffs I build from
        Nigeria{' '}
        <span role="img" aria-label="nigerian flag">
          🇳🇬
        </span>{' '}
        who loves to work with JavaScript, Typescript Reactjs, Nodejs and
        GraphQL. I love to solve problems compared to focusing of the technology
        howbeit, I consider what technology is best fits the domain of problems.
      </p>

      <p>
        <span className="mark">
          I have keen interest in roles around Frontend Engineering, Backend
          Engineering, Developer Education, Developer Relations, Developer
          Experience and Full-Stack roles.
        </span>
      </p>

      <p>
        I sometimes teach programming and web development related courses to
        entry level developers. I focus on all the stuffs that will make the
        difference and make learning interesting. I have a special way of making
        complex concept simple and easy to grasp.
      </p>

      <Img image={setemi} alt="oluwasetemi" />

      <p>
        I took time to learn JavaScript after I finished from the university, I
        wrote about this in a blog,{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.oluwasetemi.dev/blog/story-part-1/"
        >
          you should check it out.
        </a>
      </p>

      <p>
        Building Software products for clients is what I do when I am not
        teaching.
        <Link to="/portfolio">You can checkout my portfolios here.</Link>{' '}
      </p>

      <h3>More on Family</h3>
      <p>
        I am the second of 6 children and the first male in the lineage. Both
        parent are late (Blessed memory), Mum died first year in university and
        Dad died while I was serving(as a graduate in nigeria it is mandatory to
        serve the nation for a year which involves paramilitary training and
        other community services) Nigeria (country of birth) in Benue State
        (Food basket of the nation), Nigeria in 2017.{' '}
      </p>

      <p>
        I am in love{' '}
        <span role="img" aria-label="the love blush">
          😍
        </span>{' '}
        with Ajayi Temidayo Abosede. She is my gift from God.
      </p>

      <h3>More on Technical Experience</h3>
      <p>
        I build software with JavaScript and Typescript confidently. I have good
        experience with C# and Python (Flask, Django). I have written a little
        bit of C and C++ (not near production experience trust me, educational
        purpose).
      </p>
      <p>
        I have keen interest in React, GraphQL and related technologies like
        Gatsbyjs (the technology I use to build this piece), Nextjs, Prisma,
        Keystone, CMS - Contentful, Sanity, . For more technical details like
        uses, fonts, setup and dotfiles <Link to="/uses">check here</Link>.
      </p>
      <h3>More about Location</h3>
      <p>
        I currently live in the beautiful city of Osogbo, grew up in Ibadan ,
        worked 2 year in Lagos, Abuja happens to be my second home and{' '}
        <abbr title="National Youth Service Corps">NYSC</abbr> Service took me
        to Benue State.I love travelling and exploring new cultures.
      </p>

      <h3>More Links</h3>
      <p>
        <Link to="/contact">Contact</Link> - Contact me!
      </p>
      <p>
        <Link to="/links">Links</Link> - a bunch of links to stuff I work on.
      </p>
      <p>
        <Link to="/uses">Uses</Link> - all the stuffs I use from fonts, vscode
        theme to IDE and dotfiles.
      </p>
      {/* <p>
        <Link to="/appearance">Appearance</Link> - Podcasts/interviews/etc that
        I've appeared on.
      </p> */}
      {/* <p>
        <Link to="/info">info</Link> - Bio, Photo, how to spell and pronounce my
        name.
      </p> */}
      <p>
        <a
          href="https://discord.gg/tHf84svv"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord Server
        </a>{' '}
        - Join our discord community!.
      </p>
    </AboutPageStyles>
  )
}

export default AboutPage

export const pageQuery = graphql`
  {
    setemi: file(relativePath: {eq: "setemi.jpg"}) {
      childImageSharp {
        gatsbyImageData(transformOptions: {fit: CONTAIN}, layout: FULL_WIDTH)
      }
    }
  }
`

export const Head = () => <SEO title="About Me" location />
