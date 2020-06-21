import { useQuery } from "../../hooks/useQuery"
import { gql } from "apollo-boost"
import { GQLTree, GQLBlob, GQLTreeEntry } from "../../../schema"

type Params = {
  owner: string
  name: string
  expression: string
}
type Result =
  | { type: "Loading"; loading: true }
  | { type: "Tree"; entities: GQLTreeEntry[] }
  | { type: "Blob"; text: string }

export const useRepoEntities = (params: Params): Result => {
  const { owner, name, expression } = params

  const variables = { owner, name, expression }
  const result = useQuery(
    gql`
      query getRepoEntities(
        $owner: String!
        $name: String!
        $expression: String!
      ) {
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
    `,
    { variables },
  )

  if (result.type === "Loading") return result

  const object = result.data.repository?.object

  if (!object) {
    throw new Error("No data is fetched")
  }
  const tree: GQLTree = object
  const entities = tree.entries?.sort((a, b) => (a.type > b.type ? -1 : 1))
  if (entities) {
    return { type: "Tree", entities }
  }

  const { text } = object as GQLBlob
  if (text) {
    return { type: "Blob", text }
  }

  throw new Error("It should be unreached.")
}
