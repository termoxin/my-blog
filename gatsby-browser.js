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
  Divider,
  Spacer,
  h2: Heading2,
}

export const wrapPageElement = ({ element }) => (
  <MDXProvider components={components}>
    <DefaultLayout>
      <article>{element}</article>
      <GlobalStyles />
    </DefaultLayout>
  </MDXProvider>
)
