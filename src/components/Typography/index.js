import React from 'react'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * Apple-inspired Typography Components
 * Clean, readable, and consistent text styling
 */

// Display - For hero sections with optical sizing
export const Display = styled.h1`
  font-family: ${tokens.typography.fontFamily.display};
  font-size: clamp(
    ${tokens.typography.fontSize['6xl']},
    ${props => props.size === 'lg' ? '10vw' : '8vw'},
    ${props => props.size === 'lg' ? tokens.typography.fontSize.h1 : tokens.typography.fontSize.h2}
  );
  font-weight: ${tokens.typography.fontWeight.heavy};
  line-height: ${tokens.typography.lineHeight.h1};
  letter-spacing: ${tokens.typography.letterSpacing.tightest};
  color: ${tokens.colors.textPrimary};
  margin: 0;
  font-feature-settings: 'ss01' on, 'liga' on, 'kern' on;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

// Headline - For section titles
export const Headline = styled.h2`
  font-family: ${tokens.typography.fontFamily.display};
  font-size: ${props => {
    switch(props.level) {
      case 1: return tokens.typography.fontSize.h2;
      case 2: return tokens.typography.fontSize.h3;
      case 3: return tokens.typography.fontSize.h4;
      case 4: return tokens.typography.fontSize.h5;
      default: return tokens.typography.fontSize.h2;
    }
  }};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${props => {
    switch(props.level) {
      case 1: return tokens.typography.lineHeight.h2;
      case 2: return tokens.typography.lineHeight.h3;
      case 3: return tokens.typography.lineHeight.h4;
      case 4: return tokens.typography.lineHeight.h5;
      default: return tokens.typography.lineHeight.h2;
    }
  }};
  letter-spacing: ${props => {
    switch(props.level) {
      case 1: return tokens.typography.letterSpacing.tighter;
      case 2: return tokens.typography.letterSpacing.tight;
      case 3: return tokens.typography.letterSpacing.normal;
      default: return tokens.typography.letterSpacing.tighter;
    }
  }};
  color: ${tokens.colors.textPrimary};
  margin: 0 0 ${tokens.spacing.lg} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${props => {
      switch(props.level) {
        case 1: return tokens.typography.fontSize.h3;
        case 2: return tokens.typography.fontSize.h4;
        case 3: return tokens.typography.fontSize.h5;
        case 4: return tokens.typography.fontSize.h6;
        default: return tokens.typography.fontSize.h3;
      }
    }};
  }
`

// Title - For card/component titles
export const Title = styled.h3`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${props => {
    switch(props.size) {
      case 'sm': return tokens.typography.fontSize.lg;
      case 'md': return tokens.typography.fontSize.xl;
      case 'lg': return tokens.typography.fontSize['2xl'];
      case 'xl': return tokens.typography.fontSize['3xl'];
      default: return tokens.typography.fontSize['2xl'];
    }
  }};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  letter-spacing: ${tokens.typography.letterSpacing.tight};
  color: ${tokens.colors.textPrimary};
  margin: 0;
`

// Subtitle - For supporting text under headlines
export const Subtitle = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${props => {
    switch(props.size) {
      case 'sm': return tokens.typography.fontSize['body-md'];
      case 'md': return tokens.typography.fontSize['body-lg'];
      case 'lg': return tokens.typography.fontSize.xl;
      default: return tokens.typography.fontSize['body-lg'];
    }
  }};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight['body-lg']};
  color: ${tokens.colors.textSecondary};
  margin: ${tokens.spacing['group-sm']} 0 0 0;
  max-width: ${tokens.maxWidth.prose};
`

// Body - For article/content text
export const Body = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${props => {
    switch(props.size) {
      case 'sm': return tokens.typography.fontSize['body-sm'];
      case 'md': return tokens.typography.fontSize['body-md'];
      case 'lg': return tokens.typography.fontSize['body-lg'];
      default: return tokens.typography.fontSize['body-lg'];
    }
  }};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${props => {
    switch(props.size) {
      case 'sm': return tokens.typography.lineHeight['body-sm'];
      case 'md': return tokens.typography.lineHeight['body-md'];
      case 'lg': return tokens.typography.lineHeight['body-lg'];
      default: return tokens.typography.lineHeight['body-lg'];
    }
  }};
  color: ${tokens.colors.textPrimary};
  margin-bottom: 1.2em;
  
  strong {
    font-weight: ${tokens.typography.fontWeight.semibold};
  }
  
  a {
    color: ${tokens.colors.brandPurple};
    text-decoration: none;
    border-bottom: 1px solid ${tokens.colors.brandPurpleLight};
    transition: all ${tokens.transitions.fast};
    
    &:hover {
      color: ${tokens.colors.brandPurpleDark};
      border-bottom-color: ${tokens.colors.brandPurpleDark};
    }
  }
`

// Caption - For small text, labels, metadata
export const Caption = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${props => props.semibold ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight.normal};
  color: ${tokens.colors.textSecondary};
  text-transform: ${props => props.uppercase ? 'uppercase' : 'none'};
  letter-spacing: ${props => props.uppercase ? '0.05em' : tokens.typography.letterSpacing.normal};
`

// Label - For form labels and UI text
export const Label = styled.label`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.normal};
  color: ${tokens.colors.textPrimary};
  display: block;
  margin-bottom: ${tokens.spacing.xs};
`

// Code - For inline code
export const Code = styled.code`
  font-family: ${tokens.typography.fontFamily.mono};
  font-size: 0.9em;
  color: ${tokens.colors.brandPurple};
  background: ${tokens.colors.bgSecondary};
  padding: 3px 6px;
  border-radius: ${tokens.radius.sm};
`

// Pre - For code blocks
export const Pre = styled.pre`
  font-family: ${tokens.typography.fontFamily.mono};
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.relaxed};
  background: ${tokens.colors.textPrimary};
  color: ${tokens.colors.bgPrimary};
  padding: ${tokens.spacing.xl};
  border-radius: ${tokens.radius.lg};
  overflow-x: auto;
  margin: ${tokens.spacing['2xl']} 0;
  
  code {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    padding: 0;
  }
`

// Eyebrow - For small labels above headlines
export const Eyebrow = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.normal};
  color: ${tokens.colors.brandPurple};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: inline-block;
  margin-bottom: ${tokens.spacing.md};
`

// Export all as named exports and default
export default {
  Display,
  Headline,
  Title,
  Subtitle,
  Body,
  Caption,
  Label,
  Code,
  Pre,
  Eyebrow,
}

