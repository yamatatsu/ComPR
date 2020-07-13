import React, { useState, useMemo, useCallback } from "react"
import { useFileContent } from "./hooks"
import { Page } from "./Page"
import { getPaths } from "./selectors"
import { commit } from "../../lib/apiClient"

type Props = {
  owner: string
  repo: string
  branch: string
}
export const EditEditor = (props: Props) => {
  const { owner, repo, branch } = props

  const { currentPath } = getPaths(location.pathname)

  const result = useFileContent({ owner, repo, branch, currentPath })

  const [openPRDialog, setOpenPRDialog] = useState(false)

  const now = useMemo(() => new Date(), [])

  const [content, setContent] = useState("")

  const onDismiss = useCallback(() => setOpenPRDialog(false), [])
  const onClickCreatePRButton = useCallback(() => setOpenPRDialog(true), [])

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <Page
      editorProps={{
        // MonacoEditor is used as non-controled component.
        // So `result.content` is entered as props at once for init.
        content: result.content,
        setContent: setContent,
      }}
      prDialogProps={{
        isOpen: openPRDialog,
        onDismiss,
        userName: "userName",
        now,
        onSubmit: async (message, newBranch) => {
          const res = await commit({
            owner,
            repo,
            baseBranch: branch,
            newBranch,
            message,
            path: currentPath,
            content,
          })
          window.open(res.pullRequestUrl)
        },
      }}
      onClickCreatePRButton={onClickCreatePRButton}
    />
  )
}

export const NewEditor = (props: Props) => {
  const { owner, repo, branch } = props

  const { currentPath } = getPaths(location.pathname)

  const [content, setContent] = useState("")

  const [openPRDialog, setOpenPRDialog] = useState(false)

  const now = useMemo(() => new Date(), [])

  return (
    <Page
      editorProps={{
        content: "",
        setContent: setContent,
      }}
      prDialogProps={{
        isOpen: openPRDialog,
        onDismiss: () => setOpenPRDialog(false),
        userName: "userName",
        now,
        onSubmit: async (message, newBranch) => {
          const res = await commit({
            owner,
            repo,
            baseBranch: branch,
            newBranch,
            message,
            path: currentPath,
            content,
          })
          window.open(res.pullRequestUrl)
        },
      }}
      onClickCreatePRButton={() => setOpenPRDialog(true)}
    />
  )
}
