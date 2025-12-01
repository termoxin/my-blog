import styled from "styled-components"
import { tokens } from "../../theme/tokens"

export const Anchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${tokens.colors.bgSecondary};
  transition: all ${tokens.transitions.base};
  
  img {
    opacity: 0.7;
    transition: opacity ${tokens.transitions.fast};
  }
  
  &:hover {
    background: ${tokens.colors.brandPurple};
    transform: translateY(-2px);
    
    img {
      opacity: 1;
      filter: brightness(0) invert(1);
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
`
