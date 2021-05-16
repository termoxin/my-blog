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

const GlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin:0;
    box-sizing: border-box;
  }
`

const components = {
  code: CodeBlock,
  Divider,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <DefaultLayout>
      <article>{element}</article>
      <GlobalStyles />
    </DefaultLayout>
  </MDXProvider>
)
