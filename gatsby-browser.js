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
  // Редирект для поддомена properties
  if (typeof window !== "undefined" && window.location.hostname === "properties.futornyi.com") {
    if (window.location.pathname === "/") {
      window.location.replace("/properties-app");
    }
  }
}

export const onRouteUpdate = ({ location }) => {
  // Добавляем/убираем класс blog-layout в зависимости от страницы
  if (typeof window !== "undefined") {
    const isPropertiesPage = 
      location.pathname === '/properties-app/' || 
      location.pathname === '/properties-app' ||
      window.location.hostname === "properties.futornyi.com"
    
    if (isPropertiesPage) {
      document.body.classList.remove('blog-layout')
    } else {
      document.body.classList.add('blog-layout')
    }
  }
}

export const wrapPageElement = ({ element, props }) => {
  // Проверяем, если это страница properties-app или поддомен properties, не оборачиваем в DefaultLayout
  const isPropertiesPage = props.location && 
    (props.location.pathname === '/properties-app/' || 
     props.location.pathname === '/properties-app' ||
     (typeof window !== "undefined" && window.location.hostname === "properties.futornyi.com"))

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
