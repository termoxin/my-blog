/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { createGlobalStyle } from "styled-components"

import DefaultLayout from "./src/layouts/default"

const GlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    padding: 0;
    margin:0;
    box-sizing: border-box;
  }
`

export const wrapRootElement = ({ element }) => (
  <MDXProvider>
    <DefaultLayout>
      <article>{element}</article>
      <GlobalStyles />
    </DefaultLayout>
  </MDXProvider>
)
