import React from "react"

import { CardWrapper, P, H2 } from "../elements"
import { Button } from "../components"

export const ContentCard = ({ title, description, slug }) => {
  return (
    <CardWrapper>
      <P size="xSmall" textAlign="center" margin="0 0 0.5rem 0" color="dark2">
        Date would have gone here, but I don't want to display dates.
      </P>
      <H2 textAlign="center" margin="0 0 1rem 0">
        {title}
      </H2>
      <P size="small" color="dark2" textAlign="center" margin="0 0 1.5rem 0">
        {description}
      </P>
      <Button href={slug}>Open post</Button>
    </CardWrapper>
  )
}
