/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// Custom wrapPageElement for SSR that can handle domain detection
const React = require("react")
const { MDXProvider } = require("@mdx-js/react")

const components = {
  // Add any MDX components here if needed
}

export const wrapPageElement = ({ element, props }) => {
  // Check if we're building for properties domain via environment variable
  const isPropertiesBuild = process.env.GATSBY_PROPERTIES_BUILD === "true"
  
  // If this is properties build and we're on main page, show Properties App
  if (isPropertiesBuild && props.location && props.location.pathname === "/") {
    const PropertiesApp = require("./src/pages/properties-app").default
    return React.createElement(PropertiesApp)
  }
  
  // Check if this is properties-app page
  const isPropertiesPage = props.location && 
    (props.location.pathname === '/properties-app/' || 
     props.location.pathname === '/properties-app')

  if (isPropertiesPage) {
    return element
  }

  const DefaultLayout = require("./src/layouts/default").default
  const GlobalStyles = require("./src/styles/styles.scss")
  
  return React.createElement(
    MDXProvider,
    { components },
    React.createElement(
      DefaultLayout,
      null,
      React.createElement("article", null, element)
    )
  )
}

// Для SSR нужно добавить класс blog-layout по умолчанию
export const onRenderBody = ({ setBodyAttributes, pathname }) => {
  const isPropertiesBuild = process.env.GATSBY_PROPERTIES_BUILD === "true"
  
  const isPropertiesPage = 
    pathname === '/properties-app/' || 
    pathname === '/properties-app' ||
    pathname === '/ebike-calculator' ||
    pathname === '/ebike-calculator/' ||
    (isPropertiesBuild && pathname === "/")
  
  if (!isPropertiesPage) {
    setBodyAttributes({
      className: 'blog-layout'
    })
  }
}
