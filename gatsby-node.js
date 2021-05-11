// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
            }
            id
          }
        }
      }
    }
  `)

  // Create paginated pages for posts

  const POSTS_PER_PAGE = 3

  const numPages = Math.ceil(data.allMdx.edges.length / POSTS_PER_PAGE)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? "/" : `/${i + 1}`,
      component: require.resolve("./src/templates/allPosts.js"),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create single blog posts

  // data.allMdx.edges.forEach(edge => {
  //   const slug = edge.node.frontmatter.slug
  //   const id = edge.node.id

  //   actions.createPages({
  //     path: slug,
  //     component: require.resolve("./src/templates/singlePost.js"),
  //     context: { id },
  //   })
  // })
}
