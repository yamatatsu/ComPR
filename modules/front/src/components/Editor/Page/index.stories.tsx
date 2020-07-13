import React from "react"
import { action } from "@storybook/addon-actions"
import { Page } from "."

export default { title: "EditorPage" }

const now = new Date()

const PageBase = (props: { content: string; isOpen: boolean }) => {
  const { content, isOpen } = props

  return (
    <Page
      editorProps={{
        content,
        setContent: action("setContent"),
      }}
      prDialogProps={{
        isOpen,
        onDismiss: action("onDismiss"),
        userName: "userName",
        now,
        onSubmit: action("onSubmit"),
      }}
      onClickCreatePRButton={action("onClickCreatePRButton")}
    />
  )
}

export const Main = () => (
  <PageBase
    content={`# Header 1

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
`}
    isOpen={false}
  />
)

export const ShortCode = () => (
  <PageBase content={`# Header 1`} isOpen={false} />
)

export const OpenPullReqestDialog = () => (
  <PageBase content={`# Header 1`} isOpen={true} />
)
