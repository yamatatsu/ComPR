import React, { FunctionComponent } from "react"
import {
  BaseStyles,
  theme,
  Box,
  CircleOcticon,
  Flex,
  Text,
  SelectMenu,
  Button,
} from "@primer/components"
import { GitPullRequest } from "@primer/octicons-react"
import { ThemeProvider } from "styled-components"

export const Template: FunctionComponent = ({ children }) => {
  return (
    <BaseStyles>
      <ThemeProvider theme={theme}>
        <div style={{ position: "sticky" }}>
          <Box
            width="100vw"
            backgroundColor="bodytext"
            color="white"
            px={16}
            as={Flex}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box as={Flex} alignItems="center">
              <CircleOcticon icon={GitPullRequest} size={32} />
              <Text as="p" ml={16}>
                CooPRate
              </Text>
            </Box>
            <SelectMenu>
              <Button as="summary">User</Button>
              <SelectMenu.Modal align="right">
                <SelectMenu.List>
                  <SelectMenu.Item href="#">Sign out</SelectMenu.Item>
                </SelectMenu.List>
              </SelectMenu.Modal>
            </SelectMenu>
          </Box>
        </div>
        {children}
      </ThemeProvider>
    </BaseStyles>
  )
}
