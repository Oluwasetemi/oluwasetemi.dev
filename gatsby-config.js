/* eslint-disable no-unused-vars */
const path = require('path')
const {createProxyMiddleware} = require('http-proxy-middleware')

const here = (...p) => path.join(__dirname, ...p)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://oluwasetemi.dev',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
// const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  siteMetadata: {
    title: '{...OOS}',
    titleAlt: 'The personal website of Ojo Oluwasetemi Stephen',
    author: 'Oluwasetemi Ojo Stephen',
    description:
      "I'm a Developer. I make all sort of stuff with Typescript, JavaScript, React, Nodejs. You can find my work on GitHub and CodeSandbox. I enjoy teaching and sharing about the things I build. Check out my writing.I help people learn more about web development.",
    siteUrl: process.env.ROOT_URL || 'https://oluwasetemi.dev/',
    siteLogo: 'static/favicon-32x32.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
    minibio: `
    <strong>Ojo Oluwasetemi Stephen</strong> is a JavaScript software engineer and
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
      // youtube: 'https://www.youtube.com/channel/UCz-BYvuntVRt_VpfR6FKXJw',
      // rss: 'https://kentcdodds.com/blog/rss.xml',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog`,
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
        // defaultLayouts: {
        //   default: here('./src/templates/markdown-page.js'),
        // },
        extensions: [`.mdx`, `.md`, `.markdown`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            // icon: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>`,
            // enableCustomId: true,
          },
          {resolve: 'gatsby-remark-copy-linked-files'},
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
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
    `gatsby-plugin-feed-mdx`,
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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: '#800080',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{userAgent: '*'}],
          },
          'branch-deploy': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
  ],
}
