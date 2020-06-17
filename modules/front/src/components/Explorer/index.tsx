import React from "react"
import { useRepoEntities } from "./hooks"
import { Explorer as Component } from "./presentation"

export const Explorer = () => {
  const { loading, error, entities } = useRepoEntities({
    owner: "CureApp",
    name: "documents-QMS",
    expression: "master:",
  })
  return <Component {...{ loading, error, entities }} />
}
