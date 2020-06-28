import React, { FunctionComponent } from "react"
import { Repo } from "../../types"

type Props = {
  repos: Repo[]
  handleClickRepo: (repo: Repo) => void
}

export const Page: FunctionComponent<Props> = (props) => {
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
