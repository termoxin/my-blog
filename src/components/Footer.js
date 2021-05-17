import React from "react"
import PropTypes from "prop-types"

const Footer = ({ siteTitle }) => (
  <div className="footer">
    <span className="block">
      &copy; {new Date().getFullYear()} {siteTitle}. All Rights Reserved.
    </span>
  </div>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
