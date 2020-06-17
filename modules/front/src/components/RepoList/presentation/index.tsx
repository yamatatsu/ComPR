import React, { FunctionComponent } from "react"
import { Repo } from "../../../types"

type Props = {
  loading: boolean
  error: Error | undefined
  repos: Repo[]
  handleClickRepo: (params: { owner: string; name: string }) => void
}

export const RepoList: FunctionComponent<Props> = (props) => {
  const { loading, error, repos, handleClickRepo } = props

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>
  }

  return (
    <>
      <ul>
        {repos.map((repo) => {
          const { owner, name } = repo
          return (
            <li>
              {owner}/{name}
              <button onClick={() => handleClickRepo({ owner, name })}>
                go
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
