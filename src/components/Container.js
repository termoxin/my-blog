import React from "react"
import { ContainerWrapper } from "../elements"

import { Nav } from "../components"

export const Container = ({ children }) => (
  <ContainerWrapper>
    <Nav> /</Nav>
    {children}
  </ContainerWrapper>
)
