import React, { FunctionComponent } from "react"
import { Repo } from "../../types"

type Props = {
  repos: Repo[]
  handleClickRepo: (params: { owner: string; name: string }) => void
}

export const RepoList: FunctionComponent<Props> = (props) => {
  const { repos, handleClickRepo } = props

  return (
    <>
      <ul>
        {repos.map((repo) => {
          const { owner, name } = repo
          const path = `${owner}/${name}`
          return (
            <li key={path}>
              {path}
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
