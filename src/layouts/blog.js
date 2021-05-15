import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/Seo"
import Pagination from "../components/Pagination"

import { groupBy, getDateYear } from "../utils"

const IndexPage = ({ data, pageContext }) => {
  // all posts without dates are assumed to be drafts or pages
  // not to be added to postsList

  const posts = data.allMdx.edges

  const postsList = posts =>
    posts.map(post => (
      <li key={post.node.id}>
        <div className="post-date code">
          <small>{post.node.frontmatter.date}</small>
        </div>
        <div className="title">
          <Link to={post.node.slug}>{post.node.frontmatter.title}</Link>
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
  query ($pagesExcludeFromPagination: [String!], $skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { slug: { nin: $pagesExcludeFromPagination } }
      skip: $skip
      limit: $limit
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
`
