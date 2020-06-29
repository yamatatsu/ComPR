import React from "react"
import { Sticky, Box } from "@primer/components"
import { HeaderNav } from "../../shared/HeaderNav"
import { FileList, Props as FileListProps } from "./FileList"

type Props = { fileListProps: FileListProps }
export function Page(props: Props) {
  const { fileListProps } = props
  return (
    <Box>
      <Sticky top="0">
        <HeaderNav />
      </Sticky>
      <Box height="100%" overflow="auto">
        <FileList {...fileListProps} />
      </Box>
    </Box>
  )
}
