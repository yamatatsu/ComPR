import React, { ReactElement } from "react"
import { Flex, Sticky, Box, ButtonPrimary } from "@primer/components"
import { HeaderNav } from "../../shared/HeaderNav"
import Editor, { Props as EditorProps } from "./Editor"
import { PRDialog, Props as PRDialogProps } from "./PRDialog"

type Props = {
  editorProps: EditorProps
  prDialogProps: PRDialogProps
  onClickCreatePRButton: () => void
}
export function Page(props: Props): ReactElement {
  const { editorProps, prDialogProps, onClickCreatePRButton } = props

  return (
    <>
      <Flex height="100vh" flexDirection="column">
        <Sticky top="0">
          <HeaderNav
            content={() => {
              return (
                <ButtonPrimary mr={1} onClick={onClickCreatePRButton}>
                  create PR
                </ButtonPrimary>
              )
            }}
          />
        </Sticky>
        <Flex flex="1 1 auto" flexDirection="row">
          <Sticky top="56px" height="calc(100vh - 56px)" flex="1">
            <Box height="100%" overflow="hidden">
              <Editor {...editorProps} width="100%" height="100%" />
            </Box>
          </Sticky>
        </Flex>
        <PRDialog {...prDialogProps} />
      </Flex>
    </>
  )
}
