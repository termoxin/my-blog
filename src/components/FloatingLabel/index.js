import React from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * FloatingLabel - Premium floating section labels
 * Inspired by Linear and Arc Browser
 */

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`

const LabelContainer = styled.div`
  position: ${props => props.floating ? 'sticky' : 'relative'};
  top: ${props => props.floating ? '100px' : 'auto'};
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${tokens.colors.borderLight};
  border-radius: ${tokens.radius.full};
  box-shadow: ${tokens.shadows.soft};
  z-index: ${tokens.zIndex.sticky};
  animation: ${float} 4s ease-in-out infinite;
  transition: all ${tokens.transitions.base};
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: ${tokens.shadows.lg};
    transform: translateY(-2px);
  }
`

const Icon = styled.span`
  font-size: ${tokens.typography.fontSize.base};
  display: flex;
  align-items: center;
  justify-content: center;
`

const LabelText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const FloatingLabel = ({ icon, children, floating = false }) => {
  return (
    <LabelContainer floating={floating}>
      {icon && <Icon>{icon}</Icon>}
      <LabelText>{children}</LabelText>
    </LabelContainer>
  )
}

export default FloatingLabel

