import React from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * PremiumSeparator - Elegant section dividers
 * Subtle with optional glow effect
 */

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const SeparatorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin: ${props => {
    switch(props.spacing) {
      case 'sm': return `${tokens.spacing['2xl']} 0`;
      case 'md': return `${tokens.spacing['3xl']} 0`;
      case 'lg': return `${tokens.spacing['4xl']} 0`;
      case 'xl': return `${tokens.spacing['5xl']} 0`;
      default: return `${tokens.spacing['3xl']} 0`;
    }
  }};
  overflow: hidden;
`

const Line = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.centered ? '50%' : '0'};
  transform: ${props => props.centered ? 'translateX(-50%)' : 'none'};
  width: ${props => props.width || '100%'};
  height: 1px;
  background: ${props => {
    if (props.variant === 'gradient') {
      return `linear-gradient(90deg, 
        transparent 0%, 
        ${tokens.colors.borderLight} 20%, 
        ${tokens.colors.borderMedium} 50%, 
        ${tokens.colors.borderLight} 80%, 
        transparent 100%
      )`;
    }
    if (props.variant === 'glow') {
      return `linear-gradient(90deg, 
        transparent 0%, 
        rgba(108, 99, 255, 0.3) 50%, 
        transparent 100%
      )`;
    }
    return tokens.colors.borderLight;
  }};
  box-shadow: ${props => props.variant === 'glow' ? `0 0 20px rgba(108, 99, 255, 0.3)` : 'none'};
`

const ShimmerEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  
  ${SeparatorContainer}:hover & {
    animation: ${shimmer} 1.5s ease-in-out;
  }
`

const Dot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.size || '6px'};
  height: ${props => props.size || '6px'};
  border-radius: 50%;
  background: ${props => props.color || tokens.colors.brandPurple};
  box-shadow: 0 0 12px ${props => props.color || tokens.colors.brandPurple};
`

export const PremiumSeparator = ({ 
  variant = 'default', 
  spacing = 'md',
  width = '100%',
  centered = false,
  showDot = false,
  dotColor,
  animated = false
}) => {
  return (
    <SeparatorContainer spacing={spacing}>
      <Line variant={variant} width={width} centered={centered} />
      {animated && <ShimmerEffect />}
      {showDot && <Dot color={dotColor} />}
    </SeparatorContainer>
  )
}

export default PremiumSeparator

