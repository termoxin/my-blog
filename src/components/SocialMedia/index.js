import React from "react"

import { SocialMediaIcon, Anchor } from "./styles"

const SocialMediaItem = ({ href, icon, alt }) => (
  <Anchor href={href} target="_blank">
    <SocialMediaIcon src={icon} alt={alt} />
  </Anchor>
)

const SocialMediaLinks = ({ socialMediaLinks }) => (
  <>
    {socialMediaLinks.map(media => (
      <SocialMediaItem {...media} key={media.alt} />
    ))}
  </>
)

export default SocialMediaLinks
