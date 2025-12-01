import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { tokens } from '../../theme/tokens'

/**
 * PremiumButton - Animated button with ripple, scale, and light sweep
 * Apple/Arc/Linear quality interactions
 */

const sweep = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
`

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`

const ButtonWrapper = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.lg} ${tokens.spacing['2xl']};
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.bgPrimary};
  background: ${tokens.colors.brandPurple};
  border: none;
  border-radius: ${tokens.radius.full};
  cursor: pointer;
  overflow: hidden;
  box-shadow: ${tokens.shadows.md}, 
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all ${tokens.transitions.base};
  outline: none;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    background: ${tokens.colors.brandPurpleDark};
    box-shadow: ${tokens.shadows.lg},
                0 0 30px rgba(108, 99, 255, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus-visible {
    outline: 2px solid ${tokens.colors.brandPurple};
    outline-offset: 2px;
  }
`

const SweepOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: translateX(-100%) skewX(-15deg);
  pointer-events: none;
  
  ${ButtonWrapper}:hover & {
    animation: ${sweep} 0.8s ease-out;
  }
`

const RippleEffect = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  animation: ${ripple} 0.6s ease-out;
`

export const PremiumButton = ({ 
  children, 
  onClick, 
  icon,
  variant = 'primary',
  ...props 
}) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    }
    
    setRipples([...ripples, newRipple])
    
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id))
    }, 600)
    
    onClick?.(e)
  }

  return (
    <ButtonWrapper
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25 
      }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
      <SweepOverlay />
      {ripples.map(ripple => (
        <RippleEffect
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
          }}
        />
      ))}
    </ButtonWrapper>
  )
}

export default PremiumButton

