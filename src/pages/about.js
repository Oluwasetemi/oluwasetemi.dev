import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import Img from '../components/Img'
import SEO from '../components/SEO'

const AboutPageStyles = styled.div`
  color: var(--color);
`

function AboutPage({ data }) {
  const { setemi } = data
  return (
    <AboutPageStyles>
      <SEO title="About Me" location />
      <Bio footer />
      <h2>About Me 👨 </h2>
      <p>
        I'm Oluwasetemi 🇳🇬, It is pronounced SE + TE(Not TI) + ME. Most people call me Ojo. Other variant of my name is
        Temi or Setemi or Stephen. Address me with anyone that is easy for you.
      </p>

      <p>
        I'm a web developer, passionate about the stuffs I build
        from Nigeria 🇳🇬 who love to work with JavaScript, Typescript Reactjs, Nodejs and
        GraphQL. I prefer to solve problems.
      </p>

      <p>
        <span className="mark">
          I have keen interest in roles around Frontend Engineering, Backend
          Engineering, Developer Education, Developer Relations or Developer
          Experience and any Full-Stack roles.
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
        teaching.You can checkout my portfolios here.
      </p>

      <h3>More on Family</h3>
      <p>
        I am the second of 6 children out of which Adeola and Temi are my step siblings and the first male in the lineage, both
        parent are late (Blessed memory). Mum died first year in university and
        Dad died while I was serving Nigeria (country of birth) in Benue(Food
        basket of the nation) 2017.{' '}
      </p>

      <p>
        I am in love 😍 with Ajayi Temidayo Abosede. She is a gift from God.
      </p>

      <h3>More on Technical Experience</h3>
      <p>
        I write anything related to JavaScript and Typescript confidently. I have good experience
        with C# and Python (Flask, Django). I have written a little bit of C and
        C++ (not near production experience trust me).
      </p>
      <p>
        I have fierce interest in React and GraphQL and related technologies
        like Gatsbyjs (the technology I use to build this piece), Nextjs,
        Prisma, Keystone, CMS - Contentful, Sanity, . For more technical details
        like uses, fonts, setup and dotfiles <Link to="/uses">check here</Link>.
      </p>
      <h3>More about Location</h3>
      <p>
        Currently live in the beautiful city of Osogbo, grew up in Ibadan ,
        Worked 1 year in Lagos, Abuja is my second home and{' '}
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
    setemi: file(relativePath: { eq: "setemi.jpg" }) {
      childImageSharp {
        gatsbyImageData(transformOptions: { fit: CONTAIN }, layout: FULL_WIDTH)
      }
    }
  }
`
