import React from "react"
import { useHistory } from "react-router"
import { useRepositories } from "./hooks"
import { RepoList as Component } from "./RepoList"
import { Repo } from "../../types"

export const RepoList = () => {
  const result = useRepositories()
  const history = useHistory()
  const handleClickRepo = (repo: Repo) => {
    const { owner, name } = repo
    history.push(`/${owner}/${name}/master`)
  }

  if (result.type === "Loading") {
    return <div>loading...</div>
  }

  return <Component repos={result.repos} handleClickRepo={handleClickRepo} />
}
