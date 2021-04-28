const path = require('path')

module.exports = {
  siteMetadata: {
    title: '{...OOS}',
    author: 'Oluwasetemi Stephen Ojo',
    description:
      'I write about modern JavaScript, web development, computer science and opinions are mine. I love teaching. Send me a DM if you want to learn web development🚀',
    siteUrl: 'https://oluwasetemi.dev/',
    socials: {
      twitter: '@setemiojo',
      codepen: 'setemiojo',
      github: 'Oluwasetemi',
      codesandbox: 'Oluwasetemi',
      linkedIn: 'setemiojo',
      hackerrank: 'setemiojo',
      stackoverflow: '/users/4330745/oluwasetemi',
    },
  },
  // pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `images`),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130441994-1`,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: true, // optional parameter to include script in development
        id: 2374821,
        sv: 6,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `{..OOS}`,
        short_name: `OOS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#800080`,
        display: `standalone`,
        icon: `src/assets/images/apple-touch-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
  ],
}
