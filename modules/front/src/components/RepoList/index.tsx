import React from "react"
import { useHistory } from "react-router"
import { useRepositories } from "./hooks"
import { Page } from "./Page"
import { Repo } from "../../types"

export const RepoList = () => {
  const result = useRepositories()
  const history = useHistory()
  const handleClickRepo = (repo: Repo) => {
    const { owner, name, defaultBranchName } = repo
    history.push(`/${owner}/${name}/${defaultBranchName}/list`)
  }

  if (result.type === "Loading") {
    return <div>loading...</div>
  }

  return <Page repos={result.repos} handleClickRepo={handleClickRepo} />
}
