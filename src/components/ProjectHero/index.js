import React from 'react'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * ProjectHero - Premium hero section for project pages
 * Apple-inspired clean design with gradient backgrounds
 */

const HeroWrapper = styled.section`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${tokens.colors.bgPrimary} 0%,
    ${tokens.colors.bgSecondary} 100%
  );
  position: relative;
  overflow: hidden;
  padding: ${tokens.spacing['6xl']} ${tokens.spacing.xl};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    min-height: 50vh;
    padding: ${tokens.spacing['4xl']} ${tokens.spacing.lg};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      rgba(108, 99, 255, 0.08) 0%,
      transparent 70%
    );
    border-radius: 50%;
    
    @media (max-width: ${tokens.breakpoints.md}) {
      width: 500px;
      height: 500px;
      top: -30%;
      right: -50%;
    }
  }
`

const HeroContent = styled.div`
  max-width: ${tokens.maxWidth.content};
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  position: relative;
`

const HeroEmoji = styled.div`
  font-size: ${tokens.typography.fontSize['9xl']};
  margin-bottom: ${tokens.spacing.xl};
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['7xl']};
  }
`

const HeroTitle = styled.h1`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize['7xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.tight};
  letter-spacing: ${tokens.typography.letterSpacing.tight};
  color: ${tokens.colors.textPrimary};
  margin: 0 0 ${tokens.spacing.xl} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['5xl']};
  }
`

const HeroSubtitle = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight.relaxed};
  color: ${tokens.colors.textSecondary};
  margin: 0 auto;
  max-width: ${tokens.maxWidth.prose};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.lg};
  }
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  border-radius: ${tokens.radius.full};
  background: ${props => props.bg || tokens.colors.bgSecondary};
  margin-bottom: ${tokens.spacing.xl};
  
  span {
    font-family: ${tokens.typography.fontFamily.sans};
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${props => props.color || tokens.colors.textPrimary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`

const HeroDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color || tokens.colors.brandPurple};
  box-shadow: 0 0 8px ${props => props.color || tokens.colors.brandPurple};
`

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'successful':
      return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', dot: '#10B981' };
    case 'in progress':
      return { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', dot: '#F59E0B' };
    case 'worked, keep going':
      return { bg: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4', dot: '#06B6D4' };
    case 'failed':
      return { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', dot: '#EF4444' };
    default:
      return { bg: tokens.colors.bgSecondary, color: tokens.colors.textPrimary, dot: '#6B7280' };
  }
}

const extractEmojiAndTitle = (title) => {
  if (!title) return { emoji: null, title: '' }
  
  const emojiMatch = title.match(/^(\p{Emoji}+)\s+(.+)$/u)
  if (emojiMatch) {
    return {
      emoji: emojiMatch[1],
      title: emojiMatch[2]
    }
  }
  return { emoji: null, title }
}

export const ProjectHero = ({ title, description, status }) => {
  const { emoji, title: cleanTitle } = extractEmojiAndTitle(title)
  const statusColors = getStatusColor(status)
  
  return (
    <HeroWrapper>
      <HeroContent>
        {emoji && <HeroEmoji>{emoji}</HeroEmoji>}
        
        {status && (
          <HeroBadge bg={statusColors.bg} color={statusColors.color}>
            <HeroDot color={statusColors.dot} />
            <span>{status}</span>
          </HeroBadge>
        )}
        
        <HeroTitle>{cleanTitle}</HeroTitle>
        
        {description && <HeroSubtitle>{description}</HeroSubtitle>}
      </HeroContent>
    </HeroWrapper>
  )
}

export default ProjectHero

