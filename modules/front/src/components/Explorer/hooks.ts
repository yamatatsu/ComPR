import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { GQLQuery, GQLTree, GQLTreeEntry } from "../../../schema"

type Variables = {
  owner: string
  name: string
  expression: string
}

export const useRepoEntities = (variables: Variables) => {
  const { loading, error, data } = useQuery<GQLQuery>(
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
          }
        }
      }
    `,
    { variables },
  )
  if (loading) {
    return { loading, error, repos: [] }
  }

  if (error) {
    return { loading, error, repos: [] }
  }

  if (!data) {
    throw new Error("No data is fetched")
  }

  const tree: GQLTree | null | undefined = data.repository?.object

  if (!tree) {
    throw new Error("No data is fetched")
  }
  const entities =
    tree.entries?.sort((a, b) => (a.type > b.type ? -1 : 1)) ?? []

  return { loading, error, entities }
}
