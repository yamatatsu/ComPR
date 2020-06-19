import React, { FunctionComponent } from "react"
import { GQLTreeEntry } from "../../../../schema"

type Props = {
  loading: boolean
  error: Error | undefined
  entities: GQLTreeEntry[] | undefined
  currentPath: string
  parentPath: string
  isRepositoryRoot: boolean
  handleClickObject: (path: string) => void
}

export const Explorer: FunctionComponent<Props> = (props) => {
  const {
    loading,
    error,
    entities,
    currentPath,
    parentPath,
    isRepositoryRoot,
    handleClickObject,
  } = props

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>
  }

  if (!entities) {
    throw new Error("no entities was fetched")
  }

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
