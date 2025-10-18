import React from "react"
import { Link, graphql } from "gatsby"
import styled, { keyframes } from "styled-components"

import SEO from "../components/Seo"
import Pagination from "../components/Pagination"

import { groupBy, getDateYear } from "../utils"

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const CardWrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%;

  &:hover {
    transform: scale(1.05);
  }
`

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
`

const Content = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 14px;
  color: #555;
`

const DateWrapper = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`

const StatusCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  box-shadow: 0 0 8px currentColor;
  animation: ${pulse} 2s ease-in-out infinite;
`

const StatusText = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin: 48px 0 64px;
  max-width: 900px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`

const ProjectCard = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  box-shadow: 
    0 4px 24px -8px rgba(0, 0, 0, 0.12),
    0 20px 48px -12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  height: 450px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.05) 40%,
      rgba(0, 0, 0, 0.8) 100%
    );
    opacity: 1;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-16px) scale(1.02);
    box-shadow: 
      0 8px 32px -8px rgba(0, 0, 0, 0.18),
      0 32px 80px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.24);
      
    &::before {
      opacity: 0.4;
    }
  }
`

const ProjectCoverImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.cover});
  background-size: cover;
  background-position: center;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  filter: brightness(1);
  
  ${ProjectCard}:hover & {
    transform: scale(1.12);
    filter: brightness(1.1);
  }
`

const ProjectEmojiOnly = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: 9rem;
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${ProjectCard}:hover & {
    transform: scale(1.15) rotate(8deg);
    filter: brightness(1.1);
  }
`

const ProjectContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  z-index: 2;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${ProjectCard}:hover & {
    padding-bottom: 36px;
  }
`

const ProjectEmoji = styled.div`
  font-size: 3.5rem;
  margin-bottom: 16px;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${ProjectCard}:hover & {
    transform: scale(1.25) rotate(-8deg) translateY(-4px);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  }
`

const ProjectTitle = styled.h3`
  font-size: 22px;
  font-weight: 800;
  padding: 0;
  margin: 0 0 16px 0;
  text-align: left;
  line-height: 1.2;
  color: #ffffff;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: -0.02em;
  
  ${ProjectCard}:hover & {
    transform: translateY(-6px);
    text-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
    letter-spacing: -0.03em;
  }
`

const ProjectStatusContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  ${ProjectCard}:hover & {
    transform: scale(1.08) translateY(-2px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.18),
      0 12px 40px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`

const extractEmojiAndTitle = (title) => {
  return {
    emoji: title.split(' ')[0],
    title: title.substring(title.indexOf(' ') + 1)
  };
}

const ProjectStatus = ({ status }) => {
  let circleColor
  switch (status) {
    case "Failed":
      circleColor = "#ff8080" // Lighter shade of red
      break
    case "Worked, keep going":
      circleColor = "#b3ffb3" // Light greenish-blue
      break
    case "In Progress":
      circleColor = "#ffe680" // Lighter shade of yellow
      break
    case "Successful":
      circleColor = "#80ff80" // Lighter shade of green
      break
    default:
      circleColor = "#e0e0e0" // Light gray
      break
  }

  return (
    <ProjectStatusContainer>
      <StatusCircle style={{ backgroundColor: circleColor }} />
      <StatusText>{status}</StatusText>
    </ProjectStatusContainer>
  )
}

const Status = ({ status }) => {
  let circleColor
  switch (status) {
    case "Failed":
      circleColor = "#ff8080" // Lighter shade of red
      break
    case "Worked, keep going":
      circleColor = "#b3ffb3" // Light greenish-blue
      break
    case "In Progress":
      circleColor = "#ffe680" // Lighter shade of yellow
      break
    case "Successful":
      circleColor = "#80ff80" // Lighter shade of green
      break
    default:
      circleColor = "#e0e0e0" // Light gray
      break
  }

  return (
    <StatusContainer>
      <StatusCircle style={{ backgroundColor: circleColor }} />
      <StatusText>{status}</StatusText>
    </StatusContainer>
  )
}

const AnimatedCard = ({ imageSrc, title, description, date, url, status }) => {
  return (
    <CardWrapper>
      {imageSrc && <Image src={imageSrc} alt="Image" />}
      <Content>
        <Link to={url}>
          <Title>{title}</Title>
        </Link>
        <Description>{description}</Description>
        <Container>
          <DateWrapper>{date}</DateWrapper>
          <Status status={status} />
        </Container>
      </Content>
    </CardWrapper>
  )
}

const IndexPage = ({ data, pageContext }) => {
  const blogPosts = data.allBlogMdx.edges
  const projectPosts = data.allProjectMdx.edges

  // Filter out about page from blog posts
  const aboutPost = blogPosts.find(post => post.node.frontmatter.title === "About")
  const regularBlogPosts = blogPosts.filter(post => post.node.frontmatter.title !== "About")

  const postsList = posts =>
    posts.map(post => (
      <AnimatedCard
        key={post.node.id}
        imageSrc={post.node.frontmatter.cover}
        date={post.node.frontmatter.date}
        description={post.node.frontmatter.description}
        title={post.node.frontmatter.title}
        url={`/${post.node.slug}`}
        status={post.node.frontmatter.status}
      />
    ))

  const blogPostsContainer = groupBy(regularBlogPosts, getDateYear)
    .map(({ year, posts }, i) => (
      <div style={{ gap: 30, display: 'flex', flexDirection: 'column' }} key={i}>
        <h2 className="code" style={{ margin: "40px 0" }}>
          {year}
        </h2>
        {postsList(posts)}
      </div>
    ))
    .reverse()

  const projectList = projectPosts
    .filter(post => !post.node.frontmatter.title.toLowerCase().includes('hellenistic') && 
                    !post.node.frontmatter.title.toLowerCase().includes('greek learning'))
    .map((post, index) => {
      const { emoji, title } = extractEmojiAndTitle(post.node.frontmatter.title);
      const animationDelay = `${index * 0.15}s`;
      const coverImage = post.node.frontmatter.cover || '/covers/default.jpg';
      const isRealEstate = title.toLowerCase().includes('real estate, may it work');
      
      return <Link to={`/${post.node.slug}`} key={post.node.id} style={{ textDecoration: 'none' }}>
        <ProjectCard delay={animationDelay}>
          {isRealEstate ? (
            <ProjectEmojiOnly>{emoji}</ProjectEmojiOnly>
          ) : (
            <ProjectCoverImage cover={coverImage} />
          )}
          <ProjectContent>
            {!isRealEstate && <ProjectEmoji>{emoji}</ProjectEmoji>}
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectStatus status={post.node.frontmatter.status} />
          </ProjectContent>
        </ProjectCard>
      </Link>
    })

  const { previousPagePath, nextPagePath } = pageContext

  const ProjectsHeading = styled.h2`
    opacity: 0;
    animation: ${fadeInUp} 0.6s ease-out forwards;
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 8px;
    margin-top: 40px;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.04em;
    line-height: 1.1;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  `;

  return (
    <>
      <SEO title="Home" />
      <section>
        {!!projectList.length && <div>
          <ProjectsHeading>Projects</ProjectsHeading>
          <ProjectGrid>{projectList}</ProjectGrid>
        </div>}
        <ul>{blogPostsContainer}</ul>
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
