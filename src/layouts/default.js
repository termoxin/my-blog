/**
 * Default layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../components/Header"
import Footer from "../components/Footer"

import "../styles/styles.scss"

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            githubUrl
            youtubeUrl
            telegramUrl
            takeCarUrl
          }
        }

        avatar: file(relativePath: { eq: "avatar.jpeg" }) {
          publicURL
        }

        telegram: file(relativePath: { eq: "telegram.svg" }) {
          publicURL
        }

        github: file(relativePath: { eq: "github.svg" }) {
          publicURL
        }

        youtube: file(relativePath: { eq: "youtube.svg" }) {
          publicURL
        }

        takecar: file(relativePath: { eq: "takecar.svg" }) {
          publicURL
        }
      }
    `}
    render={({ avatar, site, telegram, github, youtube, takecar }) => {
      const socialMediaData = [
        {
          href: site.siteMetadata.githubUrl,
          icon: github.publicURL,
          alt: "Github link",
          width: 16,
          height: 16,
        },
        {
          href: site.siteMetadata.youtubeUrl,
          icon: youtube.publicURL,
          alt: "Youtube link",
          width: 16,
          height: 16,
        },
        {
          href: site.siteMetadata.telegramUrl,
          icon: telegram.publicURL,
          alt: "Telegram link",
          width: 16,
          height: 16,
        },
        {
          href: site.siteMetadata.takeCarUrl,
          icon: takecar.publicURL,
          alt: "Takecar link",
          isTakeCarLogo: true,
        },
      ]

      return (
        <>
          <Header avatar={avatar.publicURL} socialMediaData={socialMediaData} />
          <div id="content">{children}</div>
          <Footer siteTitle={site.siteMetadata.title} />
        </>
      )
    }}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
