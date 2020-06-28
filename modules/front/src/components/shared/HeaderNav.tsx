import React, { FunctionComponent } from "react"
import {
  Box,
  CircleOcticon,
  Flex,
  Text,
  SelectMenu,
  Button,
} from "@primer/components"
import { GitPullRequest } from "@primer/octicons-react"

export const HeaderNav: FunctionComponent = () => {
  return (
    <Box
      width="100vw"
      height="56px"
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
  )
}
