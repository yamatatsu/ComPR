import React from "react"
import { useHistory } from "react-router"
import { useRepositories } from "./hooks"
import { RepoList as Component } from "./presentation"
import { Repo } from "../../types"

export const RepoList = () => {
  const { loading, error, repos } = useRepositories()
  const history = useHistory()
  const handleClickRepo = (repo: Repo) => {
    const { owner, name } = repo
    history.push(`/${owner}/${name}/master`)
  }

  return (
    <Component
      loading={loading}
      error={error}
      repos={repos}
      handleClickRepo={handleClickRepo}
    />
  )
}
