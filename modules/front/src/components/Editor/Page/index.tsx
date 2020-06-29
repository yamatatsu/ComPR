import React, { Suspense } from "react"
import { Flex, Sticky, Box } from "@primer/components"
import { HeaderNav } from "../../shared/HeaderNav"
import { Props as EditorProps } from "./Editor"

type Props = { editorProps: EditorProps }
export function Page(props: Props) {
  const EditorPage = React.lazy(() => import("./Editor"))

  const { editorProps } = props
  return (
    <Flex height="100vh" flexDirection="column">
      <Sticky top="0">
        <HeaderNav />
      </Sticky>
      <Flex flex="1 1 auto" flexDirection="row">
        <Sticky top="56px" height="calc(100vh - 56px)" flex="1">
          <Box height="100%" overflow="hidden">
            <Suspense fallback={<div>Loading...</div>}>
              <EditorPage {...editorProps} width="100%" height="100%" />
            </Suspense>
          </Box>
        </Sticky>
      </Flex>
    </Flex>
  )
}
