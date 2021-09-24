const fs = require('fs')

async function createJSONFile(graphql, filePath) {
  const queryResult = await graphql(`
    {
      portfolio: allMdx(
        sort: {fields: frontmatter___date, order: DESC}
        filter: {
          frontmatter: {isPublished: {ne: false}}
          fileAbsolutePath: {regex: "//content/portfolio//"}
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
              description
              technology
            }
          }
        }
      }
    }
  `)

  // console.log(queryResult)
  const posts = queryResult.data.portfolio.edges.map(
    edge => edge.node.frontmatter,
  )
  // console.log(posts)

  fs.writeFileSync(`${filePath}`, JSON.stringify(posts))
}

module.exports = {createJSONFile}
