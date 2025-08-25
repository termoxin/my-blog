/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { createGlobalStyle } from "styled-components"

import DefaultLayout from "./src/layouts/default"
import CodeBlock from "./src/components/CodeBlock"
import Divider from "./src/components/Divider"
import Spacer from "./src/components/Spacer"
import { Carousel } from "./src/components/Carousel"

const GlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin:0;
    box-sizing: border-box;
  }

  a {
    border: none;
  }
`

const kebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()

const Heading2 = ({ children }) => {
  const id = kebabCase(children).replace(/,/g, "")

  return (
    <h2 id={id}>
      <a href={`#${id}`} style={{ color: "#d9d9d9", border: "none" }}>
        {`# `}
      </a>
      {children}
    </h2>
  )
}

const components = {
  code: CodeBlock,
  Carousel: Carousel,
  Divider,
  Spacer,
  h2: Heading2,
}

export const onClientEntry = () => {
  // Больше никаких редиректов - просто управляем отображением
}

export const onRouteUpdate = ({ location }) => {
  // Добавляем/убираем класс blog-layout в зависимости от страницы
  if (typeof window !== "undefined") {
    const isPropertiesPage = 
      location.pathname === '/properties-app/' || 
      location.pathname === '/properties-app' ||
      location.pathname === '/properties-index/' || 
      location.pathname === '/properties-index' ||
      window.location.hostname === "properties.futornyi.com"
    
    if (isPropertiesPage) {
      document.body.classList.remove('blog-layout')
    } else {
      document.body.classList.add('blog-layout')
    }
  }
}

export const wrapPageElement = ({ element, props }) => {
  // Если мы на поддомене properties и на главной странице, показываем Properties App
  if (typeof window !== "undefined" && 
      window.location.hostname === "properties.futornyi.com" && 
      props.location && props.location.pathname === "/") {
    // Динамически импортируем и возвращаем Properties App
    const PropertiesApp = require("./src/pages/properties-app").default
    return React.createElement(PropertiesApp)
  }

  // Проверяем, если это страница properties-app/properties-index, не оборачиваем в DefaultLayout
  const isPropertiesPage = props.location && 
    (props.location.pathname === '/properties-app/' || 
     props.location.pathname === '/properties-app' ||
     props.location.pathname === '/properties-index/' || 
     props.location.pathname === '/properties-index')

  if (isPropertiesPage) {
    return element
  }

  return (
    <MDXProvider components={components}>
      <DefaultLayout>
        <article>{element}</article>
        <GlobalStyles />
      </DefaultLayout>
    </MDXProvider>
  )
}
