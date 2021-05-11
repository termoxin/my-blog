import React from "react"
import styled from "styled-components"

import { PaginationWrapper, PaginationElement } from "../elements"

export const Pagination = ({ isFirst, isLast, prevPage, nextPage }) => (
  <PaginationWrapper isFirst={isFirst} isLast={isLast}>
    <PaginationElement to={prevPage}>Previous Page</PaginationElement>
    <PaginationElement to={nextPage}>Next Page</PaginationElement>
  </PaginationWrapper>
)
