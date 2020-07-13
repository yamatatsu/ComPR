import React, { useRef, useEffect } from "react"
import { Box, LayoutProps } from "@primer/components"
import * as monaco from "monaco-editor"
import { MonacoMarkdownExtension } from "monaco-markdown"

export type Props = {
  content: string
  setContent: (content: string) => void
}
export default function Editor(props: Props & LayoutProps) {
  const { content, setContent, ...layoutProps } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const model = monaco.editor.createModel(content, "markdown")
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
      ed.onDidChangeModelContent(() => {
        setContent(ed.getValue())
      })
      // @ts-ignore
      new MonacoMarkdownExtension().activate(ed)
    }
  }, [ref])
  return <Box {...layoutProps} ref={ref}></Box>
}
