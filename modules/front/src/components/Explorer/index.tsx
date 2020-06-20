import React, { Suspense } from "react"
import { useHistory } from "react-router"
import { useRepoEntities } from "./hooks"
import { FileList } from "./FileList"

type Props = { owner: string; repo: string; branch: string }
export const Explorer = (props: Props) => {
  const Editor = React.lazy(() => import("./Editor"))

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
        <FileList
          entities={result.entities}
          currentPath={currentPath}
          parentPath={parentPath}
          isRepositoryRoot={isRepositoryRoot}
          handleClickObject={handleClickObject}
        />
      )
    }
    case "Blob":
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Editor code={result.text} />
        </Suspense>
      )
  }
}
