import React from "react"
import { action } from "@storybook/addon-actions"
import { Page } from "."

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
    editorProps={{
      code: `# Header 1

## Header 2

this is a sentense.

- aaa
- bbb
- ccc

## Header 2

1. 111
1. 222
1. 333

### Header 3

[link](https://github.com/yamatatsu/CooPRate)

![image](https://avatars1.githubusercontent.com/u/11013683?s=60&u=024745e4c0335faf05e3f81a9f30797fca0dc6a7&v=4)

### Header 3

\`\`\`js
const str = 'abcdefg'
arr.split('').join(' ')
\`\`\`

| this | is | a | table |
| --- | --- | --- | --- |
| 111 | 111 | 111 | 1111 |
| 222 | 222 | 222 | 2222 |
| 333 | 333 | 333 | 3333 |
| 444 | 444 | 444 | 4444 |
| 555 | 555 | 555 | 5555 |
| 666 | 666 | 666 | 6666 |
`,
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
    editorProps={{
      code: `# Header 1

## Header 2

this is a sentense.

- aaa
- bbb
- ccc

## Header 2

1. 111
1. 222
1. 333

### Header 3

[link](https://github.com/yamatatsu/CooPRate)

![image](https://avatars1.githubusercontent.com/u/11013683?s=60&u=024745e4c0335faf05e3f81a9f30797fca0dc6a7&v=4)

### Header 3

\`\`\`js
const str = 'abcdefg'
arr.split('').join(' ')
\`\`\`

| this | is | a | table |
| --- | --- | --- | --- |
| 111 | 111 | 111 | 1111 |
| 222 | 222 | 222 | 2222 |
| 333 | 333 | 333 | 3333 |
| 444 | 444 | 444 | 4444 |
| 555 | 555 | 555 | 5555 |
| 666 | 666 | 666 | 6666 |
`,
    }}
  />
)

export const ShortCode = () => (
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
      isRepositoryRoot: true,
      handleClickObject: action("click_object"),
    }}
    editorProps={{
      code: `# Header 1

## Header 2

this is a sentense.

- aaa
- bbb
- ccc
`,
    }}
  />
)

export const ShortBoth = () => (
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
    editorProps={{
      code: `# Header 1

## Header 2

this is a sentense.

- aaa
- bbb
- ccc
`,
    }}
  />
)
