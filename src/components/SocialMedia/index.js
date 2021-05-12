import React from "react"

import { SocialMediaIcon } from "./styles"

const SocialMediaItem = ({ href, icon, alt }) => (
  <a href={href} target="_blank">
    <SocialMediaIcon src={icon} alt={alt} />
  </a>
)

const SocialMediaLinks = ({ socialMediaLinks }) => (
  <>
    {socialMediaLinks.map(media => (
      <SocialMediaItem {...media} />
    ))}
  </>
)

export default SocialMediaLinks
