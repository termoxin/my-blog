/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

export { wrapPageElement, onRouteUpdate } from "./gatsby-browser"

// Для SSR нужно добавить класс blog-layout по умолчанию
export const onRenderBody = ({ setBodyAttributes, pathname }) => {
  const isPropertiesPage = 
    pathname === '/properties-app/' || 
    pathname === '/properties-app' ||
    pathname === '/properties-index/' || 
    pathname === '/properties-index'
  
  if (!isPropertiesPage) {
    setBodyAttributes({
      className: 'blog-layout'
    })
  }
}
