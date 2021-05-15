/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { MDXProvider } from "@mdx-js/react"
import React from "react"

import DefaultLayout from "./src/layouts/default"

export const wrapRootElement = ({ element }) => (
  <MDXProvider>
    <DefaultLayout>
      <article>{element}</article>
    </DefaultLayout>
  </MDXProvider>
)
