import React, { FunctionComponent } from "react"
import { GQLTreeEntry } from "../../../../schema"

type Props = {
  loading: boolean
  error: Error | undefined
  entities: GQLTreeEntry[] | undefined
}

export const Explorer: FunctionComponent<Props> = (props) => {
  const { loading, error, entities } = props

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
        {entities.map((entity) => {
          const { type, name } = entity
          return (
            <li>
              [{type}]{name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
