import React, { FunctionComponent } from "react"
import { BaseStyles, theme } from "@primer/components"
import { ThemeProvider } from "styled-components"

export const Template: FunctionComponent = ({ children }) => {
  return (
    <BaseStyles>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BaseStyles>
  )
}
