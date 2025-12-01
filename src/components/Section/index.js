import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * Section Component - Vertical spacing wrapper
 */
export const Section = styled.section`
  padding: ${props => {
    switch(props.spacing) {
      case 'sm': return `${tokens.spacing['2xl']} 0`;
      case 'md': return `${tokens.spacing['3xl']} 0`;
      case 'lg': return `${tokens.spacing['4xl']} 0`;
      case 'xl': return `${tokens.spacing['5xl']} 0`;
      default: return `${tokens.spacing['3xl']} 0`;
    }
  }};
  background: ${props => {
    switch(props.bg) {
      case 'primary': return tokens.colors.bgPrimary;
      case 'secondary': return tokens.colors.bgSecondary;
      case 'tertiary': return tokens.colors.bgTertiary;
      default: return 'transparent';
    }
  }};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${props => {
      switch(props.spacing) {
        case 'sm': return `${tokens.spacing.xl} 0`;
        case 'md': return `${tokens.spacing['2xl']} 0`;
        case 'lg': return `${tokens.spacing['3xl']} 0`;
        case 'xl': return `${tokens.spacing['4xl']} 0`;
        default: return `${tokens.spacing['2xl']} 0`;
      }
    }};
  }
`

export default Section

