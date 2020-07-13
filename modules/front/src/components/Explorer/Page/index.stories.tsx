import React from "react"
import { action } from "@storybook/addon-actions"
import { Page } from "./"

export default { title: "ExplorerPage" }

export const Main = () => (
  <Page
    fileListProps={{
      entities: [
        { type: "tree", name: "dir1" },
        { type: "tree", name: "dir2" },
        { type: "tree", name: "dir3" },
        { type: "tree", name: "dir4" },
        { type: "tree", name: "dir5" },
        { type: "tree", name: "dir6" },
        { type: "blob", name: "file1" },
        { type: "blob", name: "file2" },
        { type: "blob", name: "file3" },
        { type: "blob", name: "file4" },
        { type: "blob", name: "file5" },
        { type: "blob", name: "file6" },
        { type: "blob", name: "file7" },
        { type: "blob", name: "file8" },
        { type: "blob", name: "file9" },
        { type: "blob", name: "file10" },
        { type: "blob", name: "file11" },
        { type: "blob", name: "file12" },
        { type: "blob", name: "file13" },
        { type: "blob", name: "file14" },
        { type: "blob", name: "file15" },
        { type: "blob", name: "file16" },
        { type: "blob", name: "file17" },
        { type: "blob", name: "file18" },
      ],
      currentPath: "test_currentPath",
      parentPath: "test_parentPath",
      isRepositoryRoot: false,
      handleClickObject: action("click_object"),
    }}
  />
)

export const ShortFileList = () => (
  <Page
    fileListProps={{
      entities: [
        { type: "tree", name: "dir1" },
        { type: "tree", name: "dir2" },
        { type: "tree", name: "dir3" },
        { type: "blob", name: "file1" },
        { type: "blob", name: "file2" },
        { type: "blob", name: "file3" },
      ],
      currentPath: "test_currentPath",
      parentPath: "test_parentPath",
      isRepositoryRoot: true,
      handleClickObject: action("click_object"),
    }}
  />
)
