import React from "react"
import { action } from "@storybook/addon-actions"
import { FileList } from "./FileList"

export default { title: "FileList" }

const entities = [
  { type: "tree", name: "dir1" },
  { type: "tree", name: "dir2" },
  { type: "tree", name: "dir3" },
  { type: "blob", name: "file1" },
  { type: "blob", name: "file2" },
  { type: "blob", name: "file3" },
]

export const Main = () => (
  <FileList
    entities={entities}
    currentPath={"test_currentPath"}
    parentPath={"test_parentPath"}
    isRepositoryRoot={false}
    handleClickObject={action("click_object")}
  />
)

export const RepositoryRoot = () => (
  <FileList
    entities={entities}
    currentPath={"test_currentPath"}
    parentPath={"test_parentPath"}
    isRepositoryRoot={true}
    handleClickObject={action("click_object")}
  />
)
