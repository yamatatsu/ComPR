import React, { PropsWithChildren, ReactElement } from "react"
import { BaseStyles, theme } from "@primer/components"
import { ThemeProvider } from "styled-components"

export function Theme(props: PropsWithChildren<{}>): ReactElement {
  const { children } = props
  return (
    <BaseStyles>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BaseStyles>
  )
}
