import React, { FunctionComponent } from "react"
import { GQLTreeEntry } from "../../../../schema"

type Props = {
  entities: GQLTreeEntry[]
  currentPath: string
  parentPath: string
  isRepositoryRoot: boolean
  handleClickObject: (path: string) => void
}

export const Explorer: FunctionComponent<Props> = (props) => {
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
          <li>
            ../<button onClick={() => handleClickObject(parentPath)}>go</button>
          </li>
        )}
        {entities.map((entity) => {
          const { type, name } = entity
          return (
            <li>
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
