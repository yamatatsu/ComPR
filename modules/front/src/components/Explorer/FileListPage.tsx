import React, { FunctionComponent } from "react"
import { TreeEntry } from "../../types"
import { Template } from "../templates"

type Props = {
  entities: TreeEntry[]
  currentPath: string
  parentPath: string
  isRepositoryRoot: boolean
  handleClickObject: (path: string) => void
}

export const FileListPage: FunctionComponent<Props> = (props) => {
  const {
    entities,
    currentPath,
    parentPath,
    isRepositoryRoot,
    handleClickObject,
  } = props

  return (
    <Template>
      <ul>
        {!isRepositoryRoot && (
          <li key="parent">
            ../
            <button onClick={() => handleClickObject(parentPath)}>go</button>
          </li>
        )}
        {entities.map((entity) => {
          const { type, name } = entity
          return (
            <li key={name}>
              [{type}]{name}
              <button
                onClick={() => handleClickObject(`${currentPath}/${name}`)}
              >
                go
              </button>
            </li>
          )
        })}
      </ul>
    </Template>
  )
}
