import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * Container Component - Centered content with max-width
 */
export const Container = styled.div`
  width: 100%;
  max-width: ${props => {
    switch(props.size) {
      case 'prose': return tokens.maxWidth.prose;
      case 'article': return tokens.maxWidth.article;
      case 'content': return tokens.maxWidth.content;
      case 'wide': return tokens.maxWidth.wide;
      default: return tokens.maxWidth.content;
    }
  }};
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: 0 ${tokens.spacing.md};
  }
`

export default Container

