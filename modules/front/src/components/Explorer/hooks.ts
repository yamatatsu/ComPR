import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { GQLQuery, GQLTree, GQLBlob, GQLTreeEntry } from "../../../schema"

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
  const result = useQuery<GQLQuery>(
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
  console.log("%o", result)
  const { loading, error, data } = result
  if (loading) {
    return { type: "Loading", loading }
  }

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data is fetched")
  }

  const object = data.repository?.object

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
