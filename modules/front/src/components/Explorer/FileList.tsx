import React, { FunctionComponent } from "react"
import { GQLTreeEntry } from "../../../schema"

type Props = {
  entities: GQLTreeEntry[]
  currentPath: string
  parentPath: string
  isRepositoryRoot: boolean
  handleClickObject: (path: string) => void
}

export const FileList: FunctionComponent<Props> = (props) => {
  const {
    entities,
    currentPath,
    parentPath,
    isRepositoryRoot,
    handleClickObject,
  } = props

  return (
    <>
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
    </>
  )
}
