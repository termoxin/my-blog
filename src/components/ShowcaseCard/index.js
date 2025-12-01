import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * ShowcaseCard - Premium project card with Apple-style design
 * Used for displaying projects on the home page
 */

const CardWrapper = styled(Link)`
  display: block;
  position: relative;
  border-radius: ${tokens.radius['3xl']};
  overflow: hidden;
  background: ${tokens.colors.bgPrimary};
  text-decoration: none;
  transition: all ${tokens.transitions.smooth};
  height: ${props => props.compact ? '360px' : '480px'};
  box-shadow: ${tokens.shadows.md};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${tokens.shadows.xl};
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    height: ${props => props.compact ? '320px' : '420px'};
  }
`

const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => props.cover ? `url(${props.cover})` : 'none'};
  background-color: ${props => !props.cover ? props.bgColor || '#667eea' : 'transparent'};
  background-size: cover;
  background-position: center;
  transition: transform ${tokens.transitions.smooth};
  
  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }
`

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${tokens.spacing['2xl']};
  z-index: 2;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing.xl};
  }
`

const CardEmoji = styled.div`
  font-size: ${tokens.typography.fontSize['6xl']};
  margin-bottom: ${tokens.spacing.md};
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['5xl']};
  }
`

const CardTitle = styled.h3`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.tight};
  letter-spacing: ${tokens.typography.letterSpacing.tight};
  color: ${tokens.colors.bgPrimary};
  margin: 0 0 ${tokens.spacing.md} 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize['2xl']};
  }
`

const CardDescription = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight.relaxed};
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 ${tokens.spacing.lg} 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.sm};
  }
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  border-radius: ${tokens.radius.full};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: ${tokens.shadows.sm};
  transition: all ${tokens.transitions.base};
  
  ${CardWrapper}:hover & {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 1);
  }
`

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color};
`

const StatusText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.textPrimary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'successful':
      return '#10B981'; // Green
    case 'in progress':
      return '#F59E0B'; // Orange
    case 'worked, keep going':
      return '#06B6D4'; // Cyan
    case 'failed':
      return '#EF4444'; // Red
    default:
      return '#6B7280'; // Gray
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

export const ShowcaseCard = ({ 
  title, 
  description, 
  cover, 
  status, 
  slug,
  bgColor,
  compact = false
}) => {
  const { emoji, title: cleanTitle } = extractEmojiAndTitle(title)
  const statusColor = getStatusColor(status)
  
  return (
    <CardWrapper to={`/${slug}`} compact={compact}>
      <CardBackground cover={cover} bgColor={bgColor} />
      <CardContent>
        {emoji && <CardEmoji>{emoji}</CardEmoji>}
        <CardTitle>{cleanTitle}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {status && (
          <StatusBadge>
            <StatusDot color={statusColor} />
            <StatusText>{status}</StatusText>
          </StatusBadge>
        )}
      </CardContent>
    </CardWrapper>
  )
}

export default ShowcaseCard

