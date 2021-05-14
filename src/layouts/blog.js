import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/Seo"
import Pagination from "../components/Pagination"

import { groupBy, getDateYear } from "../utils"

const IndexPage = ({ data, pageContext }) => {
  // all posts without dates are assumed to be drafts or pages
  // not to be added to postsList

  const posts = data.allMarkdownRemark.edges.filter(
    p => p.node.frontmatter.date !== null
  )

  const postsList = posts =>
    posts.map(post => (
      <li key={post.node.id}>
        <div className="post-date code">
          <small>{post.node.frontmatter.date}</small>
        </div>
        <div className="title">
          <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
        </div>
      </li>
    ))

  const postsListContainer = groupBy(posts, getDateYear)
    .map(({ year, posts }, i) => (
      <div key={i}>
        <h4 className="code">{year}</h4>
        {postsList(posts)}
      </div>
    ))
    .reverse()

  const { previousPagePath, nextPagePath } = pageContext

  return (
    <>
      <SEO title="Home" />
      <section>
        <ul>{postsListContainer}</ul>
      </section>
      <Pagination
        previousPagePath={previousPagePath}
        nextPagePath={nextPagePath}
      />
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YY")
            title
            tags
          }
        }
      }
    }
  }
`
