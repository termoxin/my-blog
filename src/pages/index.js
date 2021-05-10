import * as React from "react"

import { Container, Content, FeatureImage, ContentCard } from "../components"
import Seo from "../components/seo"

const IndexPage = () => (
  <Container>
    <Seo title="Home" />
    <FeatureImage />
    <Content>
      <ContentCard
        date="May 10, 2021"
        title="Content about something important"
        excerpt="This is summary"
        slug="first-post"
      />
    </Content>
  </Container>
)

export default IndexPage
