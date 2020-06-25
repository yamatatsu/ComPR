import React from "react"
import { action } from "@storybook/addon-actions"
import { FileListPage } from "./FileListPage"

export default { title: "RepoList" }

const entities = [
  { type: "tree", name: "folder1" },
  { type: "tree", name: "folder2" },
  { type: "tree", name: "folder3" },
  { type: "blob", name: "file1" },
  { type: "blob", name: "file2" },
  { type: "blob", name: "file3" },
]

export const Main = () => (
  <FileListPage
    entities={entities}
    currentPath={"test_currentPath"}
    parentPath={"test_parentPath"}
    isRepositoryRoot={false}
    handleClickObject={action("click_object")}
  />
)

export const RepositoryRoot = () => (
  <FileListPage
    entities={entities}
    currentPath={"test_currentPath"}
    parentPath={"test_parentPath"}
    isRepositoryRoot={true}
    handleClickObject={action("click_object")}
  />
)
