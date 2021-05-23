import React from "react"
import { Link, graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"

import SEO from "../components/Seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

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
          <Link className="prev" to={prev.slug} title={prev.frontmatter.title}>
            &lt;&lt;
          </Link>
        )}{" "}
        <Link to="/" className="home" className="home" title="Back Home">
          {" "}
          Home
        </Link>{" "}
        {next && (
          <Link className="next" to={next.slug} title={next.frontmatter.title}>
            &gt;&gt;
          </Link>
        )}
      </div>
      <Disqus
        config={{
          url: `${siteUrl}/${slug}`,
          identifier: id,
          title: frontmatter.title,
        }}
      />
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
