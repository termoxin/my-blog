import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from "../components/Seo"
import { pagesExcludeFromPagination } from "../constants"
import Comment from "../components/Comment"

const PostTemplate = ({ data, pageContext }) => {
  const { mdx } = data
  const { id, frontmatter, body, slug } = mdx
  const { next, prev, siteUrl } = pageContext

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article>
        <div className="center">
          <h1 className="title">{frontmatter.title}</h1>
          <span className="code">
            <small>{frontmatter.date}</small>
          </span>
        </div>
        <div className="divider" />
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <div className="page-navigation code">
        {prev && (
          <Link
            className="prev"
            to={`/${prev.slug}`}
            title={prev.frontmatter.title}
          >
            &lt;&lt;
          </Link>
        )}{" "}
        <Link to="/" className="home" className="home" title="Back Home">
          {" "}
          Home
        </Link>{" "}
        {next && (
          <Link
            className="next"
            to={`/${next.slug}`}
            title={next.frontmatter.title}
          >
            &gt;&gt;
          </Link>
        )}
        {!pagesExcludeFromPagination.includes(slug) && (
          <Comment
            repo="termoxin/my-blog-comments"
            issueTerm="og:title"
            theme="github-light"
            crossOrigin="anonymous"
          />
        )}
      </div>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(slug: { eq: $slug }) {
      id
      frontmatter {
        description
        title
      }
      body
      slug
    }
  }
`
