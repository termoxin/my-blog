import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * BlogCard - Apple Newsroom-inspired blog article card
 */

const CardWrapper = styled(Link)`
  display: block;
  border-radius: ${tokens.radius['2xl']};
  overflow: hidden;
  background: ${tokens.colors.bgPrimary};
  text-decoration: none;
  transition: all ${tokens.transitions.smooth};
  box-shadow: ${tokens.shadows.sm};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.lg};
  }
`

const CardImage = styled.div`
  width: 100%;
  height: 240px;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-color: ${props => !props.src ? tokens.colors.bgSecondary : 'transparent'};
  background-size: cover;
  background-position: center;
  transition: transform ${tokens.transitions.smooth};
  
  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`

const CardContent = styled.div`
  padding: ${tokens.spacing.xl};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing.lg};
  }
`

const CardDate = styled.time`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: ${tokens.spacing.sm};
`

const CardTitle = styled.h3`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  letter-spacing: ${tokens.typography.letterSpacing.tight};
  color: ${tokens.colors.textPrimary};
  margin: 0 0 ${tokens.spacing.md} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.xl};
  }
`

const CardDescription = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.regular};
  line-height: ${tokens.typography.lineHeight.relaxed};
  color: ${tokens.colors.textSecondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    font-size: ${tokens.typography.fontSize.sm};
  }
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${tokens.spacing.lg};
  padding-top: ${tokens.spacing.lg};
  border-top: 1px solid ${tokens.colors.borderLight};
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.xs} ${tokens.spacing.md};
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.bgSecondary};
`

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.color};
`

const StatusText = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.textSecondary};
`

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'successful':
      return '#10B981';
    case 'in progress':
      return '#F59E0B';
    case 'worked, keep going':
      return '#06B6D4';
    case 'failed':
      return '#EF4444';
    default:
      return '#6B7280';
  }
}

export const BlogCard = ({ 
  title, 
  description, 
  cover, 
  date, 
  status,
  slug 
}) => {
  const statusColor = getStatusColor(status)
  
  return (
    <CardWrapper to={`/${slug}`}>
      {cover && <CardImage src={cover} />}
      <CardContent>
        {date && <CardDate>{date}</CardDate>}
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {status && (
          <CardMeta>
            <StatusBadge>
              <StatusDot color={statusColor} />
              <StatusText>{status}</StatusText>
            </StatusBadge>
          </CardMeta>
        )}
      </CardContent>
    </CardWrapper>
  )
}

export default BlogCard

