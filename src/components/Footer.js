import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  FooterWrapper,
  FooterSocialWrapper,
  FooterSocialIcons,
  P,
} from "../elements"

export const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      youtube: file(relativePath: { eq: "youtube.svg" }) {
        publicURL
      }
    }
  `)
  return (
    <FooterWrapper>
      <FooterSocialWrapper>
        <FooterSocialIcons>
          <a
            href="https://www.youtube.com/channel/UCVhISeB9p9XQ-mKM5AWt_ww"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={data.youtube.publicURL} alt="YouTube logo" />
          </a>
        </FooterSocialIcons>
        <P size="xSmall" color="dark3">
          &copy; {new Date().getFullYear()} Acorn. All right reserved.
        </P>
      </FooterSocialWrapper>
    </FooterWrapper>
  )
}
