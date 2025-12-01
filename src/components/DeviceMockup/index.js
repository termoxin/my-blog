import React from 'react'
import styled, { keyframes } from 'styled-components'
import { tokens } from '../../theme/tokens'

/**
 * DeviceMockup - Floating device frames with glass reflection
 * Premium showcase for project screenshots
 */

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: translateY(-20px) rotateX(2deg) rotateY(-2deg);
  }
`

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const MockupContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || '100%'};
  margin: 0 auto;
  perspective: 2000px;
  transform-style: preserve-3d;
`

const DeviceFrame = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${props => {
    switch(props.device) {
      case 'macbook': return '12px';
      case 'iphone': return '32px';
      case 'ipad': return '24px';
      default: return tokens.radius.hero;
    }
  }};
  background: ${tokens.colors.bgPrimary};
  box-shadow: ${tokens.shadows.float};
  overflow: hidden;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  transform: translateZ(0);
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${tokens.gradients.glass};
    opacity: 0.6;
    pointer-events: none;
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${tokens.gradients.shimmer};
    transform: translateX(-100%);
    transition: transform 0.6s;
    pointer-events: none;
    z-index: 3;
  }
  
  &:hover::after {
    animation: ${shimmer} 1.5s ease-in-out;
  }
  
  @media (max-width: ${tokens.breakpoints.md}) {
    animation: none;
  }
`

const ScreenContainer = styled.div`
  position: relative;
  width: 100%;
  padding: ${props => {
    switch(props.device) {
      case 'macbook': return '2% 2% 8%';
      case 'iphone': return '5%';
      case 'ipad': return '3%';
      default: return '0';
    }
  }};
  background: ${props => props.device === 'macbook' ? '#1a1a1a' : 'transparent'};
`

const Screen = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${props => {
    switch(props.device) {
      case 'macbook': return '6px';
      case 'iphone': return '28px';
      case 'ipad': return '18px';
      default: return tokens.radius['2xl'];
    }
  }};
  overflow: hidden;
  background: ${tokens.colors.bgPrimary};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const Notch = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 28px;
  background: #000;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  z-index: 4;
`

const ReflectionLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 5;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(108, 99, 255, 0.15) 0%,
    transparent 60%
  );
  filter: blur(40px);
  opacity: 0.6;
  z-index: -1;
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: -2s;
`

export const DeviceMockup = ({ 
  device = 'browser', 
  src, 
  alt = 'Device screenshot',
  delay = '0s',
  maxWidth,
  showNotch = false,
  children
}) => {
  return (
    <MockupContainer maxWidth={maxWidth}>
      <GlowEffect />
      <DeviceFrame device={device} delay={delay}>
        <ScreenContainer device={device}>
          {showNotch && device === 'iphone' && <Notch />}
          <Screen device={device}>
            {src && <img src={src} alt={alt} loading="lazy" />}
            {children}
          </Screen>
          <ReflectionLayer />
        </ScreenContainer>
      </DeviceFrame>
    </MockupContainer>
  )
}

// Browser window mockup with chrome
export const BrowserMockup = ({ src, alt, children, delay }) => {
  return (
    <MockupContainer>
      <GlowEffect />
      <DeviceFrame delay={delay}>
        <BrowserChrome />
        <Screen>
          {src && <img src={src} alt={alt} loading="lazy" />}
          {children}
        </Screen>
        <ReflectionLayer />
      </DeviceFrame>
    </MockupContainer>
  )
}

const BrowserChrome = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(180deg, #f5f5f7 0%, #ebebed 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const ChromeButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color || '#ddd'};
`

const BrowserChromeDots = () => (
  <>
    <ChromeButton color="#FF5F57" />
    <ChromeButton color="#FFBD2E" />
    <ChromeButton color="#28CA42" />
  </>
)

const BrowserChrome = () => (
  <BrowserChromeContainer>
    <BrowserChromeDots />
    <URLBar>
      <LockIcon>🔒</LockIcon>
      <URLText>futornyi.com</URLText>
    </URLBar>
  </BrowserChromeContainer>
)

const BrowserChromeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(180deg, #f5f5f7 0%, #ebebed 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const URLBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  font-size: 12px;
`

const LockIcon = styled.span`
  font-size: 10px;
`

const URLText = styled.span`
  color: ${tokens.colors.textSecondary};
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: 12px;
`

export default DeviceMockup

