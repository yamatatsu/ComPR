import React from "react"
import { useHistory } from "react-router"
import { useRepoEntities } from "./hooks"
import { Explorer as Component } from "./presentation"

type Props = { owner: string; repo: string; branch: string }
export const Explorer = (props: Props) => {
  const { owner, repo, branch } = props
  const currentPath = location.pathname.replace(/\/$/, "")
  const repositoryPath = currentPath.replace(
    new RegExp(`/${owner}/${repo}/${branch}/?`),
    "",
  )
  const expression = `${branch}:${decodeURI(repositoryPath)}`

  const result = useRepoEntities({
    owner,
    name: repo,
    expression,
  })
  const history = useHistory()

  const parentPath = currentPath.replace(/[^/]*$/, "")
  const handleClickObject = (path: string) => {
    history.push(path)
  }

  switch (result.type) {
    case "Loading":
      return <div>Loading...</div>
    case "Tree": {
      const isRepositoryRoot = repositoryPath === ""

      return (
        <Component
          entities={result.entities}
          currentPath={currentPath}
          parentPath={parentPath}
          isRepositoryRoot={isRepositoryRoot}
          handleClickObject={handleClickObject}
        />
      )
    }
    case "Blob":
      return <div>{result.text}</div>
  }
}
