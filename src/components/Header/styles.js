import styled from "styled-components"
import { Link } from "gatsby"
import { tokens } from "../../theme/tokens"

/**
 * Apple-inspired Header Styles
 * Minimal, clean, with subtle scroll transitions
 */

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: ${props => props.scrolled 
    ? 'rgba(255, 255, 255, 0.85)' 
    : 'transparent'
  };
  backdrop-filter: ${props => props.scrolled ? 'blur(20px) saturate(180%)' : 'none'};
  box-shadow: ${props => props.scrolled ? tokens.shadows.sm : 'none'};
  border-bottom: ${props => props.scrolled 
    ? `1px solid ${tokens.colors.borderLight}` 
    : '1px solid transparent'
  };
  transition: all ${tokens.transitions.smooth};
  padding: ${props => props.scrolled ? tokens.spacing.md : tokens.spacing.lg} 0;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing.md} 0;
  }
`

export const HeaderInner = styled.div`
  max-width: ${tokens.maxWidth.wide};
  margin: 0 auto;
  padding: 0 ${tokens.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: 0 ${tokens.spacing.lg};
  }
`

export const AvatarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md};
  text-decoration: none;
  transition: all ${tokens.transitions.base};
  
  &:hover {
    opacity: 0.8;
  }
`

export const Avatar = styled.img`
  width: ${props => props.scrolled ? '48px' : '72px'};
  height: ${props => props.scrolled ? '48px' : '72px'};
  border-radius: 50%;
  border: 3px solid ${tokens.colors.bgPrimary};
  box-shadow: ${tokens.shadows.md};
  transition: all ${tokens.transitions.smooth};
  object-fit: cover;
  
  @media (max-width: ${tokens.breakpoints.md}) {
    width: 48px;
    height: 48px;
  }
`

export const ChristmasHat = styled.img`
  position: absolute;
  left: ${props => props.scrolled ? '24px' : '36px'};
  bottom: ${props => props.scrolled ? '32px' : '48px'};
  width: ${props => props.scrolled ? '32px' : '48px'};
  height: ${props => props.scrolled ? '32px' : '48px'};
  transform: rotate(-40deg);
  transition: all ${tokens.transitions.smooth};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    left: 24px;
    bottom: 32px;
    width: 32px;
    height: 32px;
  }
`

export const HeaderLabel = styled.span`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.textPrimary};
  opacity: ${props => props.scrolled ? 1 : 0};
  transform: translateX(${props => props.scrolled ? '0' : '-8px'});
  transition: all ${tokens.transitions.smooth};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    display: none;
  }
`

export const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.md};
  opacity: ${props => props.scrolled ? 0.8 : 1};
  transition: all ${tokens.transitions.smooth};
  
  &:hover {
    opacity: 1;
  }
`
