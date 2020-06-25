import React, { useRef, useEffect } from "react"
import * as monaco from "monaco-editor"
import { MonacoMarkdownExtension } from "monaco-markdown"
import { Template } from "../templates"

type Props = { code: string }
export default function Editor(props: Props) {
  const { code } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const model = monaco.editor.createModel(code, "markdown")
      model.updateOptions({ tabSize: 2 })
      const ed = monaco.editor.create(ref.current, {
        model,
        language: "markdown",
        fontSize: 14,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        theme: "vs",
        minimap: { enabled: false },
      })
      // @ts-ignore
      new MonacoMarkdownExtension().activate(ed)
    }
  }, [ref])
  return (
    <Template>
      <div style={{ width: "100%", height: "100%" }} ref={ref}></div>
    </Template>
  )
}
