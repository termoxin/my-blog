import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

/**
 * ParallaxLayer - Smooth parallax scrolling effect
 * Inspired by Linear and Arc Browser
 */

const Layer = styled.div`
  will-change: transform;
  transition: transform 0.1s ease-out;
`

export const ParallaxLayer = ({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className,
  style 
}) => {
  const elementRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const elementTop = rect.top + scrollY
      const windowHeight = window.innerHeight

      // Calculate parallax offset
      const parallax = (scrollY - elementTop + windowHeight) * speed

      setOffset(parallax)
    }

    // Throttle scroll events for performance
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizedScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', optimizedScroll)
  }, [speed])

  const transform = direction === 'vertical' 
    ? `translateY(${offset}px)` 
    : `translateX(${offset}px)`

  return (
    <Layer
      ref={elementRef}
      className={className}
      style={{
        ...style,
        transform,
      }}
    >
      {children}
    </Layer>
  )
}

export default ParallaxLayer

