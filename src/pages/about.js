import { graphql, Link } from 'gatsby'
import React from 'react'
import Bio from '../components/Bio'
import Img from '../components/Img'
import SEO from '../components/SEO'

function AboutPage({ data }) {
  const { setemi } = data
  return (
    <>
      <SEO title="About Me" location />
      <Bio />
      <h2>About Me 👨 WIP</h2>
      <p>I am Oluwasetemi 🇳🇬</p>

      <p>
        I'm a web developer, teacher from Nigeria 🇳🇬, I love to work with
        JavaScript, Reactjs, Nodejs and GraphQL.
      </p>

      <p>
        I teach programming and web development related courses to entry level
        developers and anyone who is learning software development. I focus on
        all the stuffs that will make the difference and make learning fun. I
        have a special way of making complex concept simple and easy to grasp.{' '}
        <span className="mark">
          I really have keen interest in roles around Developer Educator,
          Developer Advocate or Developer Experience. Any Full-Stack roles.
        </span>
      </p>

      <Img image={setemi} alt="oluwasetemi" />

      <p>
        I took time to learn JavaScript while I finished from university, I
        wrote about this in a blog,{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.oluwasetemi.dev/story-part-1/"
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
        I am the second of 6 children and the first male in the lineage both
        parent are late (Blessed memory). Mum died first year in university and
        Dad died while I was serving Nigeria (country of birth) in Benue(Food
        basket of the nation) 2017. I have 2 step siblings, Lovely Girls (Temi
        and Adeola).{' '}
      </p>

      <p>
        I am in love 😍 with Ajayi Temidayo Abosede. She is a gift from God.
      </p>

      <h3>More on Technical Experience</h3>
      <p>
        I write anything related to JavaScript fluently. I have good experience
        with C# and Python (Flask). I have write a little bit of C and C++ (not
        near production experience trust me).
      </p>
      <p>
        I have fierce interest in React and GraphQL and related technologies
        like Gatsbyjs (the technology I use to build this piece), Nextjs,
        Prisma, Redwood, Hasura, CMS - Contentful, Sanity, . For more technical
        details like uses, fonts, setup and dotfiles{' '}
        <Link to="/uses">check here</Link>.
      </p>
      <h3>More about Location</h3>
      <p>
        Currently live in the beautify suburb of Osogbo, grew up in Ibadan ,
        Worked 1 year in Lagos, My late dad has a house in Abuja our second home
        and NYSC Service took me to Benue State.I love travelling and exploring
        new cultures.
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
      <p>
        <Link to="/appearance">Appearance</Link> - Podcasts/interviews/etc that
        I've appeared on.
      </p>
      <p>
        <Link to="/info">info</Link> - Bio, Photo, how to spell and pronounce my
        name.
      </p>
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
    </>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    setemi: file(relativePath: { eq: "setemi.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, maxHeight: 500, cropFocus: CENTER, fit: FILL) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
