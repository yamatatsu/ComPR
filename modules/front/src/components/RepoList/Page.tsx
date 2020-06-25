import React, { FunctionComponent } from "react"
import { Template } from "../templates"
import { Repo } from "../../types"

type Props = {
  repos: Repo[]
  handleClickRepo: (repo: Repo) => void
}

export const Page: FunctionComponent<Props> = (props) => {
  const { repos, handleClickRepo } = props

  return (
    <Template>
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
    </Template>
  )
}
