import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"

import SocialMediaLinks from "../SocialMedia"
import { Avatar } from "./styles"

const Header = ({ avatar, socialMediaData }) => (
  <header className="logo">
    <Location>
      {({ location }) => {
        return location.pathname === "/" ? (
          <div>
            <Link to="/about/">
              <Avatar
                src={avatar}
                alt="Rostyslav Futornyi smiling"
                height={120}
                width={120}
              />
            </Link>
            <span className="logo-prompt code">About the Author</span>
          </div>
        ) : (
          <div>
            <Link to="/">
              <Avatar src={avatar} alt="Rostyslav Futornyi smiling" />
            </Link>
            <span className="logo-prompt code">Back Home</span>
          </div>
        )
      }}
    </Location>
    <SocialMediaLinks socialMediaLinks={socialMediaData} />
  </header>
)

Header.propTypes = {
  avatar: PropTypes.string,
}

Header.defaultProps = {
  avatar: ``,
}

export default Header
