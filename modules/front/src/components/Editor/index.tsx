import React from "react"
import { useFileContent } from "./hooks"
import { Page } from "./Page"
import { getPaths, getExpression } from "./selectors"

type Props = {
  owner: string
  repo: string
  branch: string
}
export const EditEditor = (props: Props) => {
  const { owner, repo, branch } = props

  const { currentPath } = getPaths(location.pathname)
  const expression = getExpression({ branch, currentPath })

  const result = useFileContent({
    owner,
    name: repo,
    expression,
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <Page
      editorProps={{
        code: result.content,
      }}
    />
  )
}

export const NewEditor = () => {
  return <Page editorProps={{ code: "" }} />
}
