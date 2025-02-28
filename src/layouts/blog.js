import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/Seo"
import Pagination from "../components/Pagination"

import { groupBy, getDateYear } from "../utils"

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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`

const StatusText = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
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

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin: 40px 0;
`

const CalculatorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100px;
  width: 150px;
`

const CalculatorEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`

const CalculatorTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  margin: 0;
`

const extractEmojiAndTitle = (title)=> {
  return {
      emoji: title.split(' ')[0],
      title: title.substring(title.indexOf(' ') + 1)
  };
}

const IndexPage = ({ data, pageContext }) => {
  const posts = data.allMdx.edges

  const calculatorPosts = posts.filter(post => post.node.frontmatter.isCalculator)
  const regularPosts = posts.filter(post => !post.node.frontmatter.isCalculator)

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

  const postsListContainer = groupBy(regularPosts, getDateYear)
    .map(({ year, posts }, i) => (
      <div style={{ gap: 30, display: 'flex', flexDirection: 'column' }} key={i}>
        <h2 className="code" style={{ margin: "40px 0" }}>
          {year}
        </h2>
        {postsList(posts)}
      </div>
    ))
    .reverse()

  const calculatorList = calculatorPosts.map(post => {
    const { emoji, title } = extractEmojiAndTitle(post.node.frontmatter.title);
    
    return <Link to={`/${post.node.slug}`} key={post.node.id}>
      <CalculatorCard>
        <CalculatorEmoji>
          {emoji}
        </CalculatorEmoji>
        <CalculatorTitle>{title}</CalculatorTitle>
      </CalculatorCard>
    </Link>
  })

  const { previousPagePath, nextPagePath } = pageContext

  return (
    <>
      <SEO title="Home" />
      <section>
        {!!calculatorList.length && <div>
          <h2>Save Money Calculators</h2>
          <CalculatorGrid>{calculatorList}</CalculatorGrid>
        </div>}
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
            description
            cover
            status
            isCalculator
            date(formatString: "MMMM DD, YY")
          }
        }
      }
    }
  }
`
