/* eslint-disable no-unused-vars */
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'

dotenv.config({
  path: `.env`,
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const here = (...p) => path.join(__dirname, ...p)

// console.log(process.env.NETLIFY_FUNCTIONS_URL)
const siteUrl = process.env.ROOT_URL || 'https://oluwasetemi.dev'

const config = {
  // developMiddleware: app => {
  //   app.use(
  //     '/.netlify/functions/',
  //     createProxyMiddleware({
  //       target: 'http://localhost:9000',
  //       pathRewrite: {
  //         '/.netlify/functions/': '',
  //       },
  //     }),
  //   )
  // },
  trailingSlash: 'never',
  siteMetadata: {
    title: '{...OOS}',
    titleAlt: 'The personal website of Ojo Oluwasetemi Stephen',
    author: 'Oluwasetemi Ojo Stephen',
    description:
      "I’m a Fullstack Engineer at fluna.co and a Frontend Engineering Instructor at AltSchoolAfrica. I specialize in builting web application with TypeScript, JavaScript, React, and Node.js. You can explore my projects on GitHub and Stackblitz. I have a passion for teaching and sharing insights about web development, helping others learn and grow in this field. Check out my writing for more tips and tutorials.",
    siteUrl: process.env.ROOT_URL || 'https://oluwasetemi.dev/',
    siteLogo: 'static/favicon-32x32.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
    minibio: `
    <strong>Ojo Oluwasetemi Stephen</strong> is a software engineer and
    teacher.
  `,
    pathPrefix: '/',
    // Manifest and Progress color
    themeColor: '#4147DC',
    backgroundColor: '#231C42',
    // socials
    socials: {
      twitter: '@setemiojo',
      codepen: 'setemiojo',
      github: 'Oluwasetemi',
      codesandbox: 'Oluwasetemi',
      linkedIn: 'setemiojo',
      hackerrank: 'setemiojo',
      stackoverflow: '/users/4330745/oluwasetemi',
      stackblitz: '@oluwasetemi',
      youtube: '@setemiojo',
      rss: 'https://oluwasetemi.dev/rss.xml',
    },
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/portfolio`,
        name: 'portfolio',
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
        path: here(`src`, `assets`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`, `.markdown`],
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-copy-linked-files' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            // icon: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>`,
            // enableCustomId: true,
            options: {
              offsetY: '125',
              icon: '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'autolink-headers',
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              // Optional button container class name. Defaults
              // to 'gatsby-code-button-container'.
              // buttonContainerClass: `customButtonContainerClass`,
              // Optional button class name. Defaults to 'gatsby-code-button'.
              // buttonClass: `customButtonClass`,
              // Optional button text. Defaults to ''.
              // buttonText: `customButtonText`,
              // Optional svg icon class name. Defaults to 'gatsby-code-button-icon'.
              // svgIconClass: `customSvgIconClass`,
              // Optional svg icon. Defaults to svg string and can be
              // replaced with any other valid svg. Use custom classes
              // in the svg string and skip `iconClass` option.
              // svgIcon: `customSvgIcon`,
              // Optional tooltip text. Defaults to ''.
              tooltipText: `copy code`,
              // Optional toaster class name. Defaults to ''.
              // toasterClass: `customToasterClass`,
              // Optional toaster text class name. Defaults to ''.
              // toasterTextClass: `customToasterTextClass`,
              // Optional toaster text. Defaults to ''.
              toasterText: 'code copied',
              // Optional toaster duration. Defaults to 3500.
              toasterDuration: 5000,
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              // customTransformers: [eggheadTransformer],
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-smartypants',
        ],

      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130441994-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                siteLogo
              }
            }
          }
        `,
        feeds: [
          getBlogFeed({
            filePathRegex: `content/blog/`,
            blogUrl: siteUrl,
            output: '/rss.xml',
            title: 'Oluwasetemi Ojo Stephen RSS Feed',
          }),
        ],
      },
    },
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
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links',
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: '#800080',
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => process.env.CONTEXT,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: ['https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        web: [
          {
            name: 'IBM Plex Mono',
            file: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
          },
          {
            name: 'Lato',
            file: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap',
          },
        ],
      }
    }
  ],
}

export default config

function getBlogFeed({ filePathRegex, blogUrl, ...overrides }) {
  /**
   * These RSS feeds can be quite expensive to generate. Limiting the number of
   * posts and keeping each item's template lightweight (only using frontmatter,
   * avoiding the html/excerpt fields) helps negate this.
   */
  return {
    serialize: ({ query: { allMdx } }) => {
      const stripSlash = slug => (slug.startsWith('/') ? slug.slice(1) : slug)
      return allMdx.edges.map(edge => {
        const url = `${siteUrl}/${stripSlash(edge.node.fields.slug)}`

        return {
          ...edge.node.frontmatter,
          date: edge.node.frontmatter.date,
          url,
          guid: url,
          custom_elements: [{ 'content:encoded': edge.node.body }],
        }
      })
    },
    query: `
       {
         allMdx(
           limit: 25,
           filter: {
             frontmatter: {isPublished: {ne: false}}
             internal: { contentFilePath: {regex: "${filePathRegex}"}}
           },
           sort: {frontmatter: {date: DESC}}
         ) {
           edges {
             node {
             body
              excerpt
               fields {
                 slug
               }
               frontmatter {
                 date
                 title
                 description
               }
             }
           }
         }
       }
     `,
    ...overrides,
  }
}
