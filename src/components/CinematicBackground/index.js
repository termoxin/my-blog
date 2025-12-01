import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * CinematicBackground - Premium gradient background with ambient lighting
 * Inspired by Apple Vision Pro and Arc Browser
 */

const float1 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
`

const float2 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-40px, 30px) scale(1.15);
  }
  66% {
    transform: translate(25px, -25px) scale(0.85);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
`

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`

const GradientOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: ${props => props.opacity || 0.4};
  animation: ${props => props.animation || float1} ${props => props.duration || '20s'} ease-in-out infinite;
  will-change: transform;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    filter: blur(60px);
  }
`

const Orb1 = styled(GradientOrb)`
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(108, 99, 255, 0.25) 0%, transparent 70%);
  top: -10%;
  right: -10%;
  animation: ${float1} 25s ease-in-out infinite;
`

const Orb2 = styled(GradientOrb)`
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 131, 255, 0.20) 0%, transparent 70%);
  bottom: -15%;
  left: -5%;
  animation: ${float2} 30s ease-in-out infinite;
  animation-delay: -5s;
`

const Orb3 = styled(GradientOrb)`
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float1} 35s ease-in-out infinite;
  animation-delay: -10s;
`

const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
`

const GlowSpot = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%);
  filter: blur(40px);
  animation: ${pulse} 8s ease-in-out infinite;
  will-change: opacity;
`

export const CinematicBackground = ({ variant = 'default', children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      
      const orbs = containerRef.current.querySelectorAll('[data-parallax]')
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <BackgroundContainer ref={containerRef}>
      {variant === 'hero' && (
        <>
          <Orb1 data-parallax />
          <Orb2 data-parallax />
          <Orb3 data-parallax />
          <GlowSpot style={{ top: '20%', right: '15%' }} data-parallax />
          <GlowSpot style={{ bottom: '30%', left: '10%' }} data-parallax />
        </>
      )}
      
      {variant === 'subtle' && (
        <>
          <GradientOrb
            style={{
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(108, 99, 255, 0.08) 0%, transparent 70%)',
              top: '-20%',
              right: '-10%',
            }}
            animation={float1}
            duration="30s"
            opacity={0.3}
          />
          <GradientOrb
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(139, 131, 255, 0.06) 0%, transparent 70%)',
              bottom: '-15%',
              left: '-5%',
            }}
            animation={float2}
            duration="35s"
            opacity={0.25}
          />
        </>
      )}
      
      {variant === 'glow' && (
        <>
          <GradientOrb
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(108, 99, 255, 0.20) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(100px)',
            }}
            animation={pulse}
            duration="10s"
            opacity={0.5}
          />
        </>
      )}
      
      <NoiseOverlay />
      {children}
    </BackgroundContainer>
  )
}

export default CinematicBackground

