import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { tokens } from "../theme/tokens"

const FooterWrapper = styled.footer`
  width: 100%;
  border-top: 1px solid ${tokens.colors.borderLight};
  background: ${tokens.colors.bgSecondary};
  margin-top: ${tokens.spacing['6xl']};
`

const FooterInner = styled.div`
  max-width: ${tokens.maxWidth.wide};
  margin: 0 auto;
  padding: ${tokens.spacing['3xl']} ${tokens.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.spacing.lg};
  
  @media (max-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing['2xl']} ${tokens.spacing.lg};
  }
`

const FooterText = styled.p`
  font-family: ${tokens.typography.fontFamily.sans};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.regular};
  color: ${tokens.colors.textSecondary};
  margin: 0;
  text-align: center;
`

const FooterLink = styled.a`
  color: ${tokens.colors.textSecondary};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};
  
  &:hover {
    color: ${tokens.colors.brandPurple};
  }
`

const Footer = ({ siteTitle }) => (
  <FooterWrapper>
    <FooterInner>
      <FooterText>
        &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
      </FooterText>
      <FooterText>
        Built with love and{" "}
        <FooterLink href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">
          Gatsby
        </FooterLink>
      </FooterText>
    </FooterInner>
  </FooterWrapper>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
