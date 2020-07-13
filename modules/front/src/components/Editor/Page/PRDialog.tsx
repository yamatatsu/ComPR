import React, { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Dialog,
  CircleOcticon,
  TextInput,
  ButtonPrimary,
  Button,
  Text,
} from "@primer/components"
import { GitPullRequest, GitBranch } from "@primer/octicons-react"
import format from "date-fns/format"
import { Theme } from "../../../Theme"

export type Props = {
  isOpen: boolean
  userName: string
  now: Date
  onDismiss: () => void
  onSubmit: (message: string, branchName: string) => void
}
export function PRDialog(props: Props) {
  const {
    isOpen,
    userName,
    now,
    onDismiss: handleDismiss,
    onSubmit: handleSubmit,
  } = props

  const [message, setMessage] = useState("")
  const [branchName, setBranchName] = useState(
    `${userName}-patch-${format(now, "yyyyMMddHHmmss")}`,
  )

  const _handleSubmit = () => handleSubmit(message, branchName)

  // submit on cmd+enter or ctrl+enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) _handleSubmit()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [_handleSubmit])

  return (
    <Dialog isOpen={isOpen} onDismiss={handleDismiss}>
      <Theme>
        <Dialog.Header>
          <CircleOcticon icon={GitPullRequest} size={24} />
          <Text ml={2}>Commit changes</Text>
        </Dialog.Header>
        <Box p={3}>
          <TextInput
            aria-label="Message"
            width="100%"
            placeholder="Purpose of this change"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextInput
            aria-label="Branch Name"
            icon={GitBranch}
            mt={2}
            width="100%"
            placeholder="new branch name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
          <Flex mt={2} justifyContent="flex-end">
            <Button onClick={handleDismiss}>Cancel</Button>
            <ButtonPrimary ml={2} onClick={_handleSubmit}>
              Submit
            </ButtonPrimary>
          </Flex>
        </Box>
      </Theme>
    </Dialog>
  )
}
