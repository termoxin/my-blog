import React from "react"

import { CheckboxCircle, CheckboxWrapper } from "./styles"

const Checkbox = ({ checked, label, className }) => (
  <CheckboxWrapper>
    <CheckboxCircle className={className} checked={checked} />
    <p>{label}</p>
  </CheckboxWrapper>
)

export default Checkbox
