import { gql } from "apollo-boost"
import { useQuery } from "../../hooks/useQuery"
import { GQLBlob } from "../../../schema"

type Params = {
  owner: string
  repo: string
  branch: string
  currentPath: string
}
type Result =
  | { loading: true }
  | { loading: false; content: string; sha: string }

export const useFileContent = (params: Params): Result => {
  const { owner, repo, branch, currentPath } = params

  const expression = `${branch}:${decodeURI(currentPath)}`
  const qualifiedName = `refs/heads/${branch}`

  const result = useQuery(gqlGetRepoEntities, {
    variables: { owner, repo, expression, qualifiedName },
  })

  if (result.type === "Loading") return { loading: true }

  const object = result.data.repository?.object
  if (!object) {
    throw new Error("No data is fetched")
  }

  const content = (object as GQLBlob).text ?? ""

  const sha = result.data.repository?.ref?.target.oid as string | undefined
  if (!sha) {
    throw new Error("No sha is fetched")
  }

  return { loading: false, content, sha }
}

export const gqlGetRepoEntities = gql`
  query getRepoEntities(
    $owner: String!
    $repo: String!
    $expression: String!
    $qualifiedName: String!
  ) {
    repository(owner: $owner, name: $repo) {
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
      ref(qualifiedName: $qualifiedName) {
        target {
          oid
        }
      }
    }
  }
`
