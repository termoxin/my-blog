import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * PremiumShowcaseCard - Floating 3D-like card with depth effects
 * Inspired by Apple product highlights and Linear showcases
 */

const floatIdle = keyframes`
  0%, 100% {
    transform: translateY(0) translateZ(0);
  }
  50% {
    transform: translateY(-12px) translateZ(20px);
  }
`

const shimmerMove = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(200%) translateY(200%) rotate(45deg);
  }
`

const CardContainer = styled(Link)`
  display: block;
  position: relative;
  height: ${props => props.compact ? '420px' : '540px'};
  text-decoration: none;
  perspective: 1500px;
  transform-style: preserve-3d;
  will-change: transform;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    height: ${props => props.compact ? '380px' : '480px'};
  }
`

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${tokens.radius.hero};
  background: ${tokens.colors.bgPrimary};
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform ${tokens.transitions.cinematic},
              box-shadow ${tokens.transitions.cinematic};
  box-shadow: ${tokens.shadows.float};
  animation: ${floatIdle} 8s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${tokens.gradients.glass};
    opacity: 0.4;
    z-index: 5;
    pointer-events: none;
    transition: opacity ${tokens.transitions.base};
  }
  
  ${CardContainer}:hover & {
    transform: translateY(-24px) rotateX(5deg) scale(1.02);
    box-shadow: ${tokens.shadows.depth}, ${tokens.shadows.glow};
    
    &::before {
      opacity: 0.6;
    }
  }
`

const BackgroundMedia = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${props => props.cover ? `url(${props.cover})` : props.gradient || tokens.gradients.matte1};
  background-size: cover;
  background-position: center;
  filter: brightness(0.9);
  transition: transform ${tokens.transitions.cinematic},
              filter ${tokens.transitions.cinematic};
  
  ${CardContainer}:hover & {
    transform: scale(1.08);
    filter: brightness(1);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }
`

const DepthBlur = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(0px);
  transition: backdrop-filter ${tokens.transitions.smooth};
  pointer-events: none;
  z-index: 1;
  
  ${CardContainer}:hover & {
    backdrop-filter: blur(2px);
  }
`

const ContentLayer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${tokens.spacing['3xl']};
  z-index: 10;
  transform: translateZ(40px);
  transition: transform ${tokens.transitions.cinematic};
  
  ${CardContainer}:hover & {
    transform: translateZ(60px) translateY(-8px);
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing['2xl']};
  }
`

const FloatingEmoji = styled.div`
  font-size: ${tokens.typography.fontSize['6xl']};
  margin-bottom: ${tokens.spacing.lg};
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
  transform: translateZ(60px);
  transition: transform ${tokens.transitions.cinematic};
  user-select: none;
  
  ${CardContainer}:hover & {
    transform: translateZ(100px) scale(1.1) rotate(-5deg);
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['5xl']};
  }
`

const CardTitle = styled.h3`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: clamp(${tokens.typography.fontSize['2xl']}, 3vw, ${tokens.typography.fontSize['4xl']});
  font-weight: ${tokens.typography.fontWeight.heavy};
  line-height: ${tokens.typography.lineHeight.tight};
  letter-spacing: -0.03em;
  color: ${tokens.colors.bgPrimary};
  margin: 0 0 ${tokens.spacing.lg} 0;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: translateZ(50px);
  transition: transform ${tokens.transitions.cinematic},
              text-shadow ${tokens.transitions.base};
  
  ${CardContainer}:hover & {
    transform: translateZ(70px);
    text-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
  }
`

const CardDescription = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight.relaxed};
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 ${tokens.spacing.xl} 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transform: translateZ(45px);
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.sm};
  }
`

const GlassBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  border-radius: ${tokens.radius.full};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${tokens.shadows.soft},
              inset 0 1px 0 rgba(255, 255, 255, 1);
  transform: translateZ(80px);
  transition: all ${tokens.transitions.cinematic};
  
  ${CardContainer}:hover & {
    transform: translateZ(120px) scale(1.08);
    box-shadow: ${tokens.shadows.float};
  }
`

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: 0 0 12px ${props => props.color},
              0 0 24px ${props => props.color}40;
  animation: ${keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  `} 2s ease-in-out infinite;
`

const StatusText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const ShimmerOverlay = styled.div`
  position: absolute;
  inset: -100%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  transition: transform 0s;
  pointer-events: none;
  z-index: 20;
  
  ${CardContainer}:hover & {
    animation: ${shimmerMove} 1.5s ease-in-out;
  }
`

const AmbientGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    ${props => props.color || 'rgba(108, 99, 255, 0.2)'} 0%,
    transparent 70%
  );
  filter: blur(60px);
  opacity: 0.6;
  z-index: -1;
  transition: opacity ${tokens.transitions.smooth};
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'successful': return '#10B981'
    case 'in progress': return '#F59E0B'
    case 'worked, keep going': return '#06B6D4'
    case 'failed': return '#EF4444'
    default: return '#6B7280'
  }
}

const extractEmojiAndTitle = (title) => {
  if (!title) return { emoji: null, title: '' }
  const emojiMatch = title.match(/^(\p{Emoji}+)\s+(.+)$/u)
  if (emojiMatch) return { emoji: emojiMatch[1], title: emojiMatch[2] }
  return { emoji: null, title }
}

export const PremiumShowcaseCard = ({
  title,
  description,
  cover,
  status,
  slug,
  gradient,
  compact = false,
  delay = '0s',
}) => {
  const { emoji, title: cleanTitle } = extractEmojiAndTitle(title)
  const statusColor = getStatusColor(status)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const tiltX = ((y - centerY) / centerY) * -5
      const tiltY = ((x - centerX) / centerX) * 5
      
      setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <CardContainer ref={cardRef} to={`/${slug}`} compact={compact}>
      <AmbientGlow color={`rgba(${statusColor === '#10B981' ? '16, 185, 129' : '108, 99, 255'}, 0.2)`} />
      <CardInner 
        delay={delay}
        style={{
          transform: `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <BackgroundMedia cover={cover} gradient={gradient} />
        <DepthBlur />
        <ContentLayer>
          {emoji && <FloatingEmoji>{emoji}</FloatingEmoji>}
          <CardTitle>{cleanTitle}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {status && (
            <GlassBadge>
              <StatusDot color={statusColor} />
              <StatusText>{status}</StatusText>
            </GlassBadge>
          )}
        </ContentLayer>
        <ShimmerOverlay />
      </CardInner>
    </CardContainer>
  )
}

export default PremiumShowcaseCard

