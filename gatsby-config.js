module.exports = {
  siteMetadata: {
    title: '{...OOS}',
    author: 'Oluwasetemi Stephen Ojo',
    description:
      'I write about modern JavaScript, web development, computer science and opinions are mine. I love teaching. Send me a DM if you want to learn web development🚀',
    siteUrl: 'https://oluwasetemi.dev/',
    social: {
      twitter: '@setemiojo',
      codepen: 'setemiojo',
      github: 'Oluwasetemi',
      linkedIn: 'setemiojo',
      hackerrank: 'setemiojo',
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
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `{..OOS}`,
        short_name: `OOS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#800080`,
        display: `minimal-ui`,
        icon: `src/assets/apple-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
