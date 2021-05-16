import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import dracula from "prism-react-renderer/themes/dracula"

export default ({ children, className }) => {
  const language = className.replace(/language-/, "")

  const customProps = {
    code: children.trim(),
    language: language,
    theme: dracula,
  }

  return (
    <Highlight {...defaultProps} {...customProps}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
