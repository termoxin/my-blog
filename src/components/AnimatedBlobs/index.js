import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * AnimatedBlobs - Layered light-blobs with soft motion
 * Apple/Arc/Linear inspired ambient background
 */

const float1 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.95);
  }
`

const float2 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-50px, 40px) scale(1.15);
  }
  66% {
    transform: translate(35px, -35px) scale(0.9);
  }
`

const float3 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(25px, 25px) scale(1.08);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
`

const BlobContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(${props => props.blur || '120px'});
  opacity: ${props => props.opacity || 0.5};
  mix-blend-mode: ${props => props.blendMode || 'normal'};
  will-change: transform, opacity;
  transition: opacity 0.3s ease;
`

const Blob1 = styled(Blob)`
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.35) 0%,
    rgba(168, 85, 247, 0.25) 50%,
    transparent 100%
  );
  top: -15%;
  right: -10%;
  animation: ${float1} 30s ease-in-out infinite;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    width: 400px;
    height: 400px;
    filter: blur(80px);
  }
`

const Blob2 = styled(Blob)`
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.30) 0%,
    rgba(59, 130, 246, 0.20) 50%,
    transparent 100%
  );
  bottom: -20%;
  left: -15%;
  animation: ${float2} 35s ease-in-out infinite;
  animation-delay: -5s;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    width: 450px;
    height: 450px;
    filter: blur(80px);
  }
`

const Blob3 = styled(Blob)`
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.25) 0%,
    rgba(244, 114, 182, 0.15) 50%,
    transparent 100%
  );
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float3} 40s ease-in-out infinite;
  animation-delay: -10s;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    width: 350px;
    height: 350px;
    filter: blur(70px);
  }
`

const ShimmerLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 30%,
    transparent 70%,
    rgba(255, 255, 255, 0.10) 100%
  );
  animation: ${pulse} 8s ease-in-out infinite;
  pointer-events: none;
`

const Vignette = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 100%
  );
  pointer-events: none;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    height: 150px;
  }
`

const NoiseTexture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: overlay;
`

export const AnimatedBlobs = ({ variant = 'default' }) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax effect - blobs move slower than scroll
  const parallaxOffset = scrollY * 0.3

  return (
    <BlobContainer>
      <div style={{ transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}>
        <Blob1 blur="140px" opacity={0.5} />
        <Blob2 blur="160px" opacity={0.45} />
        <Blob3 blur="120px" opacity={0.4} />
      </div>
      
      <ShimmerLayer />
      <Vignette />
      <NoiseTexture />
    </BlobContainer>
  )
}

export default AnimatedBlobs

