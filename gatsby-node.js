import { createFilePath } from 'gatsby-source-filesystem'
import path from 'path'

// Log out information after a build is done
export const onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built! http://localhost:8000`)
}

async function turnBlogIntoPages({ graphql, actions }) {
  try {
    const { createPage } = actions
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const { data } = await graphql(
      `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
            filter: { frontmatter: { isPublished: { eq: true } } }
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
      `
    )
    // Create blog posts pages.
    const posts = data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  } catch (error) {
    console.log(error.message)
    throw new Error(`error while creating blogpost ${error.message}`)
  }
}

async function turnTagsIntoPages({ graphql, actions }) {
  try {
    // fetch data using graphQL to get all the data to create the allTags Object
    // loop true the data and create the tags page
  } catch (error) {
    console.log(error.message)
    throw new Error(`error while creating tags ${error.message}`)
  }
}

export const createPages = async params => {
  console.log('creating new page')

  // create pages dynamically
  await Promise.all([
    // 1. blogpost
    turnBlogIntoPages(params),
    // 2. tags
    turnTagsIntoPages(params),
  ])
}

export const onCreateNode = ({ node, actions, getNode }) => {
  // console.log('creating node from markdown files')
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
