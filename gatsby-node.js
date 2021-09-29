import { zipFunctions } from '@netlify/zip-it-and-ship-it'
import { spawnSync } from 'child_process'
import fs from 'fs'
import { createFilePath } from 'gatsby-source-filesystem'
import path from 'path'
import rimraf from 'rimraf'
import blogUtils from './other/blog-utils'

async function turnBlogIntoPages({graphql, actions}) {
  try {
    const {createPage} = actions
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const {data} = await graphql(
      `
        {
          allMdx(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 1000
            filter: {
              frontmatter: {isPublished: {eq: true}}
              fileAbsolutePath: {regex: "//content/blog//"}
            }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `,
    )
    // Create blog posts pages.
    const posts = data.allMdx.edges
    // require('util').inspect.defaultOptions.depth = null

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  } catch (error) {
    // console.log(error.message)
    throw new Error(`error while creating blogpost ${error.message}`)
  }
}

async function turnPortfolioIntoPages({graphql, actions}) {
  try {
    const {createPage} = actions
    const portfolio = path.resolve('./src/templates/portfolio.js')
    const {data} = await graphql(
      `
        {
          allMdx(
            sort: {fields: [frontmatter___publishedDate], order: DESC}
            limit: 1000
            filter: {
              frontmatter: {isPublished: {eq: true}}
              fileAbsolutePath: {regex: "//content/portfolio//"}
            }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  slug
                  description
                }
              }
            }
          }
        }
      `,
    )
    // Create blog posts pages.
    const posts = data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `portfolio/${post.node.frontmatter.slug}`,
        component: portfolio,
        context: {
          slug: post.node.frontmatter.slug,
          previous,
          next,
        },
      })
    })
  } catch (error) {
    // console.log(error.message)
    throw new Error(`error while creating portfolio ${error.message}`)
  }
}

async function turnTagsIntoPages({graphql, actions}) {
  try {
    // fetch data using graphQL to get all the data to create the allTags Object
    const {createPage} = actions
    const tagsPage = path.resolve('./src/pages/tags.js')
    const {data} = await graphql(
      `
        {
          allMdx(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 1000
            filter: {
              frontmatter: {isPublished: {eq: true}}
              fileAbsolutePath: {regex: "//content/blog//"}
            }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                }
              }
            }
          }
        }
      `,
    )
    // Create blog posts pages.
    const posts = data.allMdx.edges

    const tagsArrays = []
    for (const each of posts) {
      const {tags} = each.node.frontmatter
      tagsArrays.push(...tags)
    }
    const tagsArraysUnique = Array.from(new Set(tagsArrays))

    // loop true the data and create the tags page
    tagsArraysUnique.forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: tagsPage,
        context: {
          tag,
          tagsRegex: `/${tag}/i`,
        },
      })
    })
  } catch (error) {
    // console.log(error.message)
    throw new Error(`error while creating tags ${error.message}`)
  }
}

export const createPages = async params => {
  // console.log('creating new page')

  // create pages dynamically
  await Promise.all([
    // 1. blogpost
    turnBlogIntoPages(params),
    // 2. tags
    turnTagsIntoPages(params),
    // 3.portfolio
    turnPortfolioIntoPages(params),
  ])
}

export const onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

export const onCreateNode = ({node, actions, getNode}) => {
  // console.log('creating node from markdown files')
  const {createNodeField} = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const onPostBuild = async ({graphql}) => {
  if (process.env.gatsby_executing_command === 'develop') {
    return
  }
  require('./other/make-cache')
  blogUtils.createJSONFile(graphql, './public/blog.json')
  const srcLocation = path.join(__dirname, `netlify/functions`)
  const outputLocation = path.join(__dirname, `public/functions`)
  if (fs.existsSync(outputLocation)) {
    rimraf.sync(outputLocation)
  }
  fs.mkdirSync(outputLocation)
  await zipFunctions(srcLocation, outputLocation)
  // can't run cypress on gatsby cloud currently
  if (!process.env.SKIP_BUILD_VALIDATION && !process.env.GATSBY_CLOUD) {
    const result = spawnSync('npm run test:e2e', {
      stdio: 'inherit',
      shell: true,
    })
    // console.log('here')
    if (result.status !== 0) {
      throw new Error(`post build failure. Status: ${result.status}`)
    }
  }
}
