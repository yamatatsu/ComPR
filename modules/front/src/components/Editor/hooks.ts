import { gql } from "apollo-boost"
import { useQuery } from "../../hooks/useQuery"
import { GQLBlob } from "../../../schema"

type Params = {
  owner: string
  name: string
  expression: string
}
type Result = { loading: true } | { loading: false; content: string }

export const useFileContent = (params: Params): Result => {
  const { owner, name, expression } = params

  const result = useQuery(gqlGetRepoEntities, {
    variables: { owner, name, expression },
  })

  if (result.type === "Loading") return { loading: true }

  const object = result.data.repository?.object

  if (!object) {
    throw new Error("No data is fetched")
  }

  const content = (object as GQLBlob).text ?? ""

  return { loading: false, content }
}

const gqlGetRepoEntities = gql`
  query getRepoEntities($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
    }
  }
`
