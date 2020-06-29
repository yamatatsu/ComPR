import React, { FunctionComponent } from "react"
import { BorderBox } from "@primer/components"
import { TreeEntry } from "../../../types"

export type Props = {
  entities: TreeEntry[]
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
    <BorderBox backgroundColor="bg.grayLight">
      <ul>
        {!isRepositoryRoot && (
          <li key="parent">
            ../
            <button onClick={() => handleClickObject(`list/${parentPath}`)}>
              go
            </button>
          </li>
        )}
        {entities.map((entity) => {
          const { type, name } = entity
          return (
            <li key={name}>
              [{type}]{name}
              {type === "tree" ? (
                <button
                  onClick={() =>
                    handleClickObject(
                      currentPath
                        ? `list/${currentPath}/${name}`
                        : `list/${name}`,
                    )
                  }
                >
                  go
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleClickObject(
                      currentPath
                        ? `edit/${currentPath}/${name}`
                        : `edit/${name}`,
                    )
                  }
                >
                  edit
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </BorderBox>
  )
}
