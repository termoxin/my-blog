import styled from "styled-components"

export const DividerWrapper = styled.div`
  background: #ddd;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 0)),
    color-stop(#ccc),
    to(rgba(255, 255, 255, 0))
  );

  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0),
    #ccc,
    rgba(255, 255, 255, 0)
  );

  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #ccc,
    rgba(255, 255, 255, 0)
  );

  height: 1px;
  margin: 2em 0;
`
