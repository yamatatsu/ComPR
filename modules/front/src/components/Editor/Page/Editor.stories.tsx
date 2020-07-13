import React from "react"
import { action } from "@storybook/addon-actions"
import Editor from "./Editor"

export default { title: "MonacoEditor" }

export const Main = () => {
  return (
    <>
      <Editor
        content={`# hoge`}
        setContent={action("setContent")}
        width="100%"
        height="500px"
      />
    </>
  )
}
