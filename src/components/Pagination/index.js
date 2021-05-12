import React from "react"
import { Link } from "gatsby"

import { PaginationWrapper } from "./styles"

const Pagination = ({ nextPagePath, previousPagePath }) => (
  <PaginationWrapper>
    {previousPagePath && <Link to={previousPagePath}>Previous</Link>}
    {nextPagePath && <Link to={nextPagePath}>Next</Link>}
  </PaginationWrapper>
)

export default Pagination
