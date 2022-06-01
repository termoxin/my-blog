import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"

import SocialMediaLinks from "../SocialMedia"
import { Avatar, HeaderContent, TakeCarLink } from "./styles"

const Header = ({ avatar, socialMediaData }) => {
  const visibleLinks = socialMediaData.filter(
    socialMedia => !socialMedia.isTakeCarLogo
  )

  const takeCarLogo = socialMediaData.find(
    socialMedia => socialMedia.isTakeCarLogo
  )

  const takeCarLink = (
    <TakeCarLink href={takeCarLogo.href} target="__blank">
      <img
        src={takeCarLogo.icon}
        alt={takeCarLogo.alt}
        width={100}
        height={50}
      />
    </TakeCarLink>
  )

  return (
    <header className="logo">
      <Location>
        {({ location }) => {
          return location.pathname === "/" ? (
            <HeaderContent>
              <Link to="/about/">
                <Avatar
                  src={avatar}
                  alt="Rostyslav Futornyi smiling"
                  height={120}
                  width={120}
                />
              </Link>
              {takeCarLink}
              <span className="logo-prompt code">About the Author</span>
            </HeaderContent>
          ) : (
            <HeaderContent>
              <Link to="/">
                <Avatar src={avatar} alt="Rostyslav Futornyi smiling" />
              </Link>
              {takeCarLink}
              <span className="logo-prompt code">Back Home</span>
            </HeaderContent>
          )
        }}
      </Location>
      <SocialMediaLinks socialMediaLinks={visibleLinks} />
    </header>
  )
}

Header.propTypes = {
  avatar: PropTypes.string,
}

Header.defaultProps = {
  avatar: ``,
}

export default Header
