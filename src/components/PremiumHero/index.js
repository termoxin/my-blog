import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { tokens } from '../../theme/tokens'
import AnimatedBlobs from '../AnimatedBlobs'
import PremiumButton from '../PremiumButton'

/**
 * PremiumHero - Cinematic hero section with 3D-like layering
 * Inspired by Apple Vision Pro, Linear, and Arc Browser
 */

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) rotateZ(0deg);
  }
  50% {
    transform: translateY(-16px) rotateZ(2deg);
  }
`

const glowPulse = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`

const HeroSection = styled.section`
  position: relative;
  min-height: ${props => props.compact ? '70vh' : '95vh'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(250, 250, 252, 1) 100%
  );
  padding: ${tokens.spacing['section-lg']} ${tokens.spacing.xl};
  
  /* Ambient shadow around hero */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.03);
    pointer-events: none;
    z-index: 1;
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    min-height: ${props => props.compact ? '60vh' : '85vh'};
    padding: ${tokens.spacing['section-md']} ${tokens.spacing.lg};
  }
`

const HeroContent = styled(motion.div)`
  position: relative;
  max-width: ${tokens.maxWidth.ultra};
  margin: 0 auto;
  text-align: center;
  z-index: ${tokens.zIndex.base + 2};
  perspective: 1000px;
  transform-style: preserve-3d;
`

const EmojiContainer = styled.div`
  font-size: ${tokens.typography.fontSize['9xl']};
  margin-bottom: ${tokens.spacing['2xl']};
  filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.12));
  animation: ${floatAnimation} 6s ease-in-out infinite;
  transform-style: preserve-3d;
  will-change: transform;
  user-select: none;
  transition: transform 0.3s ease-out;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['7xl']};
    margin-bottom: ${tokens.spacing.xl};
  }
`

const StatusBadgeContainer = styled.div`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.xl};
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  border-radius: ${tokens.radius.full};
  background: ${props => props.bg || 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid ${props => props.borderColor || 'rgba(255, 255, 255, 0.5)'};
  box-shadow: ${tokens.shadows.soft}, 
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all ${tokens.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
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
  animation: ${glowPulse} 3s ease-in-out infinite;
`

const StatusText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${props => props.color || tokens.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const HeroTitle = styled(motion.h1)`
  font-family: ${tokens.typography.fontFamily.display};
  font-size: clamp(${tokens.typography.fontSize.h3}, 8vw, 90px);
  font-weight: ${tokens.typography.fontWeight.black};
  line-height: ${tokens.typography.lineHeight.h1};
  letter-spacing: -0.04em;
  color: ${tokens.colors.textPrimary};
  margin: 0 0 ${tokens.spacing['group-lg']} 0;
  font-feature-settings: 'kern' 1, 'liga' 1, 'ss01' 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  background: linear-gradient(
    135deg,
    ${tokens.colors.textPrimary} 0%,
    ${tokens.colors.textSecondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Soft text shadow glow */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: clamp(${tokens.typography.fontSize.h4}, 10vw, ${tokens.typography.fontSize.h2});
    letter-spacing: -0.03em;
  }
`

const HeroSubtitle = styled(motion.p)`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: clamp(${tokens.typography.fontSize['body-md']}, 2.5vw, 22px);
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight['body-lg']};
  color: ${tokens.colors.textSecondary};
  margin: 0 auto ${tokens.spacing['group-lg']} auto;
  max-width: ${tokens.maxWidth.prose};
  
  /* Soft text shadow for depth */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`

const GlassCard = styled.div`
  margin-top: ${tokens.spacing['4xl']};
  padding: ${tokens.spacing['3xl']};
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: ${tokens.radius.hero};
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: ${tokens.shadows.float},
              inset 0 1px 0 rgba(255, 255, 255, 1),
              0 0 0 1px rgba(0, 0, 0, 0.02);
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing['2xl']};
    margin-top: ${tokens.spacing['3xl']};
  }
`

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'successful':
      return { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' }
    case 'in progress':
      return { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' }
    case 'worked, keep going':
      return { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.1)', border: 'rgba(6, 182, 212, 0.3)' }
    case 'failed':
      return { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)' }
    default:
      return { color: '#6B7280', bg: 'rgba(107, 114, 128, 0.1)', border: 'rgba(107, 114, 128, 0.3)' }
  }
}

const extractEmojiAndTitle = (title) => {
  if (!title) return { emoji: null, title: '' }
  
  const emojiMatch = title.match(/^(\p{Emoji}+)\s+(.+)$/u)
  if (emojiMatch) {
    return { emoji: emojiMatch[1], title: emojiMatch[2] }
  }
  return { emoji: null, title }
}

export const PremiumHero = ({ 
  title, 
  description, 
  status,
  compact = false,
  showCTA = false,
  onCTAClick,
  children 
}) => {
  const { emoji, title: cleanTitle } = extractEmojiAndTitle(title)
  const statusColors = getStatusColor(status)
  const heroRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Scroll-based parallax for text
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 300], [0, -20])
  const subtitleY = useTransform(scrollY, [0, 300], [0, -15])
  const emojiY = useTransform(scrollY, [0, 300], [0, -10])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      
      setMousePosition({ x: x * 20, y: y * 20 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <HeroSection ref={heroRef} compact={compact}>
      <AnimatedBlobs />
      
      <HeroContent>
        {emoji && (
          <EmojiContainer 
            as={motion.div}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0,
              type: "spring",
              stiffness: 100 
            }}
            style={{
              y: emojiY,
              x: mousePosition.x * 0.5,
            }}
          >
            {emoji}
          </EmojiContainer>
        )}
        
        {status && (
          <StatusBadgeContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <StatusBadge 
              bg={statusColors.bg} 
              borderColor={statusColors.border}
            >
              <StatusDot color={statusColors.color} />
              <StatusText color={statusColors.color}>{status}</StatusText>
            </StatusBadge>
          </StatusBadgeContainer>
        )}
        
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100 
          }}
          style={{ y: titleY }}
        >
          {cleanTitle}
        </HeroTitle>
        
        {description && (
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.35,
              type: "spring",
              stiffness: 100 
            }}
            style={{ y: subtitleY }}
          >
            {description}
          </HeroSubtitle>
        )}
        
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PremiumButton 
              onClick={onCTAClick}
              icon="→"
            >
              Explore Project
            </PremiumButton>
          </motion.div>
        )}
        
        {children && (
          <GlassCard
            as={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {children}
          </GlassCard>
        )}
      </HeroContent>
    </HeroSection>
  )
}

export default PremiumHero

