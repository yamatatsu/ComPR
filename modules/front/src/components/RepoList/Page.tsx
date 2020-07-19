import React, { ReactElement } from "react"
import { Repo } from "../../types"

type Props = {
  repos: Repo[]
  handleClickRepo: (repo: Repo) => void
}

export function Page(props: Props): ReactElement {
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
              <button onClick={() => handleClickRepo(repo)}>go</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
