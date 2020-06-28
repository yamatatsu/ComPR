import React, { useRef, useEffect } from "react"
import { Box, LayoutProps } from "@primer/components"
import * as monaco from "monaco-editor"
import { MonacoMarkdownExtension } from "monaco-markdown"

export type Props = { code: string }
export default function Editor(props: Props & LayoutProps) {
  const { code, ...layoutProps } = props
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
  return <Box {...layoutProps} ref={ref}></Box>
}
