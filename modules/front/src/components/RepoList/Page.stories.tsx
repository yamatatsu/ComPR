import React from "react"
import { action } from "@storybook/addon-actions"
import { Page } from "./Page"

export default { title: "RepoList" }

const repo = [
  { owner: "owner1", name: "name1", defaultBranchName: "defaultBranchName1" },
  { owner: "owner2", name: "name2", defaultBranchName: "defaultBranchName2" },
  { owner: "owner3", name: "name3", defaultBranchName: "defaultBranchName3" },
]

export const Main = () => (
  <Page repos={repo} handleClickRepo={action("click_repo")} />
)
