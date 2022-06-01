import styled from "styled-components"

export const Anchor = styled.a`
  && {
    line-height: 32px;
    display: inline-block;
    margin: 10px 0 10px 10px;
  }
`

export const Wrapper = styled.div`
  position: relative;
  left: 76px;
  bottom: 153px;
  transform: rotate(90deg);

  ${Anchor} {
    transform: rotate(-90deg);
  }
`
