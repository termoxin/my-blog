const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`src/layouts/blog.js`)
  const postTemplate = path.resolve(`src/layouts/post.js`)

  return graphql(`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YY")
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    paginate({
      createPage,
      items: posts,
      itemsPerPage: 2,
      itemsPerFirstPage: 2,
      pathPrefix: "/",
      component: blogTemplate,
    })

    posts.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
        context: {
          slug: node.fields.slug,
          prev: index === 0 ? null : posts[index - 1].node,
          next: index === posts.length - 1 ? null : posts[index + 1].node,
        },
      })
    })
  })
}

// create the slugs programatically instead of specifying a path in the frontmatter
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
