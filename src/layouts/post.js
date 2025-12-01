import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import styled from "styled-components"

import SEO from "../components/Seo"
import { pagesExcludeFromPagination } from "../constants"
import Comment from "../components/Comment"
import Divider from "../components/Divider"
import Spacer from "../components/Spacer"
import { Carousel } from "../components/Carousel"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import { Display, Body, Caption, Code, Pre } from "../components/Typography"
import PremiumHero from "../components/PremiumHero"
import ScrollReveal from "../components/ScrollReveal"
import FloatingLabel from "../components/FloatingLabel"
import PremiumSeparator from "../components/PremiumSeparator"
import { tokens } from "../theme/tokens"

const components = {
  Divider,
  Spacer,
  Carousel,
  code: Code,
  pre: Pre,
}

// Article Layout
const ArticleWrapper = styled.article`
  max-width: ${tokens.maxWidth.prose};
  margin: 0 auto;
  padding: ${tokens.spacing['5xl']} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing['3xl']} 0;
  }
`

const ArticleHeader = styled.header`
  text-align: center;
  margin-bottom: ${tokens.spacing['4xl']};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    margin-bottom: ${tokens.spacing['3xl']};
  }
`

const ArticleTitle = styled(Display)`
  margin-bottom: ${tokens.spacing.lg};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['5xl']};
  }
`

const ArticleDate = styled(Caption)`
  display: block;
  margin-top: ${tokens.spacing.lg};
`

// Removed ArticleDivider - using PremiumSeparator instead

const ArticleContent = styled.div`
  /* Premium Typography System for MDX content */
  
  h2 {
    font-family: ${tokens.typography.fontFamily.display};
    font-size: ${tokens.typography.fontSize.h2};
    font-weight: ${tokens.typography.fontWeight.bold};
    line-height: ${tokens.typography.lineHeight.h2};
    letter-spacing: ${tokens.typography.letterSpacing.tighter};
    color: ${tokens.colors.textPrimary};
    margin: ${tokens.spacing['section-sm']} 0 ${tokens.spacing['group-md']} 0;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      font-size: ${tokens.typography.fontSize.h3};
      margin: ${tokens.spacing['3xl']} 0 ${tokens.spacing['group-sm']} 0;
    }
  }
  
  h3 {
    font-family: ${tokens.typography.fontFamily.display};
    font-size: ${tokens.typography.fontSize.h3};
    font-weight: ${tokens.typography.fontWeight.semibold};
    line-height: ${tokens.typography.lineHeight.h3};
    letter-spacing: ${tokens.typography.letterSpacing.tight};
    color: ${tokens.colors.textPrimary};
    margin: ${tokens.spacing['4xl']} 0 ${tokens.spacing['group-sm']} 0;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      font-size: ${tokens.typography.fontSize.h4};
      margin: ${tokens.spacing['3xl']} 0 ${tokens.spacing.lg} 0;
    }
  }
  
  h4 {
    font-family: ${tokens.typography.fontFamily.display};
    font-size: ${tokens.typography.fontSize.h4};
    font-weight: ${tokens.typography.fontWeight.semibold};
    line-height: ${tokens.typography.lineHeight.h4};
    color: ${tokens.colors.textPrimary};
    margin: ${tokens.spacing['3xl']} 0 ${tokens.spacing.lg} 0;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      font-size: ${tokens.typography.fontSize.h5};
      margin: ${tokens.spacing['2xl']} 0 ${tokens.spacing.md} 0;
    }
  }
  
  p {
    font-family: ${tokens.typography.fontFamily.sans};
    font-size: ${tokens.typography.fontSize['body-lg']};
    font-weight: ${tokens.typography.fontWeight.regular};
    line-height: ${tokens.typography.lineHeight['body-lg']};
    color: ${tokens.colors.textPrimary};
    margin-bottom: 1.2em;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      font-size: ${tokens.typography.fontSize['body-md']};
      line-height: ${tokens.typography.lineHeight['body-md']};
    }
  }
  
  a {
    color: ${tokens.colors.brandPurple};
    text-decoration: none;
    border-bottom: 1px solid ${tokens.colors.brandPurpleLight};
    transition: all ${tokens.transitions.fast};
    
    &:hover {
      color: ${tokens.colors.brandPurpleDark};
      border-bottom-color: ${tokens.colors.brandPurpleDark};
    }
  }
  
  strong {
    font-weight: ${tokens.typography.fontWeight.semibold};
  }
  
  em {
    font-style: italic;
  }
  
  ul, ol {
    margin: ${tokens.spacing.xl} 0;
    padding-left: ${tokens.spacing['2xl']};
    
    li {
      font-size: ${tokens.typography.fontSize.lg};
      line-height: ${tokens.typography.lineHeight.loose};
      margin: ${tokens.spacing.md} 0;
      
      @media (max-width: ${tokens.breakpoints.md}) {
        font-size: ${tokens.typography.fontSize.base};
      }
    }
  }
  
  blockquote {
    border-left: 4px solid ${tokens.colors.brandPurple};
    padding: ${tokens.spacing.lg} ${tokens.spacing.xl};
    margin: ${tokens.spacing['2xl']} 0;
    background: ${tokens.colors.bgSecondary};
    border-radius: ${tokens.radius.md};
    
    p {
      margin: 0;
      color: ${tokens.colors.textSecondary};
    }
  }
  
  img, figure {
    width: 100%;
    margin: ${tokens.spacing['3xl']} 0;
    border-radius: ${tokens.radius.lg};
    box-shadow: ${tokens.shadows.md};
  }
  
  hr {
    border: none;
    height: 1px;
    background: ${tokens.colors.borderLight};
    margin: ${tokens.spacing['4xl']} 0;
  }
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${tokens.maxWidth.article};
  margin: ${tokens.spacing['4xl']} auto 0;
  padding: ${tokens.spacing['2xl']} 0;
  border-top: 1px solid ${tokens.colors.borderLight};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
    gap: ${tokens.spacing.lg};
    text-align: center;
  }
`

const NavLink = styled(Link)`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.textPrimary};
  text-decoration: none;
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  border-radius: ${tokens.radius.md};
  transition: all ${tokens.transitions.base};
  
  &:hover {
    background: ${tokens.colors.bgSecondary};
    color: ${tokens.colors.brandPurple};
  }
`

const HomeLink = styled(Link)`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.brandPurple};
  text-decoration: none;
  padding: ${tokens.spacing.md} ${tokens.spacing.xl};
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.bgSecondary};
  transition: all ${tokens.transitions.base};
  
  &:hover {
    background: ${tokens.colors.brandPurple};
    color: ${tokens.colors.bgPrimary};
  }
`

const PostTemplate = ({ data, pageContext }) => {
  const { mdx, avatar } = data
  const { frontmatter, body, slug } = mdx
  const { next, prev } = pageContext
  
  // Check if this is a project page (projects are in /content/projects/)
  const isProject = slug.includes('properties') || 
                    slug.includes('spitogatos') || 
                    slug.includes('e-bike') ||
                    slug.includes('ebike') ||
                    slug.includes('tunedai') ||
                    slug.includes('takecar') ||
                    slug.includes('thermo') ||
                    slug.includes('mvp-design') ||
                    slug.includes('calculator')
  
  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        cannonical={frontmatter.cannonical}
        preview={avatar.publicURL}
      />
      
      {isProject && (
        <PremiumHero 
          title={frontmatter.title}
          description={frontmatter.description}
          status={frontmatter.status}
        />
      )}
      
      <Container size="prose">
        <ArticleWrapper>
          {!isProject && (
            <>
              <ScrollReveal direction="up">
                <ArticleHeader>
                  <ArticleTitle>{frontmatter.title}</ArticleTitle>
                  <ArticleDate uppercase semibold>
                    {frontmatter.date}
                  </ArticleDate>
                </ArticleHeader>
              </ScrollReveal>
              
              <PremiumSeparator variant="gradient" spacing="lg" centered width="80px" showDot />
            </>
          )}
          
          {isProject && (
            <ScrollReveal direction="up" delay={300}>
              <div style={{ marginTop: tokens.spacing['3xl'], marginBottom: tokens.spacing.xl }}>
                <FloatingLabel icon="📖">Project Details</FloatingLabel>
              </div>
            </ScrollReveal>
          )}
          
          <ArticleContent>
            <MDXProvider components={components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          </ArticleContent>
        </ArticleWrapper>
        
        <PremiumSeparator variant="gradient" spacing="xl" animated />
        
        <Navigation>
          {prev ? (
            <NavLink to={`/${prev.slug}`} title={prev.frontmatter.title}>
              ← Previous
            </NavLink>
          ) : (
            <div />
          )}
          
          <HomeLink to="/" title="Back Home">
            Home
          </HomeLink>
          
          {next ? (
            <NavLink to={`/${next.slug}`} title={next.frontmatter.title}>
              Next →
            </NavLink>
          ) : (
            <div />
          )}
        </Navigation>
        
        {!pagesExcludeFromPagination.includes(slug) && (
          <div style={{ marginTop: tokens.spacing['4xl'] }}>
            <Comment
              repo="termoxin/my-blog-comments"
              issueTerm="og:title"
              theme="github-light"
              crossOrigin="anonymous"
            />
          </div>
        )}
      </Container>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    avatar: file(relativePath: { eq: "avatar.jpeg" }) {
      publicURL
    }

    mdx(slug: { eq: $slug }) {
      id
      frontmatter {
        description
        title
        cannonical
        status
        date(formatString: "MMMM DD, YYYY")
      }
      body
      slug
    }
  }
`
