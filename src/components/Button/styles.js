import styled from "styled-components"

export const CheckboxCircle = styled.div`
  height: 30px;
  width: 30px;

  border: 8px solid #555555;
  border-radius: 50%;

  background: ${({ checked }) => (checked ? "#FC5235" : "transparent")};
`

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  p {
    margin-left: 10px;
  }
`
