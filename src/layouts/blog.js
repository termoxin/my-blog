import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"

import SEO from "../components/Seo"
import Pagination from "../components/Pagination"
import PremiumShowcaseCard from "../components/PremiumShowcaseCard"
import BlogCard from "../components/BlogCard"
import { Container } from "../components/Container"
import { Section } from "../components/Section"
import ScrollReveal from "../components/ScrollReveal"
import FloatingLabel from "../components/FloatingLabel"
import PremiumSeparator from "../components/PremiumSeparator"
import AnimatedBlobs from "../components/AnimatedBlobs"
import { tokens } from "../theme/tokens"

import { groupBy, getDateYear } from "../utils"

const PageContainer = styled.div`
  position: relative;
  background: ${tokens.colors.bgPrimary};
`

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing['section-lg']} 0;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(250, 250, 252, 1) 100%
  );
  
  /* Ambient shadow */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.03);
    pointer-events: none;
    z-index: 1;
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    min-height: 50vh;
    padding: ${tokens.spacing['section-md']} 0;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: ${tokens.zIndex.base + 2};
  text-align: center;
  max-width: ${tokens.maxWidth.content};
  margin: 0 auto;
  padding: 0 ${tokens.spacing.xl};
`

const HeroTitle = styled(motion.h1)`
  font-family: ${tokens.typography.fontFamily.display};
  font-size: clamp(${tokens.typography.fontSize.h3}, 8vw, 90px);
  font-weight: ${tokens.typography.fontWeight.black};
  line-height: ${tokens.typography.lineHeight.h1};
  letter-spacing: -0.04em;
  color: ${tokens.colors.textPrimary};
  margin: 0 0 ${tokens.spacing['group-md']} 0;
  font-feature-settings: 'kern' 1, 'liga' 1, 'ss01' 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  
  background: linear-gradient(
    135deg,
    ${tokens.colors.textPrimary} 0%,
    ${tokens.colors.textSecondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Soft text shadow glow */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
`

const HeroSubtitle = styled(motion.p)`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: clamp(${tokens.typography.fontSize['body-md']}, 2.5vw, 22px);
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight['body-lg']};
  color: ${tokens.colors.textSecondary};
  margin: 0 auto;
  max-width: ${tokens.maxWidth.prose};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['section-md']};
  margin: ${tokens.spacing['section-md']} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    gap: ${tokens.spacing['section-sm']};
    margin: ${tokens.spacing['section-sm']} 0;
  }
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: ${tokens.spacing['group-lg']};
  margin: ${tokens.spacing['group-lg']} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${tokens.spacing['group-md']};
  }
`

const YearSection = styled.div`
  margin: ${tokens.spacing['section-sm']} 0;
  
  &:first-child {
    margin-top: 0;
  }
`

const IndexPage = ({ data, pageContext }) => {
  const blogPosts = data.allBlogMdx.edges
  const projectPosts = data.allProjectMdx.edges

  // Filter out about page from blog posts
  const regularBlogPosts = blogPosts.filter(post => post.node.frontmatter.title !== "About")

  const blogPostsContainer = groupBy(regularBlogPosts, getDateYear)
    .map(({ year, posts }, i) => (
      <YearSection key={i}>
        <ScrollReveal direction="up" delay={i * 100}>
          <FloatingLabel icon="📅">{year}</FloatingLabel>
        </ScrollReveal>
        <BlogGrid>
          {posts.map((post, index) => (
            <ScrollReveal 
              key={post.node.id} 
              direction="up" 
              delay={(i * 100) + (index * 50)}
            >
              <BlogCard
                title={post.node.frontmatter.title}
                description={post.node.frontmatter.description}
                cover={post.node.frontmatter.cover}
                date={post.node.frontmatter.date}
                status={post.node.frontmatter.status}
                slug={post.node.slug}
              />
            </ScrollReveal>
          ))}
        </BlogGrid>
        {i < blogPostsContainer.length - 1 && (
          <PremiumSeparator variant="gradient" spacing="xl" animated />
        )}
      </YearSection>
    ))
    .reverse()

  const projectList = projectPosts
    .filter(post => !post.node.frontmatter.title.toLowerCase().includes('hellenistic') && 
                    !post.node.frontmatter.title.toLowerCase().includes('greek learning'))
    .map((post, index) => {
      // Cycle through matte gradients
      const gradients = [
        tokens.gradients.matte1,
        tokens.gradients.matte2,
        tokens.gradients.matte3,
        tokens.gradients.matte4,
        tokens.gradients.matte5,
      ]
      const gradient = gradients[index % gradients.length]
      
      return (
        <ScrollReveal key={post.node.id} direction="scale" delay={index * 150}>
          <PremiumShowcaseCard
            title={post.node.frontmatter.title}
            description={post.node.frontmatter.description}
            cover={post.node.frontmatter.cover}
            status={post.node.frontmatter.status}
            slug={post.node.slug}
            gradient={gradient}
            delay={`${index * 0.15}s`}
          />
        </ScrollReveal>
      )
    })

  const { previousPagePath, nextPagePath } = pageContext

  return (
    <PageContainer>
      <SEO title="Home" />
      
      {/* Hero Section */}
      <HeroSection>
        <AnimatedBlobs />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100 
            }}
          >
            Rostyslav Futornyi
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.35,
              type: "spring",
              stiffness: 100 
            }}
          >
            Product designer & engineer building experiences that matter
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <Container size="content">
        {!!projectList.length && (
          <Section spacing="xl">
            <ScrollReveal direction="up">
              <FloatingLabel icon="🚀">Featured Projects</FloatingLabel>
            </ScrollReveal>
            <ProjectGrid>{projectList}</ProjectGrid>
            <PremiumSeparator variant="glow" spacing="xl" showDot animated />
          </Section>
        )}
        
        {!!regularBlogPosts.length && (
          <Section spacing="xl">
            <ScrollReveal direction="up">
              <FloatingLabel icon="✍️">Writing</FloatingLabel>
            </ScrollReveal>
            {blogPostsContainer}
          </Section>
        )}
        
        <Pagination
          previousPagePath={previousPagePath}
          nextPagePath={nextPagePath}
        />
      </Container>
    </PageContainer>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ($pagesExcludeFromPagination: [String!], $skip: Int!, $limit: Int!) {
    allBlogMdx: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { 
        slug: { nin: $pagesExcludeFromPagination }
        fileAbsolutePath: { regex: "/content/blog/" }
      }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            description
            cover
            status
            date(formatString: "MMMM DD, YY")
          }
        }
      }
    }
    allProjectMdx: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { 
        fileAbsolutePath: { regex: "/content/projects/" }
      }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            description
            cover
            status
            date(formatString: "MMMM DD, YY")
          }
        }
      }
    }
  }
`
