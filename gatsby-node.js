const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")
const { createFilePath } = require("gatsby-source-filesystem")

const { pagesExcludeFromPagination } = require("./src/constants")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`src/layouts/blog.js`)
  const postTemplate = path.resolve(`src/layouts/post.js`)

  const result = await graphql(
    `
      query AllMdxFiles($pagesExcludeFromPagination: [String!]) {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { slug: { nin: $pagesExcludeFromPagination } }
        ) {
          edges {
            node {
              id
              slug
              frontmatter {
                title
                tags
                date(formatString: "MMMM DD, YY")
              }
            }
          }
        }
      }
    `,
    { pagesExcludeFromPagination }
  )

  const posts = result.data.allMdx.edges

  paginate({
    createPage,
    items: posts,
    itemsPerPage: 2,
    itemsPerFirstPage: 3,
    pathPrefix: "/",
    component: blogTemplate,
    context: {
      pagesExcludeFromPagination,
    },
  })

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.slug,
      component: postTemplate,
      context: {
        slug: node.slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })

  createPage({
    path: "about",
    component: postTemplate,
    context: {
      slug: "about",
    },
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
