import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * AnimatedWrapper - Fade in on scroll animation
 * Lightweight alternative to Framer Motion for scroll animations
 */

const Wrapper = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity ${tokens.transitions.smooth}, 
              transform ${tokens.transitions.smooth};
  transition-delay: ${props => props.delay || '0ms'};
`

export const AnimatedWrapper = ({ children, delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Unobserve after becoming visible to improve performance
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '50px',
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
  }, [threshold])

  return (
    <Wrapper ref={ref} isVisible={isVisible} delay={`${delay}ms`}>
      {children}
    </Wrapper>
  )
}

export default AnimatedWrapper

