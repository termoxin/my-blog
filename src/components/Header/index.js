import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"

import SocialMediaLinks from "../SocialMedia"
import {
  Avatar,
  HeaderContent,
  IdeasButton,
  ChristmasHat,
} from "./styles"

const Header = ({ avatar, christmasHat, socialMediaData }) => {
  const visibleLinks = socialMediaData.filter(
    socialMedia => !socialMedia.isTakeCarLogo
  )

  const onClickIdeasButton = () => {
    window.open(
      "https://excellent-life.notion.site/Ideas-d9db6986f22f4107b427589835bbf729?pvs=4",
      "_blank"
    )
  }

  const showChristmasHat = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 11, 1);
    const end = new Date(now.getFullYear() + 1, 0, 7); 
    return now >= start && now <= end;
  }

  return (
    <header className="logo">
      <Location>
        {({ location }) => {
          return location.pathname === "/" ? (
            <HeaderContent>
              <Link to="/about/">
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={avatar}
                    alt="Rostyslav Futornyi smiling"
                    height={120}
                    width={120}
                  />
                  {showChristmasHat() && <ChristmasHat 
                    alt="Christmas hat"
                    height={48}
                    width={48}
                    src={christmasHat}
                  />}
                </div>
              </Link>
              {/* {takeCarLink} */}
              <IdeasButton onClick={onClickIdeasButton}>
                {" "}
                💡 View Current Ideas
              </IdeasButton>
              <span className="logo-prompt code">About the Author</span>
            </HeaderContent>
          ) : (
            <HeaderContent>
              <Link to="/">
               <div style={{ position: "relative" }}>
               <Avatar src={avatar} alt="Rostyslav Futornyi smiling" />
                {showChristmasHat() && <ChristmasHat 
                  alt="Christmas hat"
                  height={48}
                  width={48}
                  src={christmasHat}
                />}
              </div>
              </Link>
              {/* {takeCarLink} */}
              <IdeasButton onClick={onClickIdeasButton}>
                💡 View Current Ideas
              </IdeasButton>
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
