import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { useForm, ValidationError } from '@formspree/react'

const GlobalReset = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    line-height: 1.6;
    padding: 0 !important;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    border: none;
    text-decoration: none;
  }
`

// Styled components using Tailwind-inspired design
const PropertiesWrapper = styled.div`
  min-height: 100vh;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`

const LogoIcon = styled.div`
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover .logo-animation {
    animation: filterHouses 2s ease-in-out;
  }

  @keyframes filterHouses {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.9);
    }
    75% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`

const AnimatedLogo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .house {
    position: absolute;
    font-size: 0.75rem;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .house-1 { top: 20%; left: 15%; }
  .house-2 { top: 15%; right: 20%; }
  .house-3 { bottom: 25%; left: 20%; }
  .house-4 { bottom: 20%; right: 15%; }
  .house-5 { top: 35%; left: 45%; }
  .house-6 { bottom: 35%; right: 45%; }

  .house-main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    z-index: 10;
    color: #fbbf24;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }

  /* Animation states */
  &.filtering {
    .house:not(.house-main) {
      opacity: 0;
      transform: scale(0.3);
    }
    
    .house-main {
      transform: translate(-50%, -50%) scale(1.2);
      color: #fbbf24;
    }
  }

  &:not(.filtering) {
    .house:not(.house-main) {
      opacity: 0.7;
      transform: scale(1);
    }
    
    .house-main {
      transform: translate(-50%, -50%) scale(1);
      color: white;
    }
  }
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    color: #1e293b;
    
    &:hover {
      color: #4f46e5;
    }
  }
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  background-color: #4f46e5;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
    text-decoration: none;
  }
`

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
`

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #eef2ff, white, white);
`

const HeroContent = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 80rem;
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 6rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 2rem;
  }
`

const HeroGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HeroText = styled.div``

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  .highlight {
    color: #4f46e5;
  }
`

const HeroSubtitle = styled.p`
  margin-top: 1.25rem;
  font-size: 1.125rem;
  color: #475569;

  .bold {
    font-weight: 500;
    color: #1e293b;
  }
`

const HeroButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background-color: #4f46e5;
  padding: 0.75rem 1.25rem;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
    text-decoration: none;
  }
`

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
    text-decoration: none;
  }
`

const HeroNote = styled.p`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
`

const MockupCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 1rem;
`

const MockupContent = styled.div`
  border-radius: 0.75rem;
  background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
  background-size: 24px 24px;
  padding: 1rem;
`

const MockupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MockupTitle = styled.div`
  height: 0.75rem;
  width: 5rem;
  border-radius: 0.25rem;
  background-color: #e2e8f0;
`

const MockupDots = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background-color: #cbd5e1;
  }
`

const MockupGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const MockupPanel = styled.div`
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  padding: 0.75rem;
`

const MockupPanelTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  &.before {
    color: #64748b;
  }

  &.after {
    color: #4f46e5;
  }
`

const MockupItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MockupItem = styled.div`
  position: relative;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: #f1f5f9;

  &.with-price {
    span {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.9);
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: #1e293b;
      border: 1px solid #e2e8f0;
    }
  }
`

const MockupFilters = styled.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;

  span {
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
`

const MockupNote = styled.p`
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
`

const Section = styled.section`
  padding: 4rem 0;

  @media (min-width: 768px) {
    padding: 5rem 0;
  }

  &.bg-gray {
    background-color: #f8fafc;
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  &.cols-3 {
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &.cols-2 {
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

const Card = styled.div`
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  background: white;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    margin-top: 0.5rem;
    color: #475569;
    margin-bottom: 0;
  }

  ul {
    margin-top: 0.75rem;
    list-style: none;
    padding: 0;

    li {
      color: #374151;
      margin-bottom: 0.5rem;
    }
  }
`

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 800;
  text-align: center;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const SectionSubtitle = styled.p`
  margin-top: 0.75rem;
  color: #475569;
  text-align: center;
  margin-bottom: 0;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`

const DemoContainer = styled.div`
  margin-top: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  background: white;
`

const VideoWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #f1f5f9;
`

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
`

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 0.75rem;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
`

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #4f46e5;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`

const LoadingText = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`

const VideoControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 1rem;
    height: 1rem;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }
`

const CallToActionOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  cursor: pointer;

  &:hover {
    backdrop-filter: blur(6px);
    background: rgba(255, 255, 255, 0.15);
  }
`

const PlayButtonLarge = styled.button`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border: none;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
  }

  &:active {
    transform: scale(1.05);
  }

  &:before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 1;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 0.2rem; /* Slight offset to center visually */
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`

const CTAText = styled.div`
  text-align: center;
  color: #1e293b;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
  }
  
  p {
    font-size: 1rem;
    margin: 0;
    opacity: 0.8;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  }
`

const EarlyAccessSection = styled(Section)`
  background: linear-gradient(to bottom, white, #eef2ff);
`

const EarlyAccessContainer = styled(Container)`
  max-width: 48rem;
  text-align: center;
`

const Form = styled.form`
  margin-top: 2rem;
  display: grid;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;
  }
`

const EmailInput = styled.input`
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  padding: 0.75rem 1rem;
  outline: none;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`

const SubmitButton = styled.button`
  border-radius: 0.75rem;
  background-color: #4f46e5;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(14, 165, 233, 0.1);

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%);
    animation: ${pulse} 3s ease-in-out infinite;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
    animation: bounce 1s ease-in-out;
  }

  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0369a1;
    position: relative;
    z-index: 1;
  }

  p {
    margin: 0;
    color: #0f172a;
    font-size: 1rem;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-15px,0);
    }
    70% {
      transform: translate3d(0,-7px,0);
    }
    90% {
      transform: translate3d(0,-3px,0);
    }
  }
`

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
  color: #dc2626;
  font-size: 0.875rem;
`

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-color: #94a3b8;
  }

  .badge {
    background: #fbbf24;
    color: #92400e;
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .icon {
    font-size: 1rem;
  }
`

const FeatureComingSoonBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4338ca;
  margin-left: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
  .icon {
    font-size: 0.875rem;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`

const FAQSection = styled(Section)``

const FAQContainer = styled(Container)`
  max-width: 64rem;
`

const FAQGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FAQItem = styled.details`
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  padding: 1rem;

  summary {
    font-weight: 600;
    cursor: pointer;
  }

  p {
    margin-top: 0.5rem;
    color: #475569;
    margin-bottom: 0;
  }
`

const Footer = styled.footer`
  border-top: 1px solid #e2e8f0;
`

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`

const FooterText = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`

const FooterLinks = styled.div`
  font-size: 0.875rem;
  color: #64748b;

  a {
    color: #64748b;
    
    &:hover {
      color: #4f46e5;
    }
  }

  span {
    margin: 0 0.5rem;
  }
`

const TestimonialsSection = styled(Section)`
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
`

const TestimonialCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  position: relative;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:before {
    content: '"';
    position: absolute;
    top: 0.75rem;
    left: 1rem;
    font-size: 2.5rem;
    color: #4f46e5;
    font-weight: 700;
    line-height: 1;
    z-index: 1;
  }
`

const TestimonialText = styled.p`
  font-style: italic;
  margin: 0.75rem 0 1.5rem 0;
  color: #374151;
  line-height: 1.6;
  font-size: 1rem;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
  
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }
  
  .info {
    flex-grow: 1;
    
    .name {
      font-weight: 600;
      color: #1e293b;
      margin: 0;
      font-size: 0.95rem;
    }
    
    .role {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
      margin-top: 0.125rem;
    }
  }
`

const SupportedSitesGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: center;
`

const SiteLogoCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
  }
  
  .status {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0.25rem 0 0 0;
  }
  
  &.active .status {
    color: #059669;
    font-weight: 500;
  }
  
  &.coming-soon .status {
    color: #d97706;
    font-weight: 500;
  }
`

const StorySection = styled(Section)`
  background: white;
`

const StoryCard = styled.div`
  max-width: 42rem;
  margin: 2rem auto 0;
  background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  
  &:before {
    content: '✨';
    position: absolute;
    top: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    border: 1px solid #e9d5ff;
  }
`

const StoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #581c87;
  margin: 0 0 1rem 0;
`

const StoryText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
`

const StoryStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const StoryStat = styled.div`
  text-align: center;
  
  .number {
    font-size: 2rem;
    font-weight: 800;
    color: #7c3aed;
    display: block;
    line-height: 1;
  }
  
  .label {
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.25rem;
  }
`

const QuickDemoSection = styled(Section)`
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  padding: 3rem 0;
`

const QuickDemoContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
`

const QuickDemoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const QuickDemoStep = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  position: relative;
  
  .step-number {
    position: absolute;
    top: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: #4f46e5;
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1e293b;
  }
  
  p {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
  }
`

const QuickDemoPreview = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
    
    .url-bar {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 0.5rem;
      font-size: 0.875rem;
      color: #64748b;
      flex: 1;
      max-width: 300px;
    }
    
    .browser-dots {
      display: flex;
      gap: 0.5rem;
      
      span {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: #cbd5e1;
      }
    }
  }
  
  .preview-content {
    position: relative;
    min-height: 200px;
    background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    .demo-gif {
      max-width: 100%;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .placeholder {
      padding: 2rem;
      
      .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.7;
      }
      
      h3 {
        color: #4f46e5;
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
      }
      
      p {
        color: #64748b;
        margin: 0;
      }
    }
  }
`

// Icon Components
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
)

const PropertiesApp = () => {
  const [currentYear, setCurrentYear] = useState(2024)
  const [videoLoading, setVideoLoading] = useState(true)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  
  // Formspree integration
  const [state, handleSubmit] = useForm("xnnbayzb")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    
    // Auto-play logo animation every 4 seconds
    const logoInterval = setInterval(() => {
      setIsFiltering(true)
      setTimeout(() => setIsFiltering(false), 1500)
    }, 4000)

    return () => clearInterval(logoInterval)
  }, [])

  const handleLogoClick = () => {
    setIsFiltering(true)
    setTimeout(() => setIsFiltering(false), 1500)
  }

  const handleVideoLoad = () => {
    setVideoLoading(false)
  }

  const handleVideoPlay = () => {
    setVideoPlaying(true)
    setHasStartedPlaying(true)
  }

  const handleVideoPause = () => {
    setVideoPlaying(false)
  }

  const togglePlay = () => {
    const video = document.getElementById('demo-video')
    if (video) {
      if (videoPlaying) {
        video.pause()
      } else {
        video.play()
        setHasStartedPlaying(true)
      }
    }
  }



  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <PropertiesWrapper>
      <Helmet>
        <title>Properties — Spitogatos Filters Extension | Greek Property Search Tool</title>
        <meta name="description" content="Spitogatos filters extension for Greek property search. Sort by €/m², hide duplicates, export to CSV. Smarter filters for Spitogatos, XE.gr, and other real estate sites in Greece." />
        <meta name="keywords" content="Spitogatos filters extension, Greek property search tool, real estate filters Greece, property search Athens, Spitogatos enhancement, XE.gr filters, Greek real estate tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Properties — Spitogatos Filters Extension | Greek Property Search Tool" />
        <meta property="og:description" content="Transform your Greek property search with smart filters for Spitogatos and other real estate sites. Find the perfect property 3× faster." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <GlobalReset />

      {/* Header */}
      <Header>
        <HeaderContent>
          <Logo href="#" onClick={() => scrollToSection('hero')}>
            <LogoIcon onClick={handleLogoClick}>
              <AnimatedLogo className={isFiltering ? 'filtering' : ''}>
                <div className="house house-1">🏠</div>
                <div className="house house-2">🏘️</div>
                <div className="house house-3">🏠</div>
                <div className="house house-4">🏘️</div>
                <div className="house house-5">🏠</div>
                <div className="house house-6">🏘️</div>
                <div className="house house-main">🏡</div>
              </AnimatedLogo>
            </LogoIcon>
            <span>Properties</span>
          </Logo>
          <Nav>
            <a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo') }}>Demo</a>
            <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits') }}>Benefits</a>
            <a href="#for-whom" onClick={(e) => { e.preventDefault(); scrollToSection('for-whom') }}>For whom</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq') }}>FAQ</a>
          </Nav>
          <CTAButton href="#early-access" onClick={(e) => { e.preventDefault(); scrollToSection('early-access') }}>
            Get Early Access
          </CTAButton>
        </HeaderContent>
      </Header>

      {/* Hero */}
      <HeroSection id="hero">
        <HeroBackground />
        <HeroContent>
          <HeroGrid>
            <HeroText>
              <HeroTitle>
                Stop wasting hours scrolling listings.<br />
                <span className="highlight">Find the right property in minutes.</span>
              </HeroTitle>
              <HeroSubtitle>
                The ultimate Spitogatos filters extension and Greek property search tool. 
                <span className="bold"> Sort by €/m²</span>, hide duplicates, export to CSV — enhance your favorite real estate sites instantly.
              </HeroSubtitle>
              <HeroButtons>
                <PrimaryButton href="#early-access" onClick={(e) => { e.preventDefault(); scrollToSection('early-access') }}>
                  Join Early Access
                </PrimaryButton>
                <SecondaryButton href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo') }}>
                  ▶️ See It In Action
                </SecondaryButton>
              </HeroButtons>
              <HeroNote>Early access €9/mo (founders pricing). Beta testers get FREE access. Cancel anytime.</HeroNote>
            </HeroText>

            {/* Mockup card */}
            <MockupCard>
              <MockupContent>
                <MockupHeader>
                  <MockupTitle />
                  <MockupDots>
                    <span />
                    <span />
                    <span />
                  </MockupDots>
                </MockupHeader>
                <MockupGrid>
                  {/* Left (Before) */}
                  <MockupPanel>
                    <MockupPanelTitle className="before">Before (default site)</MockupPanelTitle>
                    <MockupItems>
                      <MockupItem style={{ 
                        backgroundImage: 'url(/spitogatos/a-1.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }} />
                      <MockupItem style={{ 
                        backgroundImage: 'url(/spitogatos/a-2.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }} />
                      <MockupItem style={{ 
                        backgroundImage: 'url(/spitogatos/a-3.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }} />
                    </MockupItems>
                  </MockupPanel>
                  {/* Right (After) */}
                  <MockupPanel>
                    <MockupPanelTitle className="after">After (with Properties)</MockupPanelTitle>
                    <MockupItems>
                      <MockupItem className="with-price" style={{ 
                        backgroundImage: 'url(/spitogatos/a-1.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}>
                        <span>€2,250 / m²</span>
                      </MockupItem>
                      <MockupItem className="with-price" style={{ 
                        backgroundImage: 'url(/spitogatos/a-2.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}>
                        <span>€1,980 / m²</span>
                      </MockupItem>
                      <MockupItem className="with-price" style={{ 
                        backgroundImage: 'url(/spitogatos/a-3.webp)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}>
                        <span>€2,120 / m²</span>
                      </MockupItem>
                    </MockupItems>
                    <MockupFilters>
                      <span>Year ≥ 2000</span>
                      <span>Hide ground floor</span>
                      <span>No duplicates</span>
                    </MockupFilters>
                  </MockupPanel>
                </MockupGrid>
              </MockupContent>
              <MockupNote>Visual mockup — real extension overlays these tools on the listings page.</MockupNote>
            </MockupCard>
          </HeroGrid>
        </HeroContent>
      </HeroSection>

      {/* Benefits */}
      <Section id="benefits">
        <Container>
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}>
            <Card>
              <h3>Save hours</h3>
              <p>Cut through noise with smarter filters and instant visual cues. No more endless scrolling.</p>
            </Card>
            <Card>
              <h3>See €/m² instantly</h3>
              <p>True value at a glance. Sort by €/m² even when the site doesn't support it.</p>
            </Card>
            <Card>
              <h3>Export to CSV</h3>
              <p>Shortlist and share with clients or teammates in one click.</p>
              <div style={{ marginTop: '0.75rem' }}>
                <FeatureComingSoonBadge><span className="icon">🚀</span>Coming Soon</FeatureComingSoonBadge>
              </div>
            </Card>
            <Card>
              <h3>Smart Price Alerts</h3>
              <p>Get email notifications when properties within your €/m² range become available.</p>
              <div style={{ marginTop: '0.75rem' }}>
                <FeatureComingSoonBadge><span className="icon">⏰</span>Coming Soon</FeatureComingSoonBadge>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* User Story */}
      <StorySection id="success-story">
        <Container>
          <StoryCard>
            <StoryTitle>Real Results from Beta Users</StoryTitle>
            <StoryText>
              "Maria was spending 3-4 hours every weekend scrolling through hundreds of Athens apartments. With Properties, she found her perfect 2-bedroom in Kolonaki in just 45 minutes — sorted by €/m², filtered out ground floors, and exported her top 5 picks to share with her partner."
            </StoryText>
            <StoryStats>
              <StoryStat>
                <span className="number">3×</span>
                <div className="label">Faster search</div>
              </StoryStat>
              <StoryStat>
                <span className="number">45min</span>
                <div className="label">Instead of 3+ hours</div>
              </StoryStat>
              <StoryStat>
                <span className="number">€2,100/m²</span>
                <div className="label">Perfect value match</div>
              </StoryStat>
            </StoryStats>
          </StoryCard>
        </Container>
      </StorySection>

      {/* Testimonials & Social Proof */}
      <TestimonialsSection id="testimonials">
        <Container>
          <SectionTitle>Trusted by Property Professionals</SectionTitle>
          <SectionSubtitle>Beta testers and real estate professionals across Greece are already saving hours with Properties</SectionSubtitle>
          
          <div style={{ 
            marginTop: '2rem',
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: '1fr',
          }}>
            <div style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              '@media (min-width: 768px)': {
                gridTemplateColumns: '1fr 1fr'
              }
            }}>
              <TestimonialCard>
                <TestimonialText>
                  This extension is a game-changer! Finally I can sort by €/m² on Spitogatos. The advanced filtering saves me hours every week.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">NK</div>
                  <div className="info">
                    <p className="name">Nikos K.</p>
                    <p className="role">Real Estate Agent, Athens</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
              
              <TestimonialCard>
                <TestimonialText>
                  As a busy professional, I don't have time to scroll through duplicates and poorly filtered results. Properties cuts my search time by 70%. Absolutely worth it.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">SP</div>
                  <div className="info">
                    <p className="name">Sofia P.</p>
                    <p className="role">Software Engineer, Thessaloniki</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
              
              <TestimonialCard>
                <TestimonialText>
                  I was manually calculating €/m² for every listing! This saves me hours each week. The duplicate removal feature alone is worth the subscription.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">MH</div>
                  <div className="info">
                    <p className="name">Maria H.</p>
                    <p className="role">Property Investor, Athens</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
              
              <TestimonialCard>
                <TestimonialText>
                  Perfect for busy families! We found our dream home in Glyfada without wasting weekends scrolling. The advanced filters are exactly what we needed.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">DP</div>
                  <div className="info">
                    <p className="name">Dimitris P.</p>
                    <p className="role">Family Buyer, Athens</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
              
              <TestimonialCard>
                <TestimonialText>
                  As a property manager handling multiple clients, the advanced filters and €/m² sorting help me quickly identify the best opportunities for each client's budget.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">EK</div>
                  <div className="info">
                    <p className="name">Elena K.</p>
                    <p className="role">Property Manager, Thessaloniki</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
              
              <TestimonialCard>
                <TestimonialText>
                  Finally! No more ground floor apartments in my search results. The filtering options are spot-on for what real buyers actually need.
                </TestimonialText>
                <TestimonialAuthor>
                  <div className="avatar">AS</div>
                  <div className="info">
                    <p className="name">Andreas S.</p>
                    <p className="role">First-time Buyer, Patras</p>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <SectionTitle style={{ fontSize: '1.5rem' }}>Supported Real Estate Sites</SectionTitle>
            <SupportedSitesGrid>
              <SiteLogoCard className="active">
                <span className="logo">🏠</span>
                <p className="name">Spitogatos</p>
                <p className="status">✅ Active</p>
              </SiteLogoCard>
              <SiteLogoCard className="coming-soon">
                <span className="logo">🏡</span>
                <p className="name">XE.gr</p>
                <p className="status">🚀 Coming Soon</p>
              </SiteLogoCard>
              <SiteLogoCard className="coming-soon">
                <span className="logo">🏢</span>
                <p className="name">Spiti.gr</p>
                <p className="status">🚀 Coming Soon</p>
              </SiteLogoCard>
              <SiteLogoCard className="coming-soon">
                <span className="logo">🏘️</span>
                <p className="name">Idealista</p>
                <p className="status">🚀 Coming Soon</p>
              </SiteLogoCard>
              <SiteLogoCard className="coming-soon">
                <span className="logo">🏰</span>
                <p className="name">Golden Home</p>
                <p className="status">🚀 Coming Soon</p>
              </SiteLogoCard>
              <SiteLogoCard className="coming-soon">
                <span className="logo">🏗️</span>
                <p className="name">Century 21</p>
                <p className="status">🚀 Coming Soon</p>
              </SiteLogoCard>
            </SupportedSitesGrid>
          </div>
        </Container>
      </TestimonialsSection>

      {/* For whom */}
      <Section id="for-whom" className="bg-gray">
        <Container>
          <Grid className="cols-2">
            <Card>
              <h3>For Agents</h3>
              <ul>
                <li>• Shortlist best listings by €/m² and year in seconds</li>
                <li>• Hide duplicates and low-quality posts automatically</li>
                <li>• Export CSV and share with clients</li>
              </ul>
            </Card>
            <Card>
              <h3>For Buyers & Renters</h3>
              <ul>
                <li>• Cut out irrelevant listings (no more basements)</li>
                <li>• See real value with €/m² labels</li>
                <li>• Save your favorite filter presets</li>
              </ul>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Demo */}
      <Section id="demo">
        <Container>
          <SectionTitle>How it looks</SectionTitle>
          <SectionSubtitle>A lightweight Chrome extension that augments your existing real estate sites with smarter filters and insights.</SectionSubtitle>
          <DemoContainer>
            <VideoWrapper
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <VideoPlayer
                id="demo-video"
                src="/spitogatos/demo.webm"
                onLoadedData={handleVideoLoad}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                controls={false}
                preload="metadata"
                muted
                loop
              />
              
              <LoadingOverlay show={videoLoading}>
                <Spinner />
                <LoadingText>
                  Loading demo video...<br />
                  <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    This might take a moment
                  </small>
                </LoadingText>
              </LoadingOverlay>

              <CallToActionOverlay 
                show={!videoLoading && !hasStartedPlaying}
                onClick={togglePlay}
              >
                <PlayButtonLarge onClick={togglePlay}>
                  <PlayIcon />
                </PlayButtonLarge>
                <CTAText>
                  <h3>See How It Works</h3>
                  <p>Click here to watch the demo</p>
                </CTAText>
              </CallToActionOverlay>

              <VideoControls show={showControls && !videoLoading && hasStartedPlaying}>
                <PlayButton onClick={togglePlay}>
                  {videoPlaying ? <PauseIcon /> : <PlayIcon />}
                </PlayButton>
                <div style={{ color: 'white', fontSize: '0.75rem' }}>
                  Click to {videoPlaying ? 'pause' : 'play'}
                </div>
              </VideoControls>
            </VideoWrapper>
          </DemoContainer>
        </Container>
      </Section>

      {/* Early Access */}
      <EarlyAccessSection id="early-access">
        <EarlyAccessContainer>
          <SectionTitle>Early Access</SectionTitle>
          <SectionSubtitle>
            Founders pricing <strong>€9/mo</strong> (monthly billing, cancel anytime). Limited spots while we finish the first release. <br/>
            <small style={{ color: '#64748b', marginTop: '0.5rem', display: 'block' }}>
              Annual plans with discounts will be available at full launch
            </small>
            <br/>
            <small style={{ color: '#059669', marginTop: '0.5rem', display: 'block', fontWeight: '600' }}>
              🎯 Beta testers get <strong>FREE access</strong> during testing period
            </small>
          </SectionSubtitle>

          {state.succeeded ? (
            <SuccessMessage>
              <span className="icon">✨</span>
              <h3>You're in! Welcome to Early Access</h3>
              <p>Thanks for joining! We'll reach out with your private install link & setup guide within 24 hours. Get ready to transform your property search experience.</p>
            </SuccessMessage>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <EmailInput
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
                <SubmitButton type="submit" disabled={state.submitting}>
                  {state.submitting ? 'Joining...' : 'Get Early Access'}
                </SubmitButton>
              </Form>

              <HeroNote style={{ marginTop: '0.75rem' }}>
                We'll reach out with a private install link & setup guide.
              </HeroNote>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <ComingSoonBadge>
                  <span className="icon">💳</span>
                  Reserve Whitelist with Stripe
                  <span className="badge">Coming Soon</span>
                </ComingSoonBadge>
              </div>
            </>
          )}
        </EarlyAccessContainer>
      </EarlyAccessSection>

      {/* FAQ */}
      <FAQSection id="faq">
        <FAQContainer>
          <SectionTitle>FAQ</SectionTitle>
          <FAQGrid>
            <FAQItem>
              <summary>Does it change the website's code?</summary>
              <p>No. It overlays UI and reads public information from the page to add smarter filtering and display €/m².</p>
            </FAQItem>
            <FAQItem>
              <summary>Which sites are supported?</summary>
              <p>We're starting with <strong>Spitogatos</strong>. Next up: <strong>Spiti</strong>, <strong>XE</strong>, <strong>Idealista</strong>, <strong>HomeGreekHome</strong>, <strong>Golden Home</strong>, <strong>Tospitimou</strong>, and <strong>Century 21 Greece</strong>. Have a favorite site we haven't mentioned? <a href="mailto:rostyslav.futornyi@gmail.com?subject=Site Request" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Email us</a> and we'll add it to our community-driven roadmap!</p>
            </FAQItem>
            <FAQItem>
              <summary>Will there be a free tier?</summary>
              <p>Yes. Core features are free; Pro adds CSV export, duplicate cleanup, and multi-presets.</p>
            </FAQItem>
            <FAQItem>
              <summary>Can I cancel anytime?</summary>
              <p>Yes. Early Access is month-to-month, cancel anytime.</p>
            </FAQItem>
            <FAQItem>
              <summary>Is there a free option for beta testers?</summary>
              <p>Absolutely! Beta testers who provide feedback get <strong>FREE access</strong> during the testing period. Just mention "beta tester" when we contact you.</p>
            </FAQItem>
            <FAQItem>
              <summary>Will there be price alerts for €/m² ranges?</summary>
              <p>Yes! <strong>Email notifications are coming soon.</strong> You'll be able to set price ranges (e.g., €1,800-€2,000 per m²) and get notified when matching properties become available. Perfect for staying on top of the market without constantly checking.</p>
            </FAQItem>
            <FAQItem>
              <summary>How can I contact you directly?</summary>
              <p>For questions, feedback, or beta testing inquiries, reach out via:</p>
              <p>📧 Email: <a href="mailto:rostyslav.futornyi@gmail.com" style={{ color: '#4f46e5', textDecoration: 'underline' }}>rostyslav.futornyi@gmail.com</a></p>
              <p>💬 Telegram: <a href="https://t.me/termoxin" style={{ color: '#4f46e5', textDecoration: 'underline' }}>@termoxin</a></p>
            </FAQItem>
          </FAQGrid>
        </FAQContainer>
      </FAQSection>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterText>© {currentYear} Properties by Futornyi. All rights reserved.</FooterText>
          <FooterLinks>
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Terms</a>
            <span>·</span>
            <a href="mailto:rostyslav.futornyi@gmail.com">rostyslav.futornyi@gmail.com</a>
            <span>·</span>
            <a href="https://t.me/termoxin">@termoxin</a>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </PropertiesWrapper>
  )
}

export default PropertiesApp
