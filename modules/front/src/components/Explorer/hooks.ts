import { gql } from "apollo-boost"
import { useQuery } from "../../hooks/useQuery"
import { GQLTree, GQLTreeEntry } from "../../../schema"

type Params = {
  owner: string
  repo: string
  branch: string
  currentPath: string
}
type Result = { loading: true } | { loading: false; entities: GQLTreeEntry[] }

export const useRepoEntities = (params: Params): Result => {
  const { owner, repo, branch, currentPath } = params

  const expression = `${branch}:${decodeURI(currentPath)}`

  const result = useQuery(gqlGetRepoEntities, {
    variables: { owner, repo, expression },
  })

  if (result.type === "Loading") return { loading: true }

  const object = result.data.repository?.object

  if (!object) {
    throw new Error("No data is fetched")
  }
  const entities =
    (object as GQLTree).entries?.sort((a, b) => (a.type > b.type ? -1 : 1)) ??
    []

  return { loading: false, entities }
}

export const gqlGetRepoEntities = gql`
  query getRepoEntities($owner: String!, $repo: String!, $expression: String!) {
    repository(owner: $owner, name: $repo) {
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
`
