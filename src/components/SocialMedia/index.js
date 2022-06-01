import React from "react"

import { Anchor, Wrapper } from "./styles"

const SocialMediaItem = ({ width, height, href, icon, alt }) => (
  <Anchor href={href} target="_blank">
    <img src={icon} alt={alt} width={width} height={height} />
  </Anchor>
)

const SocialMediaLinks = ({ socialMediaLinks }) => (
  <Wrapper>
    {socialMediaLinks.map(media => (
      <SocialMediaItem {...media} key={media.alt} />
    ))}
  </Wrapper>
)

export default SocialMediaLinks
