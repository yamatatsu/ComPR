import { gql } from "apollo-boost"
import { useQuery } from "../../hooks/useQuery"
import { GQLTree, GQLBlob, GQLTreeEntry } from "../../../schema"

type Params = {
  owner: string
  name: string
  expression: string
}
type Result =
  | { loading: true }
  | { loading: false; entities: GQLTreeEntry[]; text: string }

export const useExplorerData = (params: Params): Result => {
  const { owner, name, expression } = params

  const result = useQuery(gqlGetRepoEntities, {
    variables: { owner, name, expression },
  })

  if (result.type === "Loading") return { loading: true }

  const object = result.data.repository?.object

  if (!object) {
    throw new Error("No data is fetched")
  }
  const entities =
    (object as GQLTree).entries?.sort((a, b) => (a.type > b.type ? -1 : 1)) ??
    []

  const text = (object as GQLBlob).text ?? ""

  return { loading: false, entities, text }
}

const gqlGetRepoEntities = gql`
  query getRepoEntities($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Tree {
          entries {
            name
            type
          }
        }
        ... on Blob {
          text
        }
      }
    }
  }
`
