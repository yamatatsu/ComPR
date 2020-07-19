import React, { ReactElement } from "react"
import { useHistory } from "react-router"
import { useRepoEntities } from "./hooks"
import { Page } from "./Page"
import { getPaths } from "./selectors"

type Props = { owner: string; repo: string; branch: string }
export function Explorer(props: Props): ReactElement {
  const { owner, repo, branch } = props

  const { currentPath, parentPath } = getPaths(location.pathname)

  const result = useRepoEntities({ owner, repo, branch, currentPath })
  const history = useHistory()

  if (result.loading) {
    return <div>Loading...</div>
  }

  const handleClickObject = (path: string) => {
    history.push(`/${owner}/${repo}/${branch}/${path}`)
  }

  const isRepositoryRoot = currentPath === ""

  return (
    <Page
      fileListProps={{
        entities: result.entities,
        currentPath: currentPath,
        parentPath: parentPath,
        isRepositoryRoot: isRepositoryRoot,
        handleClickObject: handleClickObject,
      }}
    />
  )
}
