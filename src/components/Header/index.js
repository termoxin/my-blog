import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Location } from "@reach/router"

import SocialMediaLinks from "../SocialMedia"
import {
  HeaderWrapper,
  HeaderInner,
  AvatarLink,
  Avatar,
  HeaderLabel,
  SocialWrapper,
  ChristmasHat,
} from "./styles"

const Header = ({ avatar, christmasHat, socialMediaData }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  const visibleLinks = socialMediaData.filter(
    socialMedia => !socialMedia.isTakeCarLogo
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showChristmasHat = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 11, 1);
    const end = new Date(now.getFullYear() + 1, 0, 7); 
    return now >= start && now <= end;
  }

  return (
    <HeaderWrapper scrolled={isScrolled}>
      <Location>
        {({ location }) => {
          const isHome = location.pathname === "/"
          const isAbout = location.pathname === "/about/" || location.pathname === "/about"
          
          // Avatar always goes to /about unless we're already on about page
          const avatarLink = isAbout ? "/" : "/about/"
          const avatarLabel = isAbout ? "Home" : "About"
          
          return (
            <HeaderInner>
              <AvatarLink to={avatarLink}>
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={avatar}
                    alt="Rostyslav Futornyi"
                    scrolled={isScrolled}
                  />
                  {showChristmasHat() && <ChristmasHat 
                    alt="Christmas hat"
                    src={christmasHat}
                    scrolled={isScrolled}
                  />}
                </div>
                <HeaderLabel scrolled={isScrolled}>
                  {avatarLabel}
                </HeaderLabel>
              </AvatarLink>
              
              <SocialWrapper scrolled={isScrolled}>
                <SocialMediaLinks socialMediaLinks={visibleLinks} />
              </SocialWrapper>
            </HeaderInner>
          )
        }}
      </Location>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  avatar: PropTypes.string,
  christmasHat: PropTypes.string,
  socialMediaData: PropTypes.array,
}

Header.defaultProps = {
  avatar: ``,
  christmasHat: ``,
  socialMediaData: [],
}

export default Header
