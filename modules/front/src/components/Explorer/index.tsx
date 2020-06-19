import React from "react"
import { useHistory } from "react-router"
import { useRepoEntities } from "./hooks"
import { Explorer as Component } from "./presentation"

type Props = { owner: string; repo: string; branch: string }
export const Explorer = (props: Props) => {
  const { owner, repo, branch } = props
  const currentPath = location.pathname
  const repositoryPath = currentPath.replace(
    new RegExp(`/${owner}/${repo}/${branch}/?`),
    "",
  )
  const expression = `${branch}:${decodeURI(repositoryPath)}`

  const { loading, error, entities } = useRepoEntities({
    owner,
    name: repo,
    expression,
  })
  const history = useHistory()

  const isRepositoryRoot = repositoryPath === ""
  const parentPath = currentPath.replace(/[^/]*$/, "")

  const handleClickObject = (path: string) => {
    history.push(path)
  }

  return (
    <Component
      loading={loading}
      error={error}
      entities={entities}
      currentPath={currentPath}
      parentPath={parentPath}
      isRepositoryRoot={isRepositoryRoot}
      handleClickObject={handleClickObject}
    />
  )
}
