import React from "react"
import { useHistory } from "react-router"
import { useExplorerData } from "./hooks"
import { Page } from "./Page"
import { getPaths, getExpression } from "./selectors"

type Props = { owner: string; repo: string; branch: string }
export const Explorer = (props: Props) => {
  const { owner, repo, branch } = props

  const { currentPath, parentPath, repositoryPath } = getPaths(
    location.pathname,
  )
  const expression = getExpression({ branch, repositoryPath })

  const result = useExplorerData({
    owner,
    name: repo,
    expression,
  })
  const history = useHistory()

  if (result.loading) {
    return <div>Loading...</div>
  }

  const handleClickObject = (path: string) => {
    history.push(path)
  }

  const isRepositoryRoot = repositoryPath === ""

  return (
    <Page
      fileListProps={{
        entities: result.entities,
        currentPath: currentPath,
        parentPath: parentPath,
        isRepositoryRoot: isRepositoryRoot,
        handleClickObject: handleClickObject,
      }}
      editorProps={{
        code: result.text,
      }}
    />
  )
}
