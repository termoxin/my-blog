import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * ScrollReveal - Premium scroll-triggered animations
 * Smooth fade + translate with stagger support
 */

const RevealContainer = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => {
    if (!props.isVisible) {
      switch (props.direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        case 'scale': return 'scale(0.95)';
        default: return 'translateY(40px)';
      }
    }
    return 'translateY(0) translateX(0) scale(1)';
  }};
  transition: 
    opacity ${props => props.duration || tokens.transitions.smooth},
    transform ${props => props.duration || tokens.transitions.smooth};
  transition-delay: ${props => props.delay || '0ms'};
  will-change: opacity, transform;
`

export const ScrollReveal = ({ 
  children, 
  direction = 'up',
  duration,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className,
  style 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, triggerOnce])

  return (
    <RevealContainer
      ref={ref}
      isVisible={isVisible}
      direction={direction}
      duration={duration}
      delay={`${delay}ms`}
      className={className}
      style={style}
    >
      {children}
    </RevealContainer>
  )
}

// Helper for staggered animations
export const ScrollRevealGroup = ({ children, staggerDelay = 100 }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal delay={index * staggerDelay}>
          {child}
        </ScrollReveal>
      ))}
    </>
  )
}

export default ScrollReveal

